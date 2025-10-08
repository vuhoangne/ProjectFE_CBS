import { type NextRequest } from "next/server"
import { database } from "@/lib/database"

// Server-Sent Events endpoint for real-time updates
export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()
  
  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      const data = `data: ${JSON.stringify({ type: 'connected', data: { timestamp: new Date().toISOString() } })}\n\n`
      controller.enqueue(encoder.encode(data))

      // Subscribe to database events
      const unsubscribe = database.subscribe((event: string, data: any) => {
        try {
          const message = `data: ${JSON.stringify({ type: event, data })}\n\n`
          controller.enqueue(encoder.encode(message))
        } catch (error) {
          console.error('Error sending SSE message:', error)
        }
      })

      // Keep connection alive with heartbeat
      const heartbeat = setInterval(() => {
        try {
          const heartbeatMessage = `data: ${JSON.stringify({ type: 'heartbeat', data: { timestamp: new Date().toISOString() } })}\n\n`
          controller.enqueue(encoder.encode(heartbeatMessage))
        } catch (error) {
          console.error('Error sending heartbeat:', error)
          clearInterval(heartbeat)
          unsubscribe()
          controller.close()
        }
      }, 30000) // Send heartbeat every 30 seconds

      // Cleanup on connection close
      request.signal.addEventListener('abort', () => {
        clearInterval(heartbeat)
        unsubscribe()
        controller.close()
      })
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    },
  })
}