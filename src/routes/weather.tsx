import { createFileRoute } from "@tanstack/react-router";
import { OceanLayout } from "@/components/OceanLayout";
import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { Thermometer, Wind, CloudRain, Eye } from "lucide-react";
import { ClientECharts } from "@/components/ClientECharts";
import * as echarts from "echarts/core";
import { LineChart, BarChart, ScatterChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent, VisualMapComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { baseChartOption } from "@/lib/chart-theme";

echarts.use([LineChart, BarChart, ScatterChart, GridComponent, TooltipComponent, LegendComponent, VisualMapComponent, CanvasRenderer]);

export const Route = createFileRoute("/weather")({
  component: WeatherPage,
  head: () => ({ meta: [{ title: "气象数据 — 海洋环境监测平台" }] }),
});

const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

function WeatherPage() {
  const tempWindChart = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: "axis" },
    legend: { ...baseChartOption.legend, data: ["气温", "风速"] },
    xAxis: { ...baseChartOption.xAxis, type: "category", data: days },
    yAxis: [
      { ...baseChartOption.yAxis, type: "value", name: "°C" },
      { ...baseChartOption.yAxis, type: "value", name: "m/s", position: "right", splitLine: { show: false } },
    ],
    series: [
      {
        name: "气温", type: "line", smooth: true, yAxisIndex: 0,
        data: [24, 26, 23, 28, 30, 27, 25],
        lineStyle: { color: "#f472b6", width: 3, shadowColor: "rgba(244,114,182,0.4)", shadowBlur: 10 },
        itemStyle: { color: "#f472b6", borderWidth: 2, borderColor: "#fff" },
        areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(244,114,182,0.25)" }, { offset: 1, color: "rgba(244,114,182,0)" }] } },
      },
      {
        name: "风速", type: "bar", yAxisIndex: 1,
        data: [12, 18, 8, 22, 15, 10, 14],
        itemStyle: {
          color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#38bdf8" }, { offset: 1, color: "#0284c7" }] },
          borderRadius: [4, 4, 0, 0],
        },
        barWidth: "40%",
      },
    ],
  };

  const pressureChart = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: "axis" },
    xAxis: { ...baseChartOption.xAxis, type: "category", data: Array.from({ length: 48 }, (_, i) => `${Math.floor(i / 2)}:${i % 2 === 0 ? "00" : "30"}`), axisLabel: { ...baseChartOption.xAxis.axisLabel, interval: 5 } },
    yAxis: { ...baseChartOption.yAxis, type: "value", name: "hPa", min: 1005, max: 1025 },
    series: [{
      type: "line", smooth: true, symbol: "none",
      data: Array.from({ length: 48 }, () => (1010 + Math.random() * 10).toFixed(1)),
      lineStyle: { color: "#a78bfa", width: 2 },
      areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(167,139,250,0.2)" }, { offset: 1, color: "rgba(167,139,250,0)" }] } },
    }],
  };

  const humidityHeatmap = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: "axis" },
    xAxis: { ...baseChartOption.xAxis, type: "category", data: days },
    yAxis: { ...baseChartOption.yAxis, type: "value", name: "%", min: 40, max: 100 },
    series: [
      {
        type: "bar", name: "湿度",
        data: [72, 68, 85, 60, 78, 90, 75],
        itemStyle: {
          color: (params: { dataIndex: number }) => {
            const colors = [
              { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#67e8f9" }, { offset: 1, color: "#22d3ee" }] },
              { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#5eead4" }, { offset: 1, color: "#14b8a6" }] },
            ];
            return colors[params.dataIndex % 2] as unknown as string;
          },
          borderRadius: [8, 8, 0, 0],
        },
        barWidth: "50%",
      },
    ],
  };

  return (
    <OceanLayout>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="当前气温" value="26.8" unit="°C" trend="up" trendValue="+2.1" icon={<Thermometer className="w-5 h-5" />} />
        <StatCard label="最大风速" value="22" unit="m/s" trend="up" trendValue="阵风" icon={<Wind className="w-5 h-5" />} color="warning" />
        <StatCard label="降水概率" value="35" unit="%" trend="down" trendValue="-10%" icon={<CloudRain className="w-5 h-5" />} color="teal" />
        <StatCard label="能见度" value="12.5" unit="km" trend="stable" trendValue="良好" icon={<Eye className="w-5 h-5" />} color="success" />
      </div>

      {/* Full width chart */}
      <GlassCard title="气温与风速对比" className="mb-6">
        <ClientECharts echarts={echarts} option={tempWindChart} style={{ height: 350 }} />
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard title="48小时气压变化">
          <ClientECharts echarts={echarts} option={pressureChart} style={{ height: 280 }} />
        </GlassCard>
        <GlassCard title="每日湿度">
          <ClientECharts echarts={echarts} option={humidityHeatmap} style={{ height: 280 }} />
        </GlassCard>
      </div>
    </OceanLayout>
  );
}
