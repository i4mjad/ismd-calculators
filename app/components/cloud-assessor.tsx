"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cloudFields, cloudRiskColors, cloudRiskValues } from "@/lib/constants"
import { calculateCloudRisk } from "@/lib/cloudRisk"
import { RiskChart } from "@/components/risk-chart"
import { AlertTriangle } from "lucide-react"

type Scores = Record<string, number>
type Result = {
  pct: number
  level: string
  color: string
} | null

export function CloudAssessor() {
  const [scores, setScores] = useState<Scores>({})
  const [result, setResult] = useState<Result>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fieldKeys = useMemo(() => Object.keys(cloudFields), [])

  const handleValueChange = (fieldKey: string, riskLevel: string) => {
    setScores((prev) => ({
      ...prev,
      [fieldKey]: cloudRiskValues[riskLevel],
    }))
  }

  const handleCalculateRisk = () => {
    const scoreValues = fieldKeys.map((key) => scores[key] || 0)
    const calculatedResult = calculateCloudRisk(scoreValues, fieldKeys.length)
    setResult(calculatedResult)
    if (calculatedResult) {
      setIsDialogOpen(true)
    }
  }

  const isButtonDisabled = Object.keys(scores).length !== fieldKeys.length

  return (
    <div className="w-full max-w mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Cloud Compliance Assessor</h1>
        <p className="text-muted-foreground">
          Evaluate the compliance risk of your cloud environment based on key security controls.
        </p>
      </header>

      <main className="w-full mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg">
            <thead>
              <tr>
                <th className="text-left p-3 font-semibold">Section</th>
                <th className="text-left p-3 font-semibold">Options</th>
              </tr>
            </thead>
            <tbody>
              {fieldKeys.map((key, idx) => {
                const field = cloudFields[key]
                // Find the selected risk for this field
                const selectedRisk = Object.entries(field.options).find(
                  ([option, risk]) => cloudRiskValues[risk] === scores[key]
                )?.[1]
                const rowBg = selectedRisk ? cloudRiskColors[selectedRisk] : ""
                return (
                  <tr
                    key={key}
                    style={{ backgroundColor: rowBg }}
                    className={`transition-colors${idx !== fieldKeys.length - 1 ? ' border-b border-gray-300' : ''}`}
                  >
                    <td className="p-2 align-top font-medium w-1/4 whitespace-nowrap">{field.label}</td>
                    <td className="p-2">
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(field.options).map(([option, risk]) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleValueChange(key, risk)}
                            className={`px-4 py-2 rounded border font-medium focus:outline-none transition-colors ${selectedRisk === risk ? 'ring-2 ring-offset-2 ring-primary border-primary' : 'border-gray-300'} `}
                            style={{
                              backgroundColor: cloudRiskColors[risk],
                              color: "black",
                              opacity: selectedRisk && selectedRisk !== risk ? 0.6 : 1,
                            }}
                            aria-pressed={selectedRisk === risk}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </main>

      <footer className="text-center">
        <Button
          onClick={handleCalculateRisk}
          disabled={isButtonDisabled}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 text-lg"
          aria-label="Calculate total risk score"
        >
          <span role="img" aria-label="chart increasing" className="mr-2">
            📊
          </span>
          Calculate Risk
        </Button>
      </footer>

      {result && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-center" style={{ color: result.color }}>
                {result.pct}% Risk – {result.level}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center gap-6 py-4">
              <RiskChart pct={result.pct} color={result.color} />
              {result.pct >= 50 && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>High Risk Detected</AlertTitle>
                  <AlertDescription>Seek Information Security Dept. approval before proceeding.</AlertDescription>
                </Alert>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
