import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CloudAssessor } from "@/app/components/cloud-assessor"
import { ProjectAssessor } from "@/app/components/project-assessor"

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <Tabs defaultValue="cloud" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cloud">Cloud Compliance Assessor</TabsTrigger>
          <TabsTrigger value="project">IT Project Risk Assessor</TabsTrigger>
        </TabsList>
        <TabsContent value="cloud" className="pt-6">
          <CloudAssessor />
        </TabsContent>
        <TabsContent value="project" className="pt-6">
          <ProjectAssessor />
        </TabsContent>
      </Tabs>
    </main>
  )
}
