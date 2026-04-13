import { useState, useEffect } from "react";

type ClientEChartsProps = {
  echarts: any;
  option: any;
  style?: React.CSSProperties;
};

export function ClientECharts(props: ClientEChartsProps) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    import("echarts-for-react/lib/core").then((mod) => {
      setComponent(() => mod.default || mod);
    });
  }, []);

  if (!Component) {
    return <div style={props.style} />;
  }

  return <Component {...props} />;
}
