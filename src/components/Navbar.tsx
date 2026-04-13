import { Link, useLocation } from "@tanstack/react-router";
import { Waves, Droplets, CloudSun, Fish, AlertTriangle, Cpu, BarChart3, Settings, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", label: "总览", icon: Waves },
  { to: "/water-quality", label: "水质监测", icon: Droplets },
  { to: "/weather", label: "气象数据", icon: CloudSun },
  { to: "/ecology", label: "海洋生态", icon: Fish },
  { to: "/pollution", label: "污染预警", icon: AlertTriangle },
  { to: "/devices", label: "设备管理", icon: Cpu },
  { to: "/analysis", label: "数据分析", icon: BarChart3 },
  { to: "/settings", label: "系统设置", icon: Settings },
] as const;

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50 h-16">
      <div className="h-full max-w-[1800px] mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Waves className="w-7 h-7 text-ocean-cyan" />
          <h1 className="font-display text-lg font-bold tracking-wider glow-text text-ocean-light hidden sm:block">
            海洋环境监测平台
          </h1>
          <h1 className="font-display text-sm font-bold tracking-wider glow-text text-ocean-light sm:hidden">
            海洋监测
          </h1>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary/20 text-ocean-cyan shadow-[0_0_12px_oklch(0.72_0.15_195/20%)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden glass-nav border-t border-border p-4 grid grid-cols-4 gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs transition-all ${
                  isActive ? "bg-primary/20 text-ocean-cyan" : "text-muted-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
