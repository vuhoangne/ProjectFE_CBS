import { RealTimeDashboard } from "@/components/admin/real-time-dashboard"
import { ApiTest } from "@/components/test/api-test"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminTestPage() {
  return (
    <div className="container mx-auto py-8 space-y-8 admin-page">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Admin Test Dashboard</h1>
        <p className="text-muted-foreground">
          Test real-time API connections between customer and admin interfaces
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">Real-time Dashboard</TabsTrigger>
          <TabsTrigger value="api-test">API Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <RealTimeDashboard />
        </TabsContent>

        <TabsContent value="api-test">
          <ApiTest />
        </TabsContent>
      </Tabs>
    </div>
  )
}