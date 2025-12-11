import React from "react";
import "./StatCard.css";

export default function StatCard({
  title,
  value,
//   icon: Icon,
  trend,
  variant = "default",
  delay = 0,
}) {
  const variantStyles = {
    default: "stat-default",
    primary: "stat-primary",
    success: "stat-success",
    warning: "stat-warning",
    info: "stat-info",
  };

  return (
    <div
      className={`stat-card ${variantStyles[variant]}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="stat-header">
        <div className="stat-texts">
          <p className="stat-title">{title}</p>
          <p className="stat-value">{value}</p>

          {trend && (
            <p className={`stat-trend ${trend.positive ? "trend-positive" : "trend-negative"}`}>
              {trend.positive ? "+" : "-"}
              {trend.value}% dari bulan lalu
            </p>
          )}
        </div>

        <div className="stat-icon">
          <Icon className="stat-icon-svg" />
        </div>
      </div>
    </div>
  );
}
