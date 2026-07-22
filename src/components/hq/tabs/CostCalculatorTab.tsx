'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Save, ChevronDown, Calculator, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

// ─── Default Rates ────────────────────────────────────────────────────────────

const FILAMENT_PRESETS = [
  { label: 'PLA+',          pricePerKg: 1000, color: '#f59e0b' },
  { label: 'PETG',          pricePerKg: 1000, color: '#3b82f6' },
  { label: 'ABS',           pricePerKg: 900,  color: '#8b5cf6' },
  { label: 'Marble Blend',  pricePerKg: 1500, color: '#94a3b8' },
  { label: 'Wood Fill',     pricePerKg: 1600, color: '#92400e' },
  { label: 'Silk / Shiny',  pricePerKg: 1400, color: '#ec4899' },
  { label: 'Custom',        pricePerKg: 0,    color: '#6b7280' },
];

const DEFAULTS = {
  filamentType: 0,       // index into FILAMENT_PRESETS
  customFilamentPrice: 1000,
  filamentGrams: 80,
  cementKg: 0,
  cementCostPerKg: 80,
  printHours: 4,
  electricityRate: 8,
  finishingHours: 1,
  labourRate: 150,
  packagingCost: 60,
  shippingEstimate: 80,
  targetMargin: 40,
  volume: 1,
};

// ─── Calculation Engine ───────────────────────────────────────────────────────

function calculate(inputs: typeof DEFAULTS) {
  const filamentPreset = FILAMENT_PRESETS[inputs.filamentType];
  const pricePerKg = filamentPreset.label === 'Custom'
    ? inputs.customFilamentPrice
    : filamentPreset.pricePerKg;

  const filamentCost   = (inputs.filamentGrams / 1000) * pricePerKg;
  const cementCost     = inputs.cementKg * inputs.cementCostPerKg;
  const electricityCost = inputs.printHours * inputs.electricityRate;
  const labourCost     = inputs.finishingHours * inputs.labourRate;
  const materialCost   = filamentCost + cementCost + inputs.packagingCost;
  const totalCost      = materialCost + electricityCost + labourCost + inputs.shippingEstimate;
  const breakEven      = Math.ceil(totalCost);
  const suggestedPrice = Math.ceil(totalCost / (1 - inputs.targetMargin / 100));
  const profitPerUnit  = suggestedPrice - totalCost;
  const totalProfit    = profitPerUnit * inputs.volume;
  const actualMargin   = totalCost > 0 ? ((suggestedPrice - totalCost) / suggestedPrice) * 100 : 0;

  return {
    filamentCost, cementCost, electricityCost, labourCost,
    materialCost, totalCost, breakEven, suggestedPrice,
    profitPerUnit, totalProfit, actualMargin,
    pricePerKg,
    breakdown: [
      { label: 'Filament',    value: filamentCost,          color: '#f59e0b' },
      { label: 'Cement',      value: cementCost,            color: '#94a3b8' },
      { label: 'Electricity', value: electricityCost,       color: '#3b82f6' },
      { label: 'Labour',      value: labourCost,            color: '#8b5cf6' },
      { label: 'Packaging',   value: inputs.packagingCost,  color: '#10b981' },
      { label: 'Shipping',    value: inputs.shippingEstimate, color: '#f43f5e' },
    ].filter(b => b.value > 0),
  };
}

// ─── Donut Chart ──────────────────────────────────────────────────────────────

function DonutChart({ data, total }: { data: { label: string; value: number; color: string }[]; total: number }) {
  const size = 160;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;
  const segments = data.map(d => {
    const fraction = total > 0 ? d.value / total : 0;
    const dashArray = fraction * circumference;
    const dashOffset = circumference - cumulative * circumference;
    cumulative += fraction;
    return { ...d, dashArray, dashOffset };
  });

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="#f4f1ea" strokeWidth={strokeWidth}
      />
      {segments.map((seg, i) => (
        <motion.circle
          key={i}
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={seg.color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${seg.dashArray} ${circumference}`}
          strokeDashoffset={seg.dashOffset}
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
        />
      ))}
    </svg>
  );
}

// ─── Margin Gauge ─────────────────────────────────────────────────────────────

function MarginGauge({ margin }: { margin: number }) {
  const clamp = Math.min(Math.max(margin, 0), 100);
  const color = clamp < 20 ? '#ef4444' : clamp < 35 ? '#f59e0b' : '#22c55e';
  const label = clamp < 20 ? 'Thin' : clamp < 35 ? 'Okay' : 'Healthy';

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-ink/50 mb-1">
        <span>0%</span>
        <span className="font-bold" style={{ color }}>{clamp.toFixed(1)}% — {label}</span>
        <span>100%</span>
      </div>
      <div className="h-3 w-full rounded-full bg-[#f4f1ea] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${clamp}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        />
      </div>
    </div>
  );
}

// ─── Animated Number ──────────────────────────────────────────────────────────

function AnimNum({ value, prefix = '₹' }: { value: number; prefix?: string }) {
  return (
    <motion.span
      key={Math.round(value)}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {prefix}{Math.round(value).toLocaleString('en-IN')}
    </motion.span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CostCalculatorTab() {
  const [inputs, setInputs] = useState(DEFAULTS);
  const [presetName, setPresetName] = useState('');
  const [savedPresets, setSavedPresets] = useState<any[]>([]);
  const [savingPreset, setSavingPreset] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  const result = useMemo(() => calculate(inputs), [inputs]);

  useEffect(() => {
    fetchPresets();
  }, []);

  async function fetchPresets() {
    try {
      const res = await fetch('/api/admin/cost-presets');
      if (res.ok) {
        const data = await res.json();
        setSavedPresets(data.presets || []);
      }
    } catch {}
  }

  async function savePreset() {
    if (!presetName.trim()) return;
    setSavingPreset(true);
    try {
      const res = await fetch('/api/admin/cost-presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: presetName, ...inputs, ...result }),
      });
      if (res.ok) {
        setPresetName('');
        fetchPresets();
      }
    } catch {}
    setSavingPreset(false);
  }

  async function deletePreset(id: string) {
    await fetch(`/api/admin/cost-presets?id=${id}`, { method: 'DELETE' });
    setSavedPresets(p => p.filter(x => x.id !== id));
  }

  function loadPreset(preset: any) {
    setInputs({
      filamentType: preset.filamentType ?? 0,
      customFilamentPrice: preset.customFilamentPrice ?? 1000,
      filamentGrams: preset.filamentGrams ?? 80,
      cementKg: preset.cementKg ?? 0,
      cementCostPerKg: preset.cementCostPerKg ?? 80,
      printHours: preset.printHours ?? 4,
      electricityRate: preset.electricityRate ?? 8,
      finishingHours: preset.finishingHours ?? 1,
      labourRate: preset.labourRate ?? 150,
      packagingCost: preset.packagingCost ?? 60,
      shippingEstimate: preset.shippingEstimate ?? 80,
      targetMargin: preset.targetMargin ?? 40,
      volume: preset.volume ?? 1,
    });
    setShowPresets(false);
  }

  const set = (key: keyof typeof DEFAULTS) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.type === 'range' || e.target.tagName === 'SELECT'
      ? Number(e.target.value)
      : e.target.value === '' ? 0 : Number(e.target.value);
    setInputs(prev => ({ ...prev, [key]: val }));
  };

  const marginStatus = result.actualMargin < 20 ? 'danger' : result.actualMargin < 35 ? 'warn' : 'good';

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-3xl font-bold flex items-center gap-2">
            <Calculator className="w-6 h-6" /> Cost Calculator
          </h2>
          <p className="mt-2 text-sm text-ink/60">Calculate exact production cost, break-even, and margin for any build.</p>
        </div>
        <button
          onClick={() => setShowPresets(v => !v)}
          className="flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-ink/5 transition"
        >
          <TrendingUp className="w-3.5 h-3.5" /> Saved Presets ({savedPresets.length})
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showPresets ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Saved Presets Panel */}
      <AnimatePresence>
        {showPresets && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="rounded-[2rem] border border-ink/15 bg-paper p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-ink/50 mb-4">Saved Product Presets</p>
              {savedPresets.length === 0 ? (
                <p className="text-sm text-ink/40 py-4 text-center">No presets saved yet.</p>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {savedPresets.map(p => {
                    const margin = p.actualMargin ?? 0;
                    const flagColor = margin < 20 ? 'border-red-200 bg-red-50' : margin < 35 ? 'border-amber-200 bg-amber-50' : 'border-lime-200 bg-lime-50';
                    return (
                      <div key={p.id} className={`rounded-2xl border p-4 ${flagColor}`}>
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-bold text-sm">{p.name}</p>
                          <button onClick={() => deletePreset(p.id)} className="text-ink/30 hover:text-red-500 transition">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-xs text-ink/60 space-y-0.5">
                          <p>Cost to make: <span className="font-bold text-ink">₹{Math.round(p.totalCost)}</span></p>
                          <p>Suggested price: <span className="font-bold text-ink">₹{Math.round(p.suggestedPrice)}</span></p>
                          <p>Margin: <span className="font-bold" style={{ color: margin < 20 ? '#ef4444' : margin < 35 ? '#f59e0b' : '#22c55e' }}>{margin.toFixed(1)}%</span></p>
                        </div>
                        <button
                          onClick={() => loadPreset(p)}
                          className="mt-3 w-full rounded-xl bg-ink/10 py-1.5 text-xs font-bold hover:bg-ink/20 transition"
                        >
                          Load Preset
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        {/* ── Left: Inputs ── */}
        <div className="space-y-5">

          {/* Filament */}
          <Section title="🖨️ Filament">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Type</label>
                <select value={inputs.filamentType} onChange={set('filamentType')} className="input-field">
                  {FILAMENT_PRESETS.map((f, i) => (
                    <option key={i} value={i}>{f.label} — ₹{f.pricePerKg}/kg</option>
                  ))}
                </select>
              </div>
              {FILAMENT_PRESETS[inputs.filamentType].label === 'Custom' && (
                <NumberInput label="Custom price (₹/kg)" value={inputs.customFilamentPrice} onChange={set('customFilamentPrice')} />
              )}
              <NumberInput label="Filament used (grams)" value={inputs.filamentGrams} onChange={set('filamentGrams')} />
              <NumberInput label="Print time (hours)" value={inputs.printHours} onChange={set('printHours')} step={0.5} />
            </div>
            <div className="mt-3 rounded-xl bg-amber-50 border border-amber-100 px-4 py-2 text-xs text-amber-700 font-mono">
              Filament cost: ₹{result.filamentCost.toFixed(2)} &nbsp;·&nbsp; Electricity: ₹{result.electricityCost.toFixed(2)}
            </div>
          </Section>

          {/* Cement */}
          <Section title="🪨 Cement (optional)">
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput label="Cement used (kg)" value={inputs.cementKg} onChange={set('cementKg')} step={0.1} />
              <NumberInput label="Cement price (₹/kg)" value={inputs.cementCostPerKg} onChange={set('cementCostPerKg')} />
            </div>
          </Section>

          {/* Labour & Overhead */}
          <Section title="🛠️ Labour & Overhead">
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberInput label="Finishing time (hours)" value={inputs.finishingHours} onChange={set('finishingHours')} step={0.5} />
              <NumberInput label="Your labour rate (₹/hr)" value={inputs.labourRate} onChange={set('labourRate')} />
              <NumberInput label="Packaging (₹)" value={inputs.packagingCost} onChange={set('packagingCost')} />
              <NumberInput label="Shipping estimate (₹)" value={inputs.shippingEstimate} onChange={set('shippingEstimate')} />
              <NumberInput label="Electricity rate (₹/hr)" value={inputs.electricityRate} onChange={set('electricityRate')} />
            </div>
          </Section>

          {/* Margin + Volume */}
          <Section title="📈 Margin & Volume">
            <div>
              <div className="flex justify-between text-sm mb-3">
                <span className="font-medium">Target Margin</span>
                <span className="font-bold font-mono">{inputs.targetMargin}%</span>
              </div>
              <input
                type="range" min="0" max="80" step="1"
                value={inputs.targetMargin}
                onChange={set('targetMargin')}
                className="w-full accent-ink"
              />
              <div className="flex justify-between text-xs text-ink/40 mt-1">
                <span>0%</span><span>40%</span><span>80%</span>
              </div>
            </div>
            <div className="mt-4">
              <NumberInput label="Units to sell (volume)" value={inputs.volume} onChange={set('volume')} />
            </div>
          </Section>

          {/* Save Preset */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Name this preset (e.g. Halo Lamp)"
              value={presetName}
              onChange={e => setPresetName(e.target.value)}
              className="flex-1 rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-accent"
            />
            <button
              onClick={savePreset}
              disabled={!presetName.trim() || savingPreset}
              className="flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-paper hover:bg-accent transition disabled:opacity-40"
            >
              <Save className="w-3.5 h-3.5" /> {savingPreset ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* ── Right: Results ── */}
        <div className="space-y-4">

          {/* Main result card */}
          <div className={`rounded-[2rem] border-2 p-6 ${marginStatus === 'danger' ? 'border-red-200 bg-red-50' : marginStatus === 'warn' ? 'border-amber-200 bg-amber-50' : 'border-lime-200 bg-lime-50'}`}>
            <div className="flex items-center gap-2 mb-4">
              {marginStatus === 'good'
                ? <CheckCircle className="w-4 h-4 text-lime-600" />
                : <AlertTriangle className={`w-4 h-4 ${marginStatus === 'danger' ? 'text-red-500' : 'text-amber-500'}`} />
              }
              <p className="text-xs font-bold uppercase tracking-widest text-ink/60">
                {marginStatus === 'good' ? 'Healthy Margin' : marginStatus === 'warn' ? 'Thin Margin — Review Pricing' : 'Below Recommended Margin'}
              </p>
            </div>

            <div className="space-y-3">
              <ResultRow label="Cost to make" value={<AnimNum value={result.totalCost} />} sub />
              <ResultRow label="Break-even price" value={<AnimNum value={result.breakEven} />} sub />
              <div className="border-t border-ink/10 pt-3">
                <ResultRow
                  label="Suggested price"
                  value={<AnimNum value={result.suggestedPrice} />}
                  large
                />
              </div>
              <ResultRow label="Profit per unit" value={<AnimNum value={result.profitPerUnit} />} />
              {inputs.volume > 1 && (
                <ResultRow label={`Profit × ${inputs.volume} units`} value={<AnimNum value={result.totalProfit} />} />
              )}
            </div>

            <div className="mt-4">
              <MarginGauge margin={result.actualMargin} />
            </div>
          </div>

          {/* Cost breakdown donut */}
          <div className="rounded-[2rem] border border-ink/15 bg-paper p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-ink/50 mb-4">Cost Breakdown</p>
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <DonutChart data={result.breakdown} total={result.totalCost} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs text-ink/50">Total</span>
                  <span className="font-display font-bold text-sm">₹{Math.round(result.totalCost)}</span>
                </div>
              </div>
              <div className="space-y-2 flex-1">
                {result.breakdown.map(b => (
                  <div key={b.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                      <span className="text-xs text-ink/70">{b.label}</span>
                    </div>
                    <span className="text-xs font-mono font-bold">₹{Math.round(b.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick reference */}
          <div className="rounded-[2rem] border border-ink/15 bg-[#f6f3ee] p-5 space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-3">Quick Reference</p>
            {[
              { label: 'Filament rate', value: `₹${result.pricePerKg}/kg` },
              { label: 'Your hourly rate', value: `₹${inputs.labourRate}/hr` },
              { label: 'Electricity', value: `₹${inputs.electricityRate}/hr` },
            ].map(r => (
              <div key={r.label} className="flex justify-between text-xs">
                <span className="text-ink/60">{r.label}</span>
                <span className="font-mono font-bold">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-ink/15 bg-paper p-6 space-y-4">
      <p className="text-sm font-bold text-ink/70">{title}</p>
      {children}
    </div>
  );
}

function NumberInput({ label, value, onChange, step = 1 }: {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1.5">{label}</label>
      <input
        type="number"
        min="0"
        step={step}
        value={value === 0 ? '' : value}
        onChange={onChange}
        placeholder="0"
        className="w-full rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-sm font-mono outline-none focus:ring-1 focus:ring-accent transition"
      />
    </div>
  );
}

function ResultRow({ label, value, sub = false, large = false }: {
  label: string;
  value: React.ReactNode;
  sub?: boolean;
  large?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <span className={`${sub ? 'text-xs text-ink/55' : 'text-sm text-ink/70'}`}>{label}</span>
      <span className={`font-mono font-bold ${large ? 'text-2xl text-ink' : sub ? 'text-sm text-ink/70' : 'text-base text-ink'}`}>
        {value}
      </span>
    </div>
  );
}
