import { createFileRoute } from "@tanstack/react-router";
import { OceanLayout } from "@/components/OceanLayout";
import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { DataTable } from "@/components/DataTable";
import { Fish, Bug, TreePine, Shell } from "lucide-react";
import { ClientECharts } from "@/components/ClientECharts";
import * as echarts from "echarts/core";
import { PieChart, BarChart, LineChart, RadarChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent, RadarComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { baseChartOption } from "@/lib/chart-theme";

echarts.use([PieChart, BarChart, LineChart, RadarChart, GridComponent, TooltipComponent, LegendComponent, RadarComponent, CanvasRenderer]);

export const Route = createFileRoute("/ecology")({
  component: EcologyPage,
  head: () => ({ meta: [{ title: "海洋生态 — 海洋环境监测平台" }] }),
});

function EcologyPage() {
  const speciesPie = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: "item" },
    series: [{
      type: "pie", radius: ["30%", "65%"], roseType: "area",
      itemStyle: { borderRadius: 6, borderColor: "rgba(15,23,42,0.8)", borderWidth: 2 },
      label: { color: "#94a3b8", fontSize: 11 },
      data: [
        { value: 42, name: "鱼类", itemStyle: { color: "#4f6bf6" } },
        { value: 28, name: "甲壳类", itemStyle: { color: "#a78bfa" } },
        { value: 18, name: "软体动物", itemStyle: { color: "#6b8afc" } },
        { value: 12, name: "海藻", itemStyle: { color: "#fbbf24" } },
        { value: 8, name: "珊瑚", itemStyle: { color: "#f472b6" } },
        { value: 5, name: "海洋哺乳", itemStyle: { color: "#5b7ff9" } },
      ],
    }],
  };

  const biodiversityRadar = {
    ...baseChartOption,
    radar: {
      indicator: [
        { name: "物种丰富度", max: 100 }, { name: "均匀度", max: 1 }, { name: "多样性指数", max: 5 },
        { name: "优势度", max: 1 }, { name: "生物量", max: 500 },
      ],
      shape: "polygon", splitNumber: 4,
      axisName: { color: "#94a3b8", fontSize: 11 },
      splitLine: { lineStyle: { color: "rgba(100,116,139,0.2)" } },
      splitArea: { areaStyle: { color: ["rgba(79,107,246,0.02)", "rgba(79,107,246,0.05)"] } },
      axisLine: { lineStyle: { color: "rgba(100,116,139,0.2)" } },
    },
    legend: { ...baseChartOption.legend, data: ["南海", "东海", "黄海"], bottom: 0 },
    series: [{
      type: "radar",
      data: [
        { value: [85, 0.8, 3.8, 0.3, 420], name: "南海", lineStyle: { color: "#4f6bf6" }, itemStyle: { color: "#4f6bf6" }, areaStyle: { color: "rgba(79,107,246,0.12)" } },
        { value: [62, 0.6, 2.9, 0.5, 280], name: "东海", lineStyle: { color: "#a78bfa" }, itemStyle: { color: "#a78bfa" }, areaStyle: { color: "rgba(167,139,250,0.1)" } },
        { value: [45, 0.5, 2.1, 0.6, 180], name: "黄海", lineStyle: { color: "#6b8afc" }, itemStyle: { color: "#6b8afc" }, areaStyle: { color: "rgba(107,138,252,0.1)" } },
      ],
    }],
  };

  const populationTrend = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: "axis" },
    legend: { ...baseChartOption.legend, data: ["鱼类", "甲壳类", "珊瑚覆盖率"] },
    xAxis: { ...baseChartOption.xAxis, type: "category", data: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"] },
    yAxis: { ...baseChartOption.yAxis, type: "value" },
    series: [
      { name: "鱼类", type: "bar", data: [320, 290, 310, 340, 360, 380, 395], itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#4f6bf6" }, { offset: 1, color: "#2d4fd4" }] }, borderRadius: [4, 4, 0, 0] } },
      { name: "甲壳类", type: "bar", data: [180, 160, 175, 190, 200, 215, 225], itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#a78bfa" }, { offset: 1, color: "#7c3aed" }] }, borderRadius: [4, 4, 0, 0] } },
      { name: "珊瑚覆盖率", type: "line", smooth: true, yAxisIndex: 0, data: [45, 42, 40, 43, 46, 48, 50], lineStyle: { color: "#f472b6", width: 3 }, itemStyle: { color: "#f472b6" }, symbol: "circle", symbolSize: 8 },
    ],
  };

  type EcoRow = { area: string; species: string; diversity: string; biomass: string; trend: string };
  const tableData: EcoRow[] = [
    { area: "南海珊瑚礁", species: "156", diversity: "3.82", biomass: "420 g/m²", trend: "上升" },
    { area: "东海大陆架", species: "98", diversity: "2.91", biomass: "280 g/m²", trend: "稳定" },
    { area: "黄海浅滩", species: "72", diversity: "2.15", biomass: "180 g/m²", trend: "下降" },
    { area: "渤海湾", species: "64", diversity: "1.98", biomass: "150 g/m²", trend: "稳定" },
    { area: "台湾海峡", species: "112", diversity: "3.24", biomass: "350 g/m²", trend: "上升" },
  ];

  return (
    <OceanLayout>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="监测物种" value="502" unit="种" trend="up" trendValue="+12" icon={<Fish className="w-5 h-5" />} />
        <StatCard label="多样性指数" value="3.82" trend="up" trendValue="+0.15" icon={<Bug className="w-5 h-5" />} color="teal" />
        <StatCard label="珊瑚覆盖率" value="50" unit="%" trend="up" trendValue="+2%" icon={<Shell className="w-5 h-5" />} color="success" />
        <StatCard label="红树林面积" value="2,840" unit="公顷" trend="up" trendValue="+120" icon={<TreePine className="w-5 h-5" />} color="success" />
      </div>

      {/* Asymmetric 3-col layout */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <GlassCard title="物种分布" className="md:col-span-2">
          <ClientECharts echarts={echarts} option={speciesPie} style={{ height: 300 }} />
        </GlassCard>
        <GlassCard title="生态多样性对比" className="md:col-span-3">
          <ClientECharts echarts={echarts} option={biodiversityRadar} style={{ height: 300 }} />
        </GlassCard>
      </div>

      <GlassCard title="生物种群年度变化趋势" className="mb-6">
        <ClientECharts echarts={echarts} option={populationTrend} style={{ height: 300 }} />
      </GlassCard>

      <GlassCard title="各海域生态指标">
        <DataTable
          columns={[
            { key: "area", label: "海域" },
            { key: "species", label: "物种数" },
            { key: "diversity", label: "多样性指数" },
            { key: "biomass", label: "生物量" },
            { key: "trend", label: "趋势", render: (v) => {
              const c = v === "上升" ? "text-ocean-success" : v === "下降" ? "text-ocean-danger" : "text-ocean-cyan";
              return <span className={`font-medium ${c}`}>{String(v)}</span>;
            }},
          ]}
          data={tableData}
        />
      </GlassCard>
    </OceanLayout>
  );
}
