
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", users: 400 },
  { month: "Feb", users: 520 },
  { month: "Mar", users: 680 },
  { month: "Apr", users: 750 },
  { month: "May", users: 920 },
  { month: "Jun", users: 1200 },
]

export default function UserGrowthChart() {
  return (
    <div className="card border-0 shadow-sm h-100">

      {/* Header */}
      <div className="card-header bg-white border-0">
        <h5 className="fw-bold mb-1">User Growth</h5>
        <p className="text-muted small mb-0">
          Monthly user registration trend
        </p>
      </div>

      {/* Body */}
      <div className="card-body">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6c757d" />
            <YAxis stroke="#6c757d" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
              }}
            />

            <Line
              type="monotone"
              dataKey="users"
              stroke="#0d6efd"
              strokeWidth={3}
              dot={{ fill: "#0d6efd", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}
