import { createFileRoute } from "@tanstack/react-router";
import { OceanLayout } from "@/components/OceanLayout";
import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { StatusIndicator } from "@/components/StatusIndicator";
import { DataTable } from "@/components/DataTable";
import { Cpu, Radio, Battery, Wifi } from "lucide-react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { PieChart, LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { baseChartOption } from "@/lib/chart-theme";

echarts.use([PieChart, LineChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

export const Route = createFileRoute("/devices")({
  component: DevicesPage,
  head: () => ({ meta: [{ title: "设备管理 — 海洋环境监测平台" }] }),
});

function DevicesPage() {
  const statusPie = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: "item" },
    series: [{
      type: "pie", radius: ["50%", "78%"],
      itemStyle: { borderRadius: 8, borderColor: "rgba(15,23,42,0.8)", borderWidth: 3 },
      label: { show: false },
      emphasis: { label: { show: true, fontSize: 14, fontWeight: "bold", color: "#e2e8f0" } },
      data: [
        { value: 98, name: "在线", itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 1, colorStops: [{ offset: 0, color: "#22d3ee" }, { offset: 1, color: "#06b6d4" }] } } },
        { value: 15, name: "离线", itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 1, colorStops: [{ offset: 0, color: "#ef4444" }, { offset: 1, color: "#dc2626" }] } } },
        { value: 8, name: "维护中", itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 1, colorStops: [{ offset: 0, color: "#fbbf24" }, { offset: 1, color: "#f59e0b" }] } } },
        { value: 7, name: "告警", itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 1, colorStops: [{ offset: 0, color: "#a78bfa" }, { offset: 1, color: "#8b5cf6" }] } } },
      ],
    }],
    legend: { ...baseChartOption.legend, orient: "vertical", right: "5%", top: "center" },
  };

  const uptimeChart = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: "axis" },
    xAxis: { ...baseChartOption.xAxis, type: "category", data: ["1月", "2月", "3月", "4月", "5月", "6月"] },
    yAxis: { ...baseChartOption.yAxis, type: "value", name: "%", min: 90, max: 100 },
    series: [{
      type: "line", smooth: true, symbol: "circle", symbolSize: 8,
      data: [97.2, 98.1, 96.5, 99.0, 98.8, 99.2],
      lineStyle: { color: "#22d3ee", width: 3, shadowColor: "rgba(34,211,238,0.4)", shadowBlur: 10 },
      itemStyle: { color: "#22d3ee", borderColor: "#0e7490", borderWidth: 2 },
      areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(34,211,238,0.3)" }, { offset: 1, color: "rgba(34,211,238,0)" }] } },
    }],
  };

  type DeviceRow = { id: string; name: string; type: string; location: string; battery: string; signal: string; status: string };
  const tableData: DeviceRow[] = [
    { id: "FB-001", name: "浮标站 Alpha", type: "海洋浮标", location: "南海 18°N 110°E", battery: "92%", signal: "强", status: "在线" },
    { id: "FB-002", name: "浮标站 Beta", type: "海洋浮标", location: "东海 30°N 123°E", battery: "78%", signal: "中", status: "在线" },
    { id: "UW-003", name: "水下探测器 C", type: "AUV", location: "南海 20°N 115°E", battery: "15%", signal: "弱", status: "离线" },
    { id: "WS-004", name: "气象站 D", type: "气象站", location: "渤海 38°N 120°E", battery: "100%", signal: "强", status: "在线" },
    { id: "SN-005", name: "声纳阵列 E", type: "声纳", location: "东海 28°N 122°E", battery: "—", signal: "—", status: "维护" },
    { id: "ST-006", name: "卫星接收 F", type: "卫星站", location: "广州 23°N 113°E", battery: "100%", signal: "强", status: "在线" },
  ];

  return (
    <OceanLayout>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="总设备数" value="128" unit="台" icon={<Cpu className="w-5 h-5" />} />
        <StatCard label="在线率" value="98.4" unit="%" trend="up" trendValue="+0.8%" icon={<Radio className="w-5 h-5" />} color="success" />
        <StatCard label="低电量" value="5" unit="台" trend="down" trendValue="-2" icon={<Battery className="w-5 h-5" />} color="warning" />
        <StatCard label="信号异常" value="3" unit="台" icon={<Wifi className="w-5 h-5" />} color="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <GlassCard title="设备状态分布" className="lg:col-span-2">
          <ReactEChartsCore echarts={echarts} option={statusPie} style={{ height: 280 }} />
        </GlassCard>
        <GlassCard title="系统可用率趋势" className="lg:col-span-3">
          <ReactEChartsCore echarts={echarts} option={uptimeChart} style={{ height: 280 }} />
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <GlassCard title="设备列表" className="lg:col-span-2">
          <DataTable
            columns={[
              { key: "id", label: "编号" },
              { key: "name", label: "名称" },
              { key: "type", label: "类型" },
              { key: "battery", label: "电量" },
              { key: "status", label: "状态", render: (v) => {
                const c = v === "在线" ? "text-ocean-success" : v === "离线" ? "text-ocean-danger" : "text-ocean-warning";
                return <span className={`font-medium ${c}`}>{String(v)}</span>;
              }},
            ]}
            data={tableData}
          />
        </GlassCard>
        <GlassCard title="实时告警">
          <div className="space-y-1">
            <StatusIndicator status="offline" label="水下探测器 C" detail="电量不足 - 15%" />
            <StatusIndicator status="warning" label="浮标站 #012" detail="数据传输延迟" />
            <StatusIndicator status="maintenance" label="声纳阵列 E" detail="计划维护中" />
            <StatusIndicator status="warning" label="传感器 #045" detail="校准偏差 >5%" />
            <StatusIndicator status="online" label="气象站 D" detail="电源已恢复" />
          </div>
        </GlassCard>
      </div>
    </OceanLayout>
  );
}
