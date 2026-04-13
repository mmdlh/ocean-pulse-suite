import { Link, useLocation } from "@tanstack/react-router";
import { Waves, Droplets, CloudSun, Fish, AlertTriangle, Cpu, BarChart3, Settings, Menu, X } from "lucide-react";
import { useState } from "react";

const leftItems = [
  { to: "/", label: "总览", icon: Waves },
  { to: "/water-quality", label: "水质监测", icon: Droplets },
  { to: "/weather", label: "气象数据", icon: CloudSun },
  { to: "/ecology", label: "海洋生态", icon: Fish },
] as const;

const rightItems = [
  { to: "/pollution", label: "污染预警", icon: AlertTriangle },
  { to: "/devices", label: "设备管理", icon: Cpu },
  { to: "/analysis", label: "数据分析", icon: BarChart3 },
  { to: "/settings", label: "系统设置", icon: Settings },
] as const;

const allItems = [...leftItems, ...rightItems];

function NavLink({ item, isActive }: { item: (typeof allItems)[number]; isActive: boolean }) {
  return (
    <Link
      to={item.to}
      className={`group relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
        isActive
          ? "text-ocean-cyan"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {/* Active background glow */}
      {isActive && (
        <span className="absolute inset-0 rounded-lg bg-primary/15 shadow-[0_0_16px_oklch(0.72_0.15_195/20%),inset_0_1px_0_oklch(0.78_0.15_195/20%)]" />
      )}
      {/* Hover background */}
      {!isActive && (
        <span className="absolute inset-0 rounded-lg bg-secondary/0 group-hover:bg-secondary/30 transition-colors duration-300" />
      )}
      <item.icon className={`relative w-4 h-4 transition-transform duration-300 ${isActive ? "drop-shadow-[0_0_6px_oklch(0.72_0.15_195/60%)]" : "group-hover:scale-110"}`} />
      <span className="relative">{item.label}</span>
      {/* Active bottom indicator */}
      {isActive && (
        <span className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full bg-ocean-cyan shadow-[0_0_8px_oklch(0.72_0.15_195/80%)]" />
      )}
    </Link>
  );
}

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50 h-14">
      <div className="h-full max-w-[1800px] mx-auto px-4 flex items-center">
        {/* Left nav items */}
        <div className="hidden lg:flex items-center gap-1 flex-1 justify-end pr-10">
          {leftItems.map((item) => (
            <NavLink key={item.to} item={item} isActive={location.pathname === item.to} />
          ))}
        </div>

        {/* Center title */}
        <div className="flex items-center gap-3 shrink-0 px-4">
          <div className="relative">
            <Waves className="w-8 h-8 text-ocean-cyan drop-shadow-[0_0_10px_oklch(0.72_0.15_195/50%)]" />
            <span className="absolute -inset-1.5 rounded-full bg-ocean-cyan/10 blur-md" />
          </div>
          <h1 className="font-display text-xl font-bold tracking-[0.18em] glow-text text-ocean-light hidden sm:block">
            海洋环境监测平台
          </h1>
          <h1 className="font-display text-base font-bold tracking-wider glow-text text-ocean-light sm:hidden">
            海洋监测
          </h1>
        </div>

        {/* Right nav items */}
        <div className="hidden lg:flex items-center gap-1 flex-1 justify-start pl-10">
          {rightItems.map((item) => (
            <NavLink key={item.to} item={item} isActive={location.pathname === item.to} />
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground p-2 ml-auto"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Active indicator line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-ocean-cyan/20 to-transparent" />

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden glass-nav border-t border-border/30 p-4 grid grid-cols-4 gap-2">
          {allItems.map((item) => {
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
