import { createFileRoute } from "@tanstack/react-router";
import { OceanLayout } from "@/components/OceanLayout";
import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { Database, TrendingUp, Layers, Zap } from "lucide-react";
import { ClientECharts } from "@/components/ClientECharts";
import * as echarts from "echarts/core";
import { LineChart, BarChart, HeatmapChart, ScatterChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent, VisualMapComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { baseChartOption } from "@/lib/chart-theme";

echarts.use([LineChart, BarChart, HeatmapChart, ScatterChart, GridComponent, TooltipComponent, LegendComponent, VisualMapComponent, CanvasRenderer]);

export const Route = createFileRoute("/analysis")({
  component: AnalysisPage,
  head: () => ({ meta: [{ title: "数据分析 — 海洋环境监测平台" }] }),
});

function AnalysisPage() {
  const correlationScatter = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: "item" },
    xAxis: { ...baseChartOption.xAxis, type: "value", name: "水温 (°C)", min: 10, max: 32 },
    yAxis: { ...baseChartOption.yAxis, type: "value", name: "溶解氧 (mg/L)", min: 4, max: 12 },
    series: [{
      type: "scatter", symbolSize: 12,
      data: Array.from({ length: 60 }, () => [(10 + Math.random() * 22).toFixed(1), (12 - (Math.random() * 6)).toFixed(1)]),
      itemStyle: {
        color: { type: "radial", x: 0.5, y: 0.5, r: 0.5, colorStops: [{ offset: 0, color: "rgba(34,211,238,0.8)" }, { offset: 1, color: "rgba(34,211,238,0.2)" }] },
        shadowBlur: 10, shadowColor: "rgba(34,211,238,0.3)",
      },
    }],
  };

  const heatmapHours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const heatmapDays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  const heatmapData: [number, number, number][] = [];
  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      heatmapData.push([h, d, Math.floor(Math.random() * 100)]);
    }
  }

  const heatmapChart = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, position: "top" },
    xAxis: { ...baseChartOption.xAxis, type: "category", data: heatmapHours, splitArea: { show: true, areaStyle: { color: ["rgba(0,0,0,0)"] } } },
    yAxis: { ...baseChartOption.yAxis, type: "category", data: heatmapDays, splitArea: { show: true } },
    visualMap: { min: 0, max: 100, calculable: true, orient: "horizontal", left: "center", bottom: 0, inRange: { color: ["#0c4a6e", "#0891b2", "#22d3ee", "#67e8f9", "#fbbf24", "#ef4444"] }, textStyle: { color: "#94a3b8" } },
    series: [{ type: "heatmap", data: heatmapData, label: { show: false }, emphasis: { itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.5)" } } }],
  };

  const multiLine = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: "axis" },
    legend: { ...baseChartOption.legend, data: ["预测值", "实际值", "置信区间上限", "置信区间下限"] },
    xAxis: { ...baseChartOption.xAxis, type: "category", data: Array.from({ length: 30 }, (_, i) => `${i + 1}日`) },
    yAxis: { ...baseChartOption.yAxis, type: "value" },
    series: [
      { name: "实际值", type: "line", data: Array.from({ length: 20 }, () => (20 + Math.random() * 8).toFixed(1)), lineStyle: { color: "#22d3ee", width: 2 }, itemStyle: { color: "#22d3ee" }, symbol: "none" },
      { name: "预测值", type: "line", data: Array.from({ length: 30 }, () => (20 + Math.random() * 8).toFixed(1)), lineStyle: { color: "#a78bfa", width: 2, type: "dashed" }, itemStyle: { color: "#a78bfa" }, symbol: "none" },
      { name: "置信区间上限", type: "line", data: Array.from({ length: 30 }, () => (26 + Math.random() * 5).toFixed(1)), lineStyle: { opacity: 0 }, itemStyle: { opacity: 0 }, stack: "ci", symbol: "none" },
      { name: "置信区间下限", type: "line", data: Array.from({ length: 30 }, () => (16 + Math.random() * 3).toFixed(1)), lineStyle: { opacity: 0 }, itemStyle: { opacity: 0 }, stack: "ci", areaStyle: { color: "rgba(167,139,250,0.08)" }, symbol: "none" },
    ],
  };

  const monthlyBar = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: "axis" },
    legend: { ...baseChartOption.legend, data: ["数据采集量", "有效数据率"] },
    xAxis: { ...baseChartOption.xAxis, type: "category", data: ["1月", "2月", "3月", "4月", "5月", "6月"] },
    yAxis: [
      { ...baseChartOption.yAxis, type: "value", name: "万条" },
      { ...baseChartOption.yAxis, type: "value", name: "%", position: "right", min: 90, max: 100, splitLine: { show: false } },
    ],
    series: [
      { name: "数据采集量", type: "bar", data: [185, 210, 198, 230, 245, 260], yAxisIndex: 0, itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#22d3ee" }, { offset: 1, color: "#0891b2" }] }, borderRadius: [6, 6, 0, 0] }, barWidth: "45%" },
      { name: "有效数据率", type: "line", data: [96.2, 97.1, 95.8, 98.0, 97.5, 98.8], yAxisIndex: 1, lineStyle: { color: "#f472b6", width: 3 }, itemStyle: { color: "#f472b6" }, symbol: "circle", symbolSize: 8 },
    ],
  };

  return (
    <OceanLayout>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="数据总量" value="1.28" unit="亿条" trend="up" trendValue="+15%" icon={<Database className="w-5 h-5" />} />
        <StatCard label="分析模型" value="12" unit="个" icon={<Layers className="w-5 h-5" />} color="teal" />
        <StatCard label="预测准确率" value="94.6" unit="%" trend="up" trendValue="+1.2%" icon={<TrendingUp className="w-5 h-5" />} color="success" />
        <StatCard label="实时计算" value="3.2" unit="TB/日" icon={<Zap className="w-5 h-5" />} color="warning" />
      </div>

      {/* 2-col layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <GlassCard title="水温-溶解氧相关性分析">
          <ClientECharts echarts={echarts} option={correlationScatter} style={{ height: 320 }} />
        </GlassCard>
        <GlassCard title="数据密度热力图 (AQI)">
          <ClientECharts echarts={echarts} option={heatmapChart} style={{ height: 320 }} />
        </GlassCard>
      </div>

      <GlassCard title="水温预测模型 (30天)" className="mb-6">
        <ClientECharts echarts={echarts} option={multiLine} style={{ height: 300 }} />
      </GlassCard>

      <GlassCard title="月度数据采集与质量">
        <ClientECharts echarts={echarts} option={monthlyBar} style={{ height: 280 }} />
      </GlassCard>
    </OceanLayout>
  );
}
