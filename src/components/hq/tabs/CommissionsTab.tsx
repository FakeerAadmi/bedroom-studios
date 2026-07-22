'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, ChevronDown, ChevronUp, X, ExternalLink } from 'lucide-react';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  new:           { label: 'New',          color: 'text-blue-700',   bg: 'bg-blue-100' },
  in_discussion: { label: 'In Discussion', color: 'text-amber-700',  bg: 'bg-amber-100' },
  quoted:        { label: 'Quoted',        color: 'text-purple-700', bg: 'bg-purple-100' },
  accepted:      { label: 'Accepted',      color: 'text-lime-700',   bg: 'bg-lime-100' },
  declined:      { label: 'Declined',      color: 'text-red-700',    bg: 'bg-red-100' },
};

export default function CommissionsTab() {
  const [commissions, setCommissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editing, setEditing] = useState<Record<string, any>>({});

  useEffect(() => {
    fetchCommissions();
  }, []);

  async function fetchCommissions() {
    setLoading(true);
    try {
      const res = await fetch('/api/commission');
      if (res.ok) {
        const data = await res.json();
        setCommissions(data.commissions || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function updateCommission(id: string, status: string, adminNotes: string) {
    try {
      await fetch('/api/admin/commissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, adminNotes }),
      });
      setCommissions(prev =>
        prev.map(c => (c.id === id ? { ...c, status, adminNotes } : c))
      );
    } catch (e) {
      console.error(e);
    }
  }

  const counts = {
    total: commissions.length,
    new: commissions.filter(c => c.status === 'new').length,
    inDiscussion: commissions.filter(c => c.status === 'in_discussion').length,
    accepted: commissions.filter(c => c.status === 'accepted').length,
    declined: commissions.filter(c => c.status === 'declined').length,
  };

  const waLink = (c: any) => {
    if (!c.phone) return null;
    const msg = encodeURIComponent(
      `Hi ${c.name}! 👋\n\nThanks for reaching out to Bedroom Studios about your commission brief.\n\nWe've reviewed your request (Theme: ${c.fandom}, Budget: ${c.budget}) and would love to discuss further.\n\nLet us know when you're free to chat!\n\n— Bedroom Studios`
    );
    return `https://wa.me/91${c.phone}?text=${msg}`;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-3xl font-bold">Commission Requests</h2>
          <p className="mt-2 text-sm text-ink/60">Briefs submitted via the commissions page.</p>
        </div>
        <button
          onClick={fetchCommissions}
          className="rounded-full border border-ink/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-ink/60 hover:bg-ink/5 transition"
        >
          Refresh
        </button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total', value: counts.total, color: 'bg-paper' },
          { label: 'New', value: counts.new, color: 'bg-blue-50' },
          { label: 'In Discussion', value: counts.inDiscussion, color: 'bg-amber-50' },
          { label: 'Accepted', value: counts.accepted, color: 'bg-lime-50' },
        ].map(kpi => (
          <div key={kpi.label} className={`rounded-[1.8rem] border border-ink/10 ${kpi.color} p-5`}>
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">{kpi.label}</p>
            <p className="mt-2 text-3xl font-display font-bold">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Commission cards */}
      {loading ? (
        <div className="py-20 text-center font-mono text-sm text-ink/40 animate-pulse">Loading commissions...</div>
      ) : commissions.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-ink/20 rounded-3xl text-ink/50">
          <MessageSquare className="mx-auto mb-4 w-8 h-8 opacity-30" />
          <p className="font-bold">No commission briefs yet.</p>
          <p className="mt-2 text-sm">Submissions from /commissions will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {commissions.map(c => {
            const isOpen = expanded === c.id;
            const cfg = STATUS_CONFIG[c.status] ?? STATUS_CONFIG.new;
            const localEdit = editing[c.id] ?? { status: c.status, adminNotes: c.adminNotes || '' };

            return (
              <motion.div
                key={c.id}
                layout
                className="rounded-[2rem] border border-ink/15 bg-paper shadow-sm overflow-hidden"
              >
                {/* Header row */}
                <div
                  className="flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-ink/[0.02] transition"
                  onClick={() => setExpanded(isOpen ? null : c.id)}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center font-bold text-ink shrink-0">
                      {c.name?.charAt(0)?.toUpperCase() ?? '?'}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold truncate">{c.name}</p>
                      <p className="text-xs text-ink/50 font-mono truncate">{c.email}</p>
                    </div>
                    <span className="hidden sm:block text-sm text-ink/60 truncate max-w-[200px]">{c.fandom || '—'}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${cfg.bg} ${cfg.color}`}>
                      {cfg.label}
                    </span>
                    <span className="text-xs font-mono text-ink/40">{c.budget}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-ink/40" /> : <ChevronDown className="w-4 h-4 text-ink/40" />}
                  </div>
                </div>

                {/* Expanded detail */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-ink/10 px-6 py-6 space-y-6"
                    >
                      {/* Brief details */}
                      <div className="grid gap-4 sm:grid-cols-3">
                        <InfoBlock label="Theme / Fandom" value={c.fandom || '—'} />
                        <InfoBlock label="Budget Range" value={c.budget || '—'} />
                        <InfoBlock label="Size" value={c.size || '—'} />
                      </div>

                      {c.useCase && (
                        <div className="rounded-2xl bg-[#f6f3ee] p-4">
                          <p className="text-[10px] uppercase tracking-widest text-ink/40 font-bold mb-2">Use Case / Brief</p>
                          <p className="text-sm text-ink/80 leading-relaxed whitespace-pre-line">{c.useCase}</p>
                        </div>
                      )}

                      <div className="text-xs font-mono text-ink/40">
                        Received: {new Date(c.createdAt).toLocaleString('en-IN')} · ID: {c.id}
                      </div>

                      {/* Admin controls */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-2">Update Status</label>
                          <select
                            value={localEdit.status}
                            onChange={e => setEditing(prev => ({ ...prev, [c.id]: { ...localEdit, status: e.target.value } }))}
                            className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-accent"
                          >
                            {Object.entries(STATUS_CONFIG).map(([val, { label }]) => (
                              <option key={val} value={val}>{label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-2">Admin Notes</label>
                          <textarea
                            value={localEdit.adminNotes}
                            onChange={e => setEditing(prev => ({ ...prev, [c.id]: { ...localEdit, adminNotes: e.target.value } }))}
                            placeholder="Internal notes about this brief..."
                            rows={2}
                            className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-accent resize-none"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 flex-wrap">
                        <button
                          onClick={() => updateCommission(c.id, localEdit.status, localEdit.adminNotes)}
                          className="rounded-xl bg-ink px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-paper hover:bg-accent transition"
                        >
                          Save Changes
                        </button>
                        {waLink(c) && (
                          <a
                            href={waLink(c)!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-[#25D366] bg-[#25D366]/10 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#128C7E] hover:bg-[#25D366]/20 transition"
                          >
                            <ExternalLink className="w-3 h-3" /> WhatsApp
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#f6f3ee] px-4 py-3">
      <p className="text-[10px] uppercase tracking-widest text-ink/40 font-bold">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
