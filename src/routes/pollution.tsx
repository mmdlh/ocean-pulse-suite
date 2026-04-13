import { createFileRoute } from "@tanstack/react-router";
import { OceanLayout } from "@/components/OceanLayout";
import { GlassCard } from "@/components/GlassCard";
import { StatCard } from "@/components/StatCard";
import { StatusIndicator } from "@/components/StatusIndicator";
import { AlertTriangle, ShieldAlert, Siren, MapPin } from "lucide-react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { LineChart, BarChart, PieChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { baseChartOption } from "@/lib/chart-theme";

echarts.use([LineChart, BarChart, PieChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

export const Route = createFileRoute("/pollution")({
  component: PollutionPage,
  head: () => ({ meta: [{ title: "污染预警 — 海洋环境监测平台" }] }),
});

function PollutionPage() {
  const alertTrend = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: "axis" },
    legend: { ...baseChartOption.legend, data: ["红色预警", "橙色预警", "黄色预警"] },
    xAxis: { ...baseChartOption.xAxis, type: "category", data: ["1月", "2月", "3月", "4月", "5月", "6月"] },
    yAxis: { ...baseChartOption.yAxis, type: "value" },
    series: [
      { name: "红色预警", type: "line", data: [2, 1, 3, 0, 2, 1], lineStyle: { color: "#ef4444", width: 3 }, itemStyle: { color: "#ef4444" }, areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(239,68,68,0.2)" }, { offset: 1, color: "rgba(239,68,68,0)" }] } } },
      { name: "橙色预警", type: "line", data: [5, 3, 6, 4, 7, 3], lineStyle: { color: "#f59e0b", width: 3 }, itemStyle: { color: "#f59e0b" }, areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(245,158,11,0.2)" }, { offset: 1, color: "rgba(245,158,11,0)" }] } } },
      { name: "黄色预警", type: "line", data: [12, 8, 15, 10, 13, 9], lineStyle: { color: "#fbbf24", width: 3 }, itemStyle: { color: "#fbbf24" }, areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(251,191,36,0.15)" }, { offset: 1, color: "rgba(251,191,36,0)" }] } } },
    ],
  };

  const pollutionTypePie = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: "item" },
    series: [{
      type: "pie", radius: ["45%", "75%"],
      itemStyle: { borderRadius: 6, borderColor: "rgba(15,23,42,0.8)", borderWidth: 2 },
      label: { color: "#94a3b8" },
      data: [
        { value: 35, name: "石油泄漏", itemStyle: { color: "#ef4444" } },
        { value: 25, name: "重金属", itemStyle: { color: "#f59e0b" } },
        { value: 20, name: "有机污染", itemStyle: { color: "#a78bfa" } },
        { value: 12, name: "塑料垃圾", itemStyle: { color: "#22d3ee" } },
        { value: 8, name: "热污染", itemStyle: { color: "#f472b6" } },
      ],
    }],
  };

  const regionBar = {
    ...baseChartOption,
    tooltip: { ...baseChartOption.tooltip, trigger: "axis" },
    xAxis: { ...baseChartOption.xAxis, type: "value" },
    yAxis: { ...baseChartOption.yAxis, type: "category", data: ["渤海", "黄海", "东海", "南海", "台湾海峡"] },
    series: [{
      type: "bar", barWidth: "55%",
      data: [
        { value: 28, itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: "#ef4444" }, { offset: 1, color: "#f97316" }] }, borderRadius: [0, 6, 6, 0] } },
        { value: 15, itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: "#fbbf24" }, { offset: 1, color: "#f59e0b" }] }, borderRadius: [0, 6, 6, 0] } },
        { value: 22, itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: "#a78bfa" }, { offset: 1, color: "#8b5cf6" }] }, borderRadius: [0, 6, 6, 0] } },
        { value: 18, itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: "#22d3ee" }, { offset: 1, color: "#06b6d4" }] }, borderRadius: [0, 6, 6, 0] } },
        { value: 10, itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: "#2dd4bf" }, { offset: 1, color: "#14b8a6" }] }, borderRadius: [0, 6, 6, 0] } },
      ],
    }],
  };

  return (
    <OceanLayout>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="活跃预警" value="7" unit="条" trend="down" trendValue="-3" icon={<AlertTriangle className="w-5 h-5" />} color="danger" />
        <StatCard label="红色预警" value="1" unit="条" icon={<Siren className="w-5 h-5" />} color="danger" />
        <StatCard label="污染源" value="23" unit="处" trend="down" trendValue="-5" icon={<ShieldAlert className="w-5 h-5" />} color="warning" />
        <StatCard label="监测区域" value="45" unit="个" icon={<MapPin className="w-5 h-5" />} color="cyan" />
      </div>

      <GlassCard title="预警趋势" className="mb-6">
        <ReactEChartsCore echarts={echarts} option={alertTrend} style={{ height: 320 }} />
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <GlassCard title="污染类型分布">
          <ReactEChartsCore echarts={echarts} option={pollutionTypePie} style={{ height: 280 }} />
        </GlassCard>
        <GlassCard title="各海域预警数量">
          <ReactEChartsCore echarts={echarts} option={regionBar} style={{ height: 280 }} />
        </GlassCard>
        <GlassCard title="最新预警动态">
          <div className="space-y-1">
            <StatusIndicator status="offline" label="渤海湾石油泄漏" detail="红色预警 - 10分钟前" />
            <StatusIndicator status="warning" label="东海重金属超标" detail="橙色预警 - 1小时前" />
            <StatusIndicator status="warning" label="南海氨氮异常" detail="橙色预警 - 2小时前" />
            <StatusIndicator status="warning" label="黄海浊度升高" detail="黄色预警 - 3小时前" />
            <StatusIndicator status="online" label="台湾海峡恢复正常" detail="已解除 - 5小时前" />
            <StatusIndicator status="warning" label="渤海COD超标" detail="橙色预警 - 6小时前" />
          </div>
        </GlassCard>
      </div>
    </OceanLayout>
  );
}
