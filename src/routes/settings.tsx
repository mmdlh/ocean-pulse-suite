import { createFileRoute } from "@tanstack/react-router";
import { OceanLayout } from "@/components/OceanLayout";
import { GlassCard } from "@/components/GlassCard";
import { Bell, Shield, Users, Globe, Clock, Database, Monitor, Mail } from "lucide-react";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
  head: () => ({ meta: [{ title: "系统设置 — 海洋环境监测平台" }] }),
});

function SettingItem({ icon: Icon, label, description, action }: { icon: typeof Bell; label: string; description: string; action: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-border/50 last:border-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-ocean-cyan" />
        </div>
        <div>
          <div className="text-sm font-medium text-foreground">{label}</div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
      </div>
      {action}
    </div>
  );
}

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  return (
    <label className="relative inline-flex cursor-pointer">
      <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
      <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-primary/60 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-foreground after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
    </label>
  );
}

function SettingsPage() {
  return (
    <OceanLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard title="通知设置">
          <SettingItem icon={Bell} label="预警通知" description="接收污染和设备异常预警推送" action={<Toggle defaultChecked />} />
          <SettingItem icon={Mail} label="邮件报告" description="每日自动发送监测摘要邮件" action={<Toggle />} />
          <SettingItem icon={Clock} label="定时任务" description="启用自动数据采集和分析" action={<Toggle defaultChecked />} />
        </GlassCard>

        <GlassCard title="安全设置">
          <SettingItem icon={Shield} label="双因素认证" description="增强账户安全性" action={<Toggle />} />
          <SettingItem icon={Users} label="用户管理" description="管理用户角色和权限" action={<button className="text-xs font-medium text-ocean-cyan hover:underline">管理</button>} />
          <SettingItem icon={Globe} label="API 访问" description="管理外部 API 密钥和权限" action={<button className="text-xs font-medium text-ocean-cyan hover:underline">配置</button>} />
        </GlassCard>

        <GlassCard title="数据设置">
          <SettingItem icon={Database} label="数据保留" description="设置历史数据保留时长" action={<span className="text-sm text-ocean-cyan font-medium">365 天</span>} />
          <SettingItem icon={Monitor} label="采样频率" description="监测数据采样间隔" action={<span className="text-sm text-ocean-cyan font-medium">5 分钟</span>} />
          <SettingItem icon={Clock} label="数据同步" description="各站点数据同步状态" action={<span className="text-xs font-medium text-ocean-success">正常</span>} />
        </GlassCard>

        <GlassCard title="系统信息">
          <div className="space-y-4">
            {[
              { label: "系统版本", value: "v3.2.1" },
              { label: "数据库状态", value: "运行正常", color: "text-ocean-success" },
              { label: "服务器负载", value: "32%", color: "text-ocean-cyan" },
              { label: "存储使用", value: "2.4 TB / 10 TB" },
              { label: "最后更新", value: "2026-04-13 14:30:00" },
              { label: "运行时间", value: "128 天 15 小时" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className={`text-sm font-medium ${item.color || "text-foreground"}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </OceanLayout>
  );
}
