"use client"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Heart, Brain, Circle, User } from "lucide-react"

const defaultData = {
  systems: {
    overview: {
      title: "Overview",
      icon: <Circle />,
      metrics: [
        { name: "Steps", value: "7,500" },
        { name: "Calories", value: "2,000" },
        { name: "Distance", value: "5km" },
      ],
    },
    cardiovascular: {
      title: "Cardiovascular",
      icon: <Heart />,
      metrics: [
        { name: "Heart Rate", value: "70 bpm" },
        { name: "Blood Pressure", value: "120/80" },
      ],
    },
    neurological: {
      title: "Neurological",
      icon: <Brain />,
      metrics: [
        { name: "Sleep", value: "7.5h" },
        { name: "Stress", value: "Low" },
      ],
    },
    general: {
      title: "General",
      icon: <User />,
      metrics: [
        { name: "BMI", value: "22.5" },
        { name: "Weight", value: "70kg" },
        { name: "Height", value: "175cm" },
      ],
    },
  },
}

const HealthVisualizations = ({ data = defaultData, selectedSystem = "overview" }) => {
  // Combine the default data with the provided data
  const displayData = { ...defaultData, ...data }

  // Calculate BMI
  const bmi =
    data.weight && data.height
      ? (data.weight / Math.pow(data.height / 100, 2)).toFixed(1)
      : defaultData.systems.general.metrics.find((m) => m.name === "BMI")?.value

  // Update the general metrics with the calculated BMI
  displayData.systems.general.metrics = [
    { name: "BMI", value: bmi },
    { name: "Sleep", value: `${data.sleepHours || 7.5}h` },
  ]

  const selectedSystemData = displayData.systems[selectedSystem]

  const pieChartData = [
    { name: "Steps", value: Number.parseInt(selectedSystemData.metrics[0].value.replace(/,/g, "")) || 0 },
    { name: "Calories", value: Number.parseInt(selectedSystemData.metrics[1].value.replace(/,/g, "")) || 0 },
    {
      name: "Distance",
      value: Number.parseInt(selectedSystemData.metrics[2]?.value.replace(/km/, "").replace(/,/g, "")) || 0,
    },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{selectedSystemData.title}</h2>
        {selectedSystemData.icon}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedSystemData.metrics.map((metric, index) => (
          <div key={index} className="bg-gray-100 rounded-lg p-4">
            <p className="text-gray-600 text-sm">{metric.name}</p>
            <p className="text-lg font-semibold">{metric.value}</p>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" dataKey="value">
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default HealthVisualizations

