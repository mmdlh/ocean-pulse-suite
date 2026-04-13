import { createFileRoute } from "@tanstack/react-router";
import { OceanLayout } from "@/components/OceanLayout";
import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { DataTable } from "@/components/DataTable";
import { Droplets, Beaker, FlaskConical, TestTubes } from "lucide-react";
import { ClientECharts } from "@/components/ClientECharts";
import * as echarts from "echarts/core";
import { LineChart, BarChart, GaugeChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { baseChartOption } from "@/lib/chart-theme";

echarts.use([LineChart, BarChart, GaugeChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

export const Route = createFileRoute("/water-quality")({
  component: WaterQualityPage,
  head: () => ({ meta: [{ title: "水质监测 — 海洋环境监测平台" }] }),
});

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

function WaterQualityPage() {
  const phGauge = {
    ...baseChartOption,
    series: [{
      type: "gauge", startAngle: 220, endAngle: -40, min: 0, max: 14,
      pointer: { length: "60%", width: 6, itemStyle: { color: "#4f6bf6" } },
      progress: { show: true, width: 14, itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: "#2d4fd4" }, { offset: 1, color: "#4f6bf6" }] } } },
      axisLine: { lineStyle: { width: 14, color: [[0.3, "#ef4444"], [0.5, "#fbbf24"], [0.7, "#4f6bf6"], [1, "#a78bfa"]] } },
      axisTick: { show: false },
      splitLine: { length: 8, lineStyle: { color: "#475569", width: 2 } },
      axisLabel: { color: "#94a3b8", distance: 20, fontSize: 11 },
      detail: { valueAnimation: true, fontSize: 28, fontFamily: "Orbitron", color: "#4f6bf6", offsetCenter: [0, "70%"], formatter: "{value}" },
      data: [{ value: 7.8, name: "pH值" }],
      title: { color: "#94a3b8", offsetCenter: [0, "90%"], fontSize: 12 },
    }],
  };

  const doGauge = {
    ...baseChartOption,
    series: [{
      type: "gauge", startAngle: 220, endAngle: -40, min: 0, max: 15,
      pointer: { length: "60%", width: 6, itemStyle: { color: "#6b8afc" } },
      progress: { show: true, width: 14, itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: "#3a5bc7" }, { offset: 1, color: "#6b8afc" }] } } },
      axisLine: { lineStyle: { width: 14, color: [[0.3, "#ef4444"], [0.5, "#fbbf24"], [0.7, "#6b8afc"], [1, "#4f6bf6"]] } },
      axisTick: { show: false },
      splitLine: { length: 8, lineStyle: { color: "#475569", width: 2 } },
      axisLabel: { color: "#94a3b8", distance: 20, fontSize: 11 },
      detail: { valueAnimation: true, fontSize: 28, fontFamily: "Orbitron", color: "#6b8afc", offsetCenter: [0, "70%"], formatter: "{value} mg/L" },
      data: [{ value: 8.2, name: "溶解氧" }],
      title: { color: "#94a3b8", offsetCenter: [0, "90%"], fontSize: 12 },
    }],
  };

  const realtimeLine = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: "axis" },
    legend: { ...baseChartOption.legend, data: ["pH值", "溶解氧", "浊度"] },
    xAxis: { ...baseChartOption.xAxis, type: "category", data: hours, boundaryGap: false },
    yAxis: { ...baseChartOption.yAxis, type: "value" },
    series: [
      { name: "pH值", type: "line", smooth: true, data: Array.from({ length: 24 }, () => (7 + Math.random() * 1.5).toFixed(1)), lineStyle: { color: "#4f6bf6", width: 2 }, itemStyle: { color: "#4f6bf6" }, symbol: "none" },
      { name: "溶解氧", type: "line", smooth: true, data: Array.from({ length: 24 }, () => (6 + Math.random() * 4).toFixed(1)), lineStyle: { color: "#6b8afc", width: 2 }, itemStyle: { color: "#6b8afc" }, symbol: "none" },
      { name: "浊度", type: "line", smooth: true, data: Array.from({ length: 24 }, () => (10 + Math.random() * 30).toFixed(0)), lineStyle: { color: "#fbbf24", width: 2 }, itemStyle: { color: "#fbbf24" }, symbol: "none" },
    ],
  };

  const stackedBar = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: "axis" },
    legend: { ...baseChartOption.legend, data: ["氨氮", "总磷", "COD"] },
    xAxis: { ...baseChartOption.xAxis, type: "category", data: ["站A", "站B", "站C", "站D", "站E"] },
    yAxis: { ...baseChartOption.yAxis, type: "value" },
    series: [
      { name: "氨氮", type: "bar", stack: "total", data: [0.5, 0.8, 0.3, 1.2, 0.6], itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#4f6bf6" }, { offset: 1, color: "#2d4fd4" }] }, borderRadius: [0, 0, 0, 0] } },
      { name: "总磷", type: "bar", stack: "total", data: [0.3, 0.5, 0.2, 0.8, 0.4], itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#a78bfa" }, { offset: 1, color: "#7c3aed" }] } } },
      { name: "COD", type: "bar", stack: "total", data: [25, 40, 18, 55, 30], itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#f472b6" }, { offset: 1, color: "#db2777" }] }, borderRadius: [6, 6, 0, 0] } },
    ],
  };

  type WaterRow = { station: string; ph: string; do_val: string; turbidity: string; ammonia: string; status: string };
  const tableData: WaterRow[] = [
    { station: "浮标站 #001", ph: "7.8", do_val: "8.2", turbidity: "15", ammonia: "0.32", status: "达标" },
    { station: "浮标站 #002", ph: "7.5", do_val: "7.9", turbidity: "22", ammonia: "0.45", status: "达标" },
    { station: "潮汐站 #003", ph: "6.9", do_val: "5.8", turbidity: "45", ammonia: "1.20", status: "超标" },
    { station: "气象站 #004", ph: "8.1", do_val: "9.0", turbidity: "8", ammonia: "0.18", status: "优秀" },
    { station: "探测器 #005", ph: "7.2", do_val: "6.5", turbidity: "30", ammonia: "0.78", status: "达标" },
  ];

  return (
    <OceanLayout>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="平均pH" value="7.6" trend="stable" trendValue="±0.2" icon={<Beaker className="w-5 h-5" />} />
        <StatCard label="溶解氧" value="8.2" unit="mg/L" trend="up" trendValue="+0.5" icon={<Droplets className="w-5 h-5" />} color="teal" />
        <StatCard label="平均浊度" value="18.5" unit="NTU" trend="down" trendValue="-3.2" icon={<FlaskConical className="w-5 h-5" />} color="warning" />
        <StatCard label="超标站点" value="3" unit="个" trend="down" trendValue="-1" icon={<TestTubes className="w-5 h-5" />} color="danger" />
      </div>

      {/* Gauges + realtime */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <GlassCard title="pH值仪表">
          <ClientECharts echarts={echarts} option={phGauge} style={{ height: 260 }} />
        </GlassCard>
        <GlassCard title="溶解氧仪表">
          <ClientECharts echarts={echarts} option={doGauge} style={{ height: 260 }} />
        </GlassCard>
        <GlassCard title="24小时实时监测" className="lg:col-span-2">
          <ClientECharts echarts={echarts} option={realtimeLine} style={{ height: 260 }} />
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <GlassCard title="各站点污染物浓度">
          <ClientECharts echarts={echarts} option={stackedBar} style={{ height: 280 }} />
        </GlassCard>
        <GlassCard title="站点水质数据">
          <DataTable
            columns={[
              { key: "station", label: "站点" },
              { key: "ph", label: "pH" },
              { key: "do_val", label: "溶解氧" },
              { key: "turbidity", label: "浊度" },
              { key: "ammonia", label: "氨氮" },
              { key: "status", label: "状态", render: (v) => {
                const color = v === "超标" ? "text-ocean-danger" : v === "优秀" ? "text-ocean-success" : "text-ocean-cyan";
                return <span className={`font-medium ${color}`}>{String(v)}</span>;
              }},
            ]}
            data={tableData}
          />
        </GlassCard>
      </div>
    </OceanLayout>
  );
}
