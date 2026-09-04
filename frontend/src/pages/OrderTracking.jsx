import { useState } from 'react';
import {
  MapPin,
  Truck,
  CheckCircle2,
  Factory,
  ShieldCheck,
  Navigation,
  PhoneCall,
  Clock,
  PackageCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderTracking() {
  const steps = [
    {
      title: "Harvest Aggregated at Farm Gate",
      desc: "Farm Origin: Ramesh Kumar (Kisan FPO, Punjab)",
      time: "06:30 AM",
      status: "completed",
      icon: Factory,
      details: "Quality Grade A+ verified via Direct Mandi inspection"
    },
    {
      title: "Cold-Chain Carrier Loaded",
      desc: "Truck #PB-10-CZ-4921 (AgriLogistics Carrier)",
      time: "08:15 AM",
      status: "completed",
      icon: Truck,
      details: "Temperature maintained at 8.4°C for maximum freshness"
    },
    {
      title: "Direct Multi-Drop Transit Active",
      desc: "Route: GT Road Bypass (Estimated Arrival in 28 mins)",
      time: "Live Transit",
      status: "current",
      icon: Navigation,
      highlight: true,
      details: "Optimized direct path bypassing urban mandi congestion"
    },
    {
      title: "Destination Hub Delivery",
      desc: "Direct Customer Hub, Sector 62, Noida",
      time: "Est. 11:45 AM",
      status: "upcoming",
      icon: CheckCircle2,
      details: "Contactless handover with OTP verification"
    }
  ];

  return (
    <div className="py-2 max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E5DCCF] shadow-xs">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2D5A38] mb-1">
            <Truck className="w-4 h-4" />
            <span>LIVE CONSIGNMENT DISPATCH TRACKER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#232921] font-heading">
            Live Order & Logistics Status
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F0E9] text-[#2D5A38] border border-[#C2D6C6]">
            <span className="w-2 h-2 rounded-full bg-[#2D5A38] animate-pulse" />
            GPS Satellite Linked
          </span>
        </div>
      </div>

      {/* Main Order Container */}
      <div className="bg-white rounded-2xl border border-[#E5DCCF] shadow-xs p-6 sm:p-8">
        {/* Order Details Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 mb-6 border-b border-[#E5DCCF]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl font-bold font-mono text-[#232921]">#AC-88392</span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#E8F0E9] text-[#2D5A38] border border-[#C2D6C6]">
                Direct Producer Lot
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7264]">
              Organic Vine Tomatoes • <strong className="text-[#232921]">50 kg lot</strong>
            </p>
          </div>

          <div className="flex items-center gap-6 sm:text-right">
            <div>
              <div className="text-[10px] uppercase font-semibold text-[#8E9687]">Direct Total</div>
              <div className="text-2xl font-bold font-mono text-[#2D5A38]">₹1,750</div>
            </div>
            <div className="h-8 w-px bg-[#E5DCCF] hidden sm:block" />
            <div className="text-left sm:text-right">
              <div className="text-[10px] uppercase font-semibold text-[#8E9687]">Payment Mode</div>
              <div className="text-xs font-semibold text-[#232921]">Direct UPI Escrow</div>
            </div>
          </div>
        </div>

        {/* Live Driver & Transit Box */}
        <div className="mb-8 p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DCCF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E8F0E9] text-[#2D5A38] flex items-center justify-center shrink-0">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#232921] flex items-center gap-2">
                DISPATCH ON SCHEDULE
                <span className="text-[11px] font-semibold text-[#2D5A38]">(ETA: 28 mins)</span>
              </div>
              <div className="text-xs text-[#6B7264] mt-0.5">
                Driver <strong className="text-[#232921]">Harpreet S.</strong> is currently navigating Karnal Bypass on GT Road.
              </div>
            </div>
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E5DCCF] hover:border-[#2D5A38] text-xs font-semibold text-[#232921] transition-colors cursor-pointer shadow-xs">
            <PhoneCall className="w-3.5 h-3.5 text-[#2D5A38]" />
            <span>Call Driver</span>
          </button>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#E5DCCF] space-y-7 py-1 ml-3 sm:ml-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isDone = step.status === 'completed';
            const isCurrent = step.status === 'current';

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.06 }}
                className="relative group"
              >
                {/* Timeline node */}
                <div
                  className={`absolute -left-[33px] sm:-left-[41px] top-0 p-1.5 rounded-full border transition-colors ${
                    isDone
                      ? 'bg-[#2D5A38] border-[#2D5A38] text-white'
                      : isCurrent
                      ? 'bg-white border-[#2D5A38] text-[#2D5A38] ring-4 ring-[#E8F0E9]'
                      : 'bg-white border-[#E5DCCF] text-[#8E9687]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {/* Step info */}
                <div className="space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className={`font-bold text-sm font-heading ${
                      isCurrent ? 'text-[#2D5A38]' : isDone ? 'text-[#232921]' : 'text-[#8E9687]'
                    }`}>
                      {step.title}
                    </h3>
                    <span className="text-[11px] text-[#8E9687]">[{step.time}]</span>
                    {step.highlight && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E8F0E9] text-[#2D5A38] border border-[#C2D6C6]">
                        Direct Express
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#232921] font-medium">{step.desc}</p>
                  <p className="text-[11px] text-[#6B7264]">{step.details}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
