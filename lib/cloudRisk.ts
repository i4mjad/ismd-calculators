import { cloudRiskColors } from "./constants"

export function calculateCloudRisk(scores: number[], numberOfFields: number) {
  if (scores.length !== numberOfFields) {
    return null
  }

  const totalScore = scores.reduce((a, b) => a + b, 0)
  const maxScore = numberOfFields * 4
  const pct = Math.round((totalScore / maxScore) * 100)

  let level: string
  if (pct <= 25) level = "Low"
  else if (pct <= 50) level = "Medium"
  else if (pct <= 75) level = "High"
  else level = "Critical"

  const color = cloudRiskColors[level]

  return { pct, level, color }
}
