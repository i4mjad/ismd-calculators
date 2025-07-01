export interface ProjectRiskSelection {
  score: number
  weight: number
}

export function calculateProjectRisk(selections: ProjectRiskSelection[]) {
  const totalWeightedScore = selections.reduce((sum, s) => sum + s.score * s.weight, 0)
  const totalWeight = selections.reduce((sum, s) => sum + s.weight, 0)

  if (totalWeight === 0) {
    return {
      weightedMean: 0,
      level: "Low",
      emoji: "🟢",
      advisory: "✅ Acceptable risk level. Proceed with standard monitoring.",
    }
  }

  const weightedMean = Number.parseFloat((totalWeightedScore / totalWeight).toFixed(2))

  let level: string
  let emoji: string
  let advisory: string

  if (weightedMean <= 1.8) {
    level = "Low"
    emoji = "🟢"
    advisory = "✅ Acceptable risk level. Proceed with standard monitoring."
  } else if (weightedMean <= 2.8) {
    level = "Medium"
    emoji = "🟡"
    advisory = "⚠️ Some risks identified. Develop mitigation plans for high-score items."
  } else if (weightedMean <= 3.8) {
    level = "High"
    emoji = "🟠"
    advisory =
      "⚠️ Significant risks identified. Project requires a formal risk management plan and senior management oversight."
  } else {
    level = "Critical"
    emoji = "🔴"
    advisory =
      "⚠️ Critical risks threaten project success. Must be mitigated before proceeding. Immediate senior management review required."
  }

  return { weightedMean, level, emoji, advisory }
}
