"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface RiskChartProps {
  pct: number
  color: string
}

export function RiskChart({ pct, color }: RiskChartProps) {
  const data = [
    { name: "Risk", value: pct },
    { name: "Safe", value: 100 - pct },
  ]

  const colors = [color, "#4b5563"] // risk color, gray-600

  return (
    <div className="w-64 h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            contentStyle={{
              background: "rgba(0, 0, 0, 0.8)",
              borderColor: "#333",
              borderRadius: "0.5rem",
            }}
            itemStyle={{ color: "#fff" }}
            labelStyle={{ color: "#fff" }}
          />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
