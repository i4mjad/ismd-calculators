"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { projectCategories } from "@/lib/constants"
import { calculateProjectRisk, type ProjectRiskSelection } from "@/lib/projectRisk"
import { exportProjectReport } from "@/lib/pdfExporter"
import { AlertTriangle } from "lucide-react"

type Selections = Record<string, number>
type Result = {
  weightedMean: number
  level: string
  emoji: string
  advisory: string
} | null

export function ProjectAssessor() {
  const [selections, setSelections] = useState<Selections>({})
  const [result, setResult] = useState<Result>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const categoryKeys = useMemo(() => Object.keys(projectCategories), [])

  const handleValueChange = (categoryKey: string, score: string) => {
    setSelections((prev) => ({
      ...prev,
      [categoryKey]: Number(score),
    }))
  }

  const handleCalculateRisk = () => {
    const riskSelections: ProjectRiskSelection[] = categoryKeys
      .map((key) => {
        const score = selections[key]
        if (score === undefined) return null
        return {
          score,
          weight: projectCategories[key].weight,
        }
      })
      .filter((s): s is ProjectRiskSelection => s !== null)

    if (riskSelections.length === categoryKeys.length) {
      const calculatedResult = calculateProjectRisk(riskSelections)
      setResult(calculatedResult)
      setIsDialogOpen(true)
    }
  }

  const handleExport = () => {
    if (!result) return
    const resultText = `Final Score: ${result.weightedMean}\nRisk Level: ${result.emoji} ${result.level}\n\nAdvisory:\n${result.advisory}`
    exportProjectReport(resultText)
  }

  const isButtonDisabled = Object.keys(selections).length !== categoryKeys.length

  return (
    <div className="flex flex-col">
      <header className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">IT Project Risk Assessor</h1>
        <p className="text-muted-foreground">
          Complete the form to calculate the weighted risk score for your IT project.
        </p>
      </header>

      <div className="flex-grow overflow-y-auto pr-2 max-h-[60vh]">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {categoryKeys.map((key) => {
            const category = projectCategories[key]
            const selectedScore = selections[key]
            return (
              <Card key={key}>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg capitalize">{key} Risk</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <Select
                    onValueChange={(value) => handleValueChange(key, value)}
                    aria-label={`Select risk option for ${key} category`}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {category.options.map(([label, score]) => (
                        <SelectItem key={label} value={String(score)}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedScore === 5 && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>High Risk Item</AlertTitle>
                      <AlertDescription>This selection requires a specific mitigation plan.</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <footer className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 border-t">
        <Button
          onClick={handleCalculateRisk}
          disabled={isButtonDisabled}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 text-lg"
          aria-label="Calculate final project risk score"
        >
          <span role="img" aria-label="abacus" className="mr-2">
            🧮
          </span>
          Calculate Risk
        </Button>
        <Button
          onClick={handleExport}
          disabled={!result}
          variant="outline"
          className="w-full sm:w-auto font-bold py-3 px-6 text-lg bg-transparent"
          aria-label="Export risk report to PDF"
        >
          <span role="img" aria-label="page with curl" className="mr-2">
            📄
          </span>
          Export to PDF
        </Button>
      </footer>

      {result && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">Project Risk Analysis</DialogTitle>
              <DialogDescription className="text-center">
                Based on your selections, the calculated risk is:
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4 text-lg">
              <p>
                <strong>Final Score:</strong> {result.weightedMean}
              </p>
              <p>
                <strong>Risk Level:</strong> {result.emoji} {result.level}
              </p>
              <div className="p-4 bg-muted rounded-md">
                <p className="font-bold">Advisory:</p>
                <p>{result.advisory}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
