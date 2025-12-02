
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { category: "Electronics", sales: 4200 },
  { category: "Clothing", sales: 3800 },
  { category: "Furniture", sales: 2800 },
  { category: "Books", sales: 2200 },
  { category: "Sports", sales: 2900 },
  { category: "Others", sales: 1800 },
]

export default function SalesChart() {
  return (
    <div className="card border-0 shadow-sm h-100">

      {/* Header */}
      <div className="card-header bg-white border-0">
        <h5 className="fw-bold mb-1">Product Sales</h5>
        <p className="text-muted small mb-0">
          Sales by product category
        </p>
      </div>

      {/* Body */}
      <div className="card-body">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="category" stroke="#6c757d" />
            <YAxis stroke="#6c757d" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
              }}
            />

            <Bar
              dataKey="sales"
              fill="#0d6efd"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
