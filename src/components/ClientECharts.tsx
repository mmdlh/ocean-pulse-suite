import { lazy, Suspense } from "react";

const ReactEChartsCore = lazy(() =>
  import("echarts-for-react/lib/core").then((mod) => ({
    default: mod.default || mod,
  }))
);

type ClientEChartsProps = {
  echarts: any;
  option: any;
  style?: React.CSSProperties;
};

export function ClientECharts(props: ClientEChartsProps) {
  if (typeof window === "undefined") {
    return <div style={props.style} />;
  }
  return (
    <Suspense fallback={<div style={props.style} />}>
      <ReactEChartsCore {...props} />
    </Suspense>
  );
}
