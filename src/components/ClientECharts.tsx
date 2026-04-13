import { useState, useEffect, useRef } from "react";

type ClientEChartsProps = {
  echarts: any;
  option: any;
  style?: React.CSSProperties;
};

export function ClientECharts({ echarts, option, style }: ClientEChartsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let EChartsComponent: any;
    import("echarts-for-react/lib/core").then((mod) => {
      EChartsComponent = mod.default || mod;
      // Force re-render by updating state isn't ideal, so we use direct DOM
      // Instead, let's use echarts directly
      if (!containerRef.current) return;
      const chart = echarts.init(containerRef.current);
      chart.setOption(option);
      chartRef.current = chart;

      const resizeObserver = new ResizeObserver(() => {
        chart.resize();
      });
      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
        chart.dispose();
      };
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.dispose();
        chartRef.current = null;
      }
    };
  }, [mounted, echarts, option]);

  return <div ref={containerRef} style={style} />;
}
