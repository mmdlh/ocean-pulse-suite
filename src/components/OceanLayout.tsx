import { type ReactNode } from "react";
import { Navbar } from "./Navbar";
import oceanBg from "@/assets/ocean-bg.jpg";

export function OceanLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${oceanBg})` }}
      />
      <div className="fixed inset-0 bg-background/70" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main className="pt-20 pb-8 px-4 max-w-[1800px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
