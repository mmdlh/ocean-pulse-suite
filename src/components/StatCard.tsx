import { type ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  icon?: ReactNode;
  color?: "cyan" | "teal" | "warning" | "danger" | "success";
}

const colorMap = {
  cyan: "text-ocean-cyan",
  teal: "text-ocean-teal",
  warning: "text-ocean-warning",
  danger: "text-ocean-danger",
  success: "text-ocean-success",
};

const trendColorMap = {
  up: "text-ocean-success",
  down: "text-ocean-danger",
  stable: "text-muted-foreground",
};

export function StatCard({ label, value, unit, trend, trendValue, icon, color = "cyan" }: StatCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div className="glass-card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
        {icon && <div className={`${colorMap[color]} opacity-70`}>{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`font-display text-2xl font-bold stat-glow ${colorMap[color]}`}>{value}</span>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs ${trendColorMap[trend]}`}>
          <TrendIcon className="w-3 h-3" />
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
}
