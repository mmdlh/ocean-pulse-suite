import { createFileRoute } from "@tanstack/react-router";
import { OceanLayout } from "@/components/OceanLayout";
import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { StatusIndicator } from "@/components/StatusIndicator";
import { Thermometer, Droplets, Wind, Gauge, Activity, Anchor } from "lucide-react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { LineChart, BarChart, PieChart, RadarChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent, RadarComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { baseChartOption } from "@/lib/chart-theme";

echarts.use([LineChart, BarChart, PieChart, RadarChart, GridComponent, TooltipComponent, LegendComponent, RadarComponent, CanvasRenderer]);

export const Route = createFileRoute("/")({
  component: OverviewPage,
  head: () => ({
    meta: [
      { title: "总览 — 海洋环境监测平台" },
      { name: "description", content: "海洋环境监测平台总览" },
    ],
  }),
});

const months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

function OverviewPage() {
  const lineOption = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: "axis" },
    legend: { ...baseChartOption.legend, data: ["水温", "盐度", "溶解氧"] },
    xAxis: { ...baseChartOption.xAxis, type: "category", data: months, boundaryGap: false },
    yAxis: { ...baseChartOption.yAxis, type: "value" },
    series: [
      {
        name: "水温", type: "line", smooth: true, data: [12, 13, 15, 18, 22, 26, 28, 27, 24, 20, 16, 13],
        lineStyle: { color: "#22d3ee", width: 3 },
        itemStyle: { color: "#22d3ee" },
        areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(34,211,238,0.3)" }, { offset: 1, color: "rgba(34,211,238,0)" }] } },
      },
      {
        name: "盐度", type: "line", smooth: true, data: [33, 33.2, 33.5, 33.8, 34, 34.2, 34.5, 34.3, 34, 33.8, 33.5, 33.2],
        lineStyle: { color: "#a78bfa", width: 3 },
        itemStyle: { color: "#a78bfa" },
        areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(167,139,250,0.2)" }, { offset: 1, color: "rgba(167,139,250,0)" }] } },
      },
      {
        name: "溶解氧", type: "line", smooth: true, data: [9.2, 9, 8.5, 8, 7.5, 7, 6.8, 7, 7.5, 8, 8.5, 9],
        lineStyle: { color: "#2dd4bf", width: 3 },
        itemStyle: { color: "#2dd4bf" },
        areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(45,212,191,0.2)" }, { offset: 1, color: "rgba(45,212,191,0)" }] } },
      },
    ],
  };

  const barOption = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: "axis" },
    xAxis: { ...baseChartOption.xAxis, type: "category", data: ["站点A", "站点B", "站点C", "站点D", "站点E", "站点F"] },
    yAxis: { ...baseChartOption.yAxis, type: "value", name: "AQI" },
    series: [{
      type: "bar", barWidth: "50%",
      data: [
        { value: 65, itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#22d3ee" }, { offset: 1, color: "#0891b2" }] }, borderRadius: [6, 6, 0, 0] } },
        { value: 82, itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#a78bfa" }, { offset: 1, color: "#7c3aed" }] }, borderRadius: [6, 6, 0, 0] } },
        { value: 45, itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#2dd4bf" }, { offset: 1, color: "#0d9488" }] }, borderRadius: [6, 6, 0, 0] } },
        { value: 93, itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#f472b6" }, { offset: 1, color: "#db2777" }] }, borderRadius: [6, 6, 0, 0] } },
        { value: 58, itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#38bdf8" }, { offset: 1, color: "#0284c7" }] }, borderRadius: [6, 6, 0, 0] } },
        { value: 71, itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#fbbf24" }, { offset: 1, color: "#d97706" }] }, borderRadius: [6, 6, 0, 0] } },
      ],
    }],
  };

  const radarOption = {
    ...baseChartOption,
    radar: {
      indicator: [
        { name: "pH值", max: 14 }, { name: "溶解氧", max: 15 }, { name: "氨氮", max: 5 },
        { name: "COD", max: 100 }, { name: "总磷", max: 2 }, { name: "透明度", max: 10 },
      ],
      shape: "polygon",
      splitNumber: 4,
      axisName: { color: "#94a3b8" },
      splitLine: { lineStyle: { color: "rgba(100,116,139,0.2)" } },
      splitArea: { areaStyle: { color: ["rgba(34,211,238,0.02)", "rgba(34,211,238,0.05)"] } },
      axisLine: { lineStyle: { color: "rgba(100,116,139,0.2)" } },
    },
    series: [{
      type: "radar",
      data: [
        {
          value: [7.8, 8.5, 0.5, 25, 0.3, 6],
          name: "当前值",
          lineStyle: { color: "#22d3ee", width: 2 },
          itemStyle: { color: "#22d3ee" },
          areaStyle: { color: "rgba(34,211,238,0.15)" },
        },
        {
          value: [7.2, 6, 1.5, 50, 0.8, 4],
          name: "标准值",
          lineStyle: { color: "#a78bfa", width: 2, type: "dashed" },
          itemStyle: { color: "#a78bfa" },
          areaStyle: { color: "rgba(167,139,250,0.08)" },
        },
      ],
    }],
    legend: { ...baseChartOption.legend, data: ["当前值", "标准值"], bottom: 0 },
  };

  const pieOption = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: "item" },
    legend: { ...baseChartOption.legend, orient: "vertical", right: "5%", top: "center" },
    series: [{
      type: "pie", radius: ["40%", "70%"], center: ["35%", "50%"],
      itemStyle: { borderRadius: 8, borderColor: "rgba(15,23,42,0.8)", borderWidth: 2 },
      label: { show: false },
      emphasis: { label: { show: true, fontSize: 14, fontWeight: "bold", color: "#e2e8f0" } },
      data: [
        { value: 35, name: "I类水质", itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 1, colorStops: [{ offset: 0, color: "#22d3ee" }, { offset: 1, color: "#06b6d4" }] } } },
        { value: 28, name: "II类水质", itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 1, colorStops: [{ offset: 0, color: "#2dd4bf" }, { offset: 1, color: "#14b8a6" }] } } },
        { value: 20, name: "III类水质", itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 1, colorStops: [{ offset: 0, color: "#a78bfa" }, { offset: 1, color: "#8b5cf6" }] } } },
        { value: 12, name: "IV类水质", itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 1, colorStops: [{ offset: 0, color: "#fbbf24" }, { offset: 1, color: "#f59e0b" }] } } },
        { value: 5, name: "V类水质", itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 1, colorStops: [{ offset: 0, color: "#f472b6" }, { offset: 1, color: "#ec4899" }] } } },
      ],
    }],
  };

  return (
    <OceanLayout>
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
        <StatCard label="监测站点" value="128" unit="个" trend="up" trendValue="+5" icon={<Anchor className="w-5 h-5" />} />
        <StatCard label="平均水温" value="22.5" unit="°C" trend="up" trendValue="+1.2°C" icon={<Thermometer className="w-5 h-5" />} color="teal" />
        <StatCard label="平均盐度" value="34.2" unit="‰" trend="stable" trendValue="±0.1" icon={<Droplets className="w-5 h-5" />} color="cyan" />
        <StatCard label="风速" value="15.8" unit="m/s" trend="down" trendValue="-2.3" icon={<Wind className="w-5 h-5" />} color="warning" />
        <StatCard label="水质达标率" value="92.3" unit="%" trend="up" trendValue="+3.1%" icon={<Gauge className="w-5 h-5" />} color="success" />
        <StatCard label="告警数" value="7" unit="条" trend="down" trendValue="-3" icon={<Activity className="w-5 h-5" />} color="danger" />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <GlassCard title="水温/盐度/溶解氧趋势" className="lg:col-span-2">
          <ReactEChartsCore echarts={echarts} option={lineOption} style={{ height: 320 }} />
        </GlassCard>
        <GlassCard title="水质雷达分析">
          <ReactEChartsCore echarts={echarts} option={radarOption} style={{ height: 320 }} />
        </GlassCard>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <GlassCard title="各站点环境质量指数">
          <ReactEChartsCore echarts={echarts} option={barOption} style={{ height: 280 }} />
        </GlassCard>
        <GlassCard title="水质分类占比">
          <ReactEChartsCore echarts={echarts} option={pieOption} style={{ height: 280 }} />
        </GlassCard>
      </div>

      {/* Status row */}
      <GlassCard title="设备运行状态">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6">
          <StatusIndicator status="online" label="浮标站 #001" detail="南海 - 深度50m" />
          <StatusIndicator status="online" label="浮标站 #002" detail="东海 - 深度30m" />
          <StatusIndicator status="warning" label="潮汐站 #003" detail="黄海 - 数据延迟" />
          <StatusIndicator status="online" label="气象站 #004" detail="渤海 - 正常运行" />
          <StatusIndicator status="offline" label="水下探测器 #005" detail="南海 - 失去连接" />
          <StatusIndicator status="maintenance" label="声纳阵列 #006" detail="东海 - 定期维护" />
          <StatusIndicator status="online" label="卫星接收站 #007" detail="广州 - 正常" />
          <StatusIndicator status="online" label="数据中心 #008" detail="北京 - 运行良好" />
        </div>
      </GlassCard>
    </OceanLayout>
  );
}
