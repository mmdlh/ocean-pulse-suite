export const oceanChartColors = [
  "#4f6bf6", "#3b5ce5", "#5b7ff9", "#2d4fd4", "#6b8afc",
  "#7c9dff", "#3a5bc7", "#a78bfa", "#f472b6", "#fbbf24",
];

export const baseChartOption = {
  backgroundColor: "transparent",
  textStyle: { color: "#94a3b8", fontFamily: "Inter, sans-serif" },
  legend: { textStyle: { color: "#94a3b8" } },
  grid: { left: "3%", right: "4%", bottom: "12%", containLabel: true },
  tooltip: {
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    borderColor: "rgba(79, 107, 246, 0.3)",
    textStyle: { color: "#e2e8f0" },
  },
  xAxis: {
    axisLine: { lineStyle: { color: "rgba(100,116,139,0.3)" } },
    axisLabel: { color: "#94a3b8" },
    splitLine: { lineStyle: { color: "rgba(100,116,139,0.1)" } },
  },
  yAxis: {
    axisLine: { lineStyle: { color: "rgba(100,116,139,0.3)" } },
    axisLabel: { color: "#94a3b8" },
    splitLine: { lineStyle: { color: "rgba(100,116,139,0.1)" } },
  },
};

export function gradientColor(color1: string, color2: string) {
  return {
    type: "linear" as const,
    x: 0, y: 0, x2: 0, y2: 1,
    colorStops: [
      { offset: 0, color: color1 },
      { offset: 1, color: color2 },
    ],
  };
}

export function areaGradient(color: string) {
  return {
    type: "linear" as const,
    x: 0, y: 0, x2: 0, y2: 1,
    colorStops: [
      { offset: 0, color: color.replace(")", ", 0.4)").replace("rgb", "rgba") },
      { offset: 1, color: color.replace(")", ", 0.02)").replace("rgb", "rgba") },
    ],
  };
}
