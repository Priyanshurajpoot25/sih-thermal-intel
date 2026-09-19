/**
 * pages/Landing.jsx
 *
 * Cinematic Landing & Overview Page for FireSense (SIH26162).
 * Highlights:
 * - Spaceborne Thermal Radiative Power Pipeline
 * - 6-Module Operational Breakdown
 * - Direct portal entrance & Citizen advisory shortcuts
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, DemoDataBadge } from '../components/common'

export function Landing() {
  return (
    <div className="min-h-screen bg-surface-bg text-gray-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      <DemoDataBadge position="top-right" />

      {/* Hero Navigation */}
      <nav className="h-16 border-b border-surface-border px-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
            <Icon name="fire" size={20} />
          </div>
          <span className="font-mono font-bold tracking-wider text-base text-white">
            FIRESENSE <span className="text-xs text-orange-400 font-normal">SIH26162</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/advisory"
            className="text-xs font-mono text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Icon name="shield" size={14} className="text-emerald-400" />
            <span>Public Advisory</span>
          </Link>
          <Link
            to="/login"
            className="text-xs font-mono font-semibold bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-orange-600/20"
          >
            Tactical Access →
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-20 flex flex-col items-center text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          <span>Spaceborne Thermal Intelligence & Autonomous Disaster Response</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight">
          From Satellite Signal to Autonomous <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-red-500">Emergency Dispatch</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
          Correlating NASA FIRMS VIIRS 375m thermal infrared detections with OpenStreetMap facility boundaries,
          ESA WorldCover land-cover matrices, and 60-day persistence baselines to protect lives and critical infrastructure.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/login"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-mono text-xs font-bold transition-all shadow-xl shadow-orange-600/25 flex items-center gap-2"
          >
            <span>ENTER TACTICAL COMMAND CONSOLE</span>
            <Icon name="chevron-right" size={16} />
          </Link>
          <Link
            to="/advisory"
            className="px-6 py-3.5 rounded-xl bg-surface-panel hover:bg-surface-elevated border border-surface-border text-gray-200 font-mono text-xs font-semibold transition-all flex items-center gap-2"
          >
            <Icon name="shield" size={16} className="text-emerald-400" />
            <span>CITIZEN SAFETY BULLETINS</span>
          </Link>
        </div>

        {/* 3 Portal Architecture Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left w-full pt-12">
          <div className="bg-surface-panel border border-surface-border rounded-2xl p-6 space-y-3 hover:border-gray-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
              <Icon name="satellite" size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">NTRO Spaceborne Console</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Analyst telemetry workspace with FRP charts, AI classification explainability evidence, and clandestine hotspot detection.
            </p>
          </div>

          <div className="bg-surface-panel border border-surface-border rounded-2xl p-6 space-y-3 hover:border-gray-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Icon name="building" size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Government Authority</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              State EOC coordination hub with assets-at-risk exposure modeling, evacuation corridor calculations, and automated CAP dispatch.
            </p>
          </div>

          <div className="bg-surface-panel border border-surface-border rounded-2xl p-6 space-y-3 hover:border-gray-700 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Icon name="dispatch" size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Field Responder Terminal</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Tactical mobile unit for ground-truth verification, rapid response workflow stepping, and containment logging.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-border py-6 px-6 text-center text-xs font-mono text-gray-500">
        Smart India Hackathon 2026 • Problem Statement SIH26162 (NTRO) • Team FireSense
      </footer>
    </div>
  )
}
