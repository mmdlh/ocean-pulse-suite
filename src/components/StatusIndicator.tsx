interface StatusIndicatorProps {
  status: "online" | "warning" | "offline" | "maintenance";
  label: string;
  detail?: string;
}

const statusConfig = {
  online: { color: "bg-ocean-success text-ocean-success", text: "在线" },
  warning: { color: "bg-ocean-warning text-ocean-warning", text: "警告" },
  offline: { color: "bg-ocean-danger text-ocean-danger", text: "离线" },
  maintenance: { color: "bg-ocean-teal text-ocean-teal", text: "维护中" },
};

export function StatusIndicator({ status, label, detail }: StatusIndicatorProps) {
  const config = statusConfig[status];
  return (
    <div className="flex items-center gap-3 py-2">
      <div className={`w-2.5 h-2.5 rounded-full status-pulse ${config.color}`} />
      <div className="flex-1 min-w-0">
        <div className="text-sm text-foreground truncate">{label}</div>
        {detail && <div className="text-xs text-muted-foreground">{detail}</div>}
      </div>
      <span className={`text-xs font-medium ${config.color.split(" ")[1]}`}>{config.text}</span>
    </div>
  );
}
