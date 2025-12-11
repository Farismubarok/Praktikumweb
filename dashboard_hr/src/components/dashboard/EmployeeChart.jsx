import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { useDivisionEmployeeCount } from "../hooks/useDivisions";
import "./EmployeeChart.css";

const colors = [
  "hsl(224, 71%, 25%)",
  "hsl(199, 89%, 48%)",
  "hsl(142, 71%, 45%)",
  "hsl(38, 92%, 50%)",
  "hsl(262, 83%, 58%)",
  "hsl(0, 84%, 60%)",
];

export default function EmployeeChart() {
  const { data: employeeCounts, isLoading } = useDivisionEmployeeCount();

  const chartData =
    employeeCounts?.map((item, index) => ({
      name: item.name,
      count: item.count,
      color: colors[index % colors.length],
    })) || [];

  return (
    <div className="chart-container" style={{ animationDelay: "200ms" }}>
      <div className="chart-header">
        <h3 className="chart-title">Jumlah Karyawan per Divisi</h3>
        <p className="chart-subtitle">Total karyawan di setiap departemen</p>
      </div>

      <div className="chart-body">
        {isLoading ? (
          <div className="chart-empty">Memuat data...</div>
        ) : chartData.length === 0 ? (
          <div className="chart-empty">Belum ada data karyawan</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                labelStyle={{
                  color: "hsl(var(--foreground))",
                  fontWeight: 600,
                }}
              />

              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
