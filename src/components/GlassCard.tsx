import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function GlassCard({ children, className = "", title, subtitle }: GlassCardProps) {
  return (
    <div className={`glass-card p-5 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="font-display text-sm font-semibold tracking-wider text-ocean-cyan uppercase">{title}</h3>}
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
