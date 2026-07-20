"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Cpu, Hammer, Shield, Package, Sparkles } from 'lucide-react';
import Image from 'next/image';

function compressImage(base64Str, maxWidth = 1000, quality = 0.7) {
  return new Promise((resolve) => {
    const img = new globalThis.Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => resolve(base64Str);
  });
}

const stages = [
  {
    title: "Calibration & Slicing",
    subtitle: "Queueing build files",
    icon: Cpu,
    description: "Setting up the G-code parameter files. Calibrating the print bed mesh leveling matrix to 0.01mm tolerance. Slicing profile: layer height 0.16mm, infill gyroid 15%. Preheating nozzle hotend.",
    logs: [
      { time: "09:12 AM", text: "Calibration sequence: bed mesh leveling matrix (9x9) initialized. [Dev: 0.011mm]" },
      { time: "09:30 AM", text: "CAD files parsed. Extrusion width verified. G-code checksum: 0xFD91A. [Ready for melt sequence]" }
    ]
  },
  {
    title: "FDM 3D Printing",
    subtitle: "Material extrusion",
    icon: Hammer,
    description: "Extruding PLA+/TPU material layer-by-layer on the heated printing bed. Custom structural geometry is created over several hours under close temperature calibration.",
    logs: [
      { time: "11:05 AM", text: "Print start. Slicer parsing complete. Speed set to 150mm/s. Fan speed 100%." },
      { time: "02:15 PM", text: "Gyroid density: 15%. Extruder temperature stabilized at 218.4°C. [Z-axis step check: Nominal]" }
    ]
  },
  {
    title: "Sanding & Post-Processing",
    subtitle: "Sanding out layer lines",
    icon: Sparkles,
    description: "Removing the print from the build plate. Initiating manual wet-sanding sequence (grit 220 -> 400 -> 800) to clear surface stepping. Prepping the surface for a seamless, sanded satin finish.",
    logs: [
      { time: "04:30 PM", text: "Object demolded from build plate. Initiating hand-sanding sequence. [Layer lines cleared]" },
      { time: "05:45 PM", text: "Surface finish: Sanded to satin sheen. Part dimensions verified. [No structural stepping detected]" }
    ]
  },
  {
    title: "Concrete Pour & Curing",
    subtitle: "Silicon mold casting",
    icon: Hammer,
    description: "For concrete items: casting silicone mold matrices. Pouring hand-mixed 53-grade high early strength cement + fine silica sand + pigment wash. Vibration sequence to eliminate air voids. Curing phase.",
    logs: [
      { time: "08:00 AM", text: "Silicone pour script complete. Vacuum chamber degassed at 29 inHg. [Curing mold]" },
      { time: "12:30 PM", text: "Degassing sequence terminated. Silicone elastomer cured. Poured cement batch v3.1 casted. [Awaiting crystallization]" }
    ]
  },
  {
    title: "QC Assembly & Fitting",
    subtitle: "Felt bases & alignment",
    icon: Shield,
    description: "Testing fitting dimensions. Precision sanding check. Aligning and gluing soft cork bases/felt pads to protect desk surfaces. Affixing final quality control certification stamp.",
    logs: [
      { time: "03:00 PM", text: "Dimension accuracy check: 0.05mm margin of error. Pass. felt alignment verified." },
      { time: "04:15 PM", text: "Bond strength verified. Cork base aligned. Final packaging check: 100% nominal. [Ready to ship]" }
    ]
  },
  {
    title: "Boxed & Dispatched",
    subtitle: "Dispatched to logistics",
    icon: Package,
    description: "Wrapping object in double-layered bubble wrap and enclosing it in cardboard packaging. Shipping label generated and package scanned by delivery partner.",
    logs: [
      { time: "05:00 PM", text: "Shipping label created. Package packed. Courier pickup scheduled." },
      { time: "06:30 PM", text: "Logistics package scanned. Tracking ID registered. [Out for delivery]" }
    ]
  }
];

export default function TrackClientFeatures() {
  const [name, setName] = useState('');
  const [orderCode, setOrderCode] = useState('');
  const [orderNum, setOrderNum] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [uploadedPhotos, setUploadedPhotos] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!orderCode || !name) return;
    
    setIsInitialLoading(true);
    setLoginError('');
    
    try {
      const response = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderCode: `BS-${orderCode.trim().toUpperCase()}`, firstName: name })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsLoggedIn(true);
        setOrderData(data.data);
        setOrderNum(`BS-${orderCode.trim().toUpperCase()}`);
        setUploadedPhotos(data.data.uploadedPhotos || {});
        setComments(data.data.comments || []);
      } else {
        setLoginError(data.error || 'Invalid credentials or order not found.');
      }
    } catch (err) {
      setLoginError('Could not connect to tracking server. Please try again.');
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const originalComment = newComment;
    setNewComment('');
    setIsSyncing(true);

    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderCode: orderNum, text: originalComment, author: name })
      });
      
      const data = await response.json();
      if (data.success) {
        setComments(data.comments);
      }
    } catch (err) {
      console.error(err);
      setNewComment(originalComment);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setOrderData(null);
    setUploadedPhotos({});
    setComments([]);
    setOrderCode('');
    setOrderNum('');
  };

  return (
    <AnimatePresence mode="wait">
      {isInitialLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mx-auto max-w-md text-center py-20 space-y-4"
        >
          <div className="h-6 w-6 border-2 border-ink border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono text-ink/65 uppercase tracking-[0.15em]">Syncing build feeds from workshop...</p>
        </motion.div>
      ) : !isLoggedIn ? (
        <motion.div
          key="portal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mx-auto max-w-md rounded-[2.5rem] border border-ink bg-paper p-8 shadow-card md:p-10 texture-grid"
        >
          <div className="text-center">
            <span className="rounded-full border border-ink/15 bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.2em]">
              Workshop Portal
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">Track Build</h1>
            <p className="mt-2 text-sm text-ink/60">
              Enter your credentials to access live manufacturing updates.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
              <div className="mb-4">
                {loginError && (
                  <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
                    {loginError}
                  </div>
                )}
                <label htmlFor="name" className="mb-2 block text-sm font-medium uppercase tracking-widest text-ink/70">
                  First Name
                </label>
              <input
                type="text"
                id="name"
                required
                placeholder="e.g. Shreyas"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-ink bg-white/80 px-4 py-3 text-sm placeholder-ink/30 transition focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="order" className="block text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
                Order Number
              </label>
              <div className="mt-2 flex items-center gap-2">
                <div className="rounded-2xl border border-ink bg-[#f4f1ea] px-4 py-3 text-sm font-bold text-ink/70 font-mono select-none">
                  BS
                </div>
                <span className="text-ink/40 font-bold font-mono">-</span>
                <input
                  type="text"
                  id="order"
                  required
                  placeholder="e.g. 48201"
                  value={orderCode}
                  onChange={(e) => setOrderCode(e.target.value)}
                  className="w-full rounded-2xl border border-ink bg-white/80 px-4 py-3 text-sm placeholder-ink/30 transition focus:outline-none focus:ring-1 focus:ring-accent font-mono uppercase"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-2xl border border-ink bg-ink py-4 text-sm font-bold uppercase tracking-[0.15em] text-paper transition hover:bg-accent hover:text-ink"
            >
              Access Build Feed
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-6">
            <div className="flex gap-2">
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-ink bg-paper px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] transition hover:bg-ink hover:text-paper"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Logout
              </button>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-ink bg-white p-8 md:p-10 shadow-card texture-lines flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p 
                className="font-display text-sm font-bold uppercase tracking-[0.25em] text-ink/45 cursor-default select-none"
              >
                Order status tracker
              </p>
              <h2 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">
                Let's check on your setup, {name}.
              </h2>
              <p className="mt-3 text-base text-ink/70">
                Your custom desk object is currently moving through active FDM manufacturing steps.
              </p>
            </div>

            <div className="rounded-3xl border border-ink/15 bg-paper/60 p-6 space-y-3 min-w-[240px]">
              <div className="flex justify-between text-xs font-bold uppercase tracking-[0.1em] text-ink/50">
                <span>Order ID</span>
                <span className="text-ink font-mono">{orderNum.toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-[0.1em] text-ink/50">
                <span>Placed Date</span>
                <span className="text-ink">{orderData?.date}</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-[0.1em] text-ink/50">
                <span>Est. Dispatch</span>
                <span className="text-ink">10-12 Days</span>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-ink bg-[#f2ffb9] p-6 shadow-card">
                <span className="rounded-full border border-ink/15 bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.15em]">
                  Build Specifications
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold">{orderData?.productName}</h3>
                
                <div className="mt-6 space-y-4 border-t border-ink/10 pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink/60">Material Config</span>
                    <span className="font-bold">{orderData?.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink/60">Colorway</span>
                    <span className="font-bold">{orderData?.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink/60">Tolerances</span>
                    <span className="font-mono text-xs">+/- 0.05mm FDM</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-ink bg-white/60 p-6 space-y-4">
                <h4 className="font-display text-lg font-bold">Requesting an Adjustment?</h4>
                <p className="text-sm leading-relaxed text-ink/75">
                  We want your custom setup to be exactly how you envisioned it. Adjustments to colorways, finishes, or minor aesthetics are accepted within reason. Outlandish modifications or structural changes to the FDM matrix/casing layout may incur extra material and labor charges.
                </p>
                <p className="text-xs leading-relaxed text-ink/50 border-t border-ink/10 pt-3">
                  <strong>Crucial Window:</strong> Requests must be made either at the time of order placement or at least <strong>two manufacturing stages prior</strong> to the target phase. Once physical curing or printing begins, configurations are locked.
                </p>
                <a
                  href="mailto:support@bedroomstudios.in"
                  className="inline-block w-full text-center rounded-2xl border border-ink bg-ink py-3 text-xs font-bold uppercase tracking-[0.15em] text-paper transition hover:bg-accent hover:text-ink"
                >
                  Ping the Workshop
                </a>
              </div>

              <div className="rounded-[2rem] border border-ink bg-white p-6 shadow-card flex flex-col h-[400px]">
                <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                  <div>
                    <h4 className="font-display text-lg font-bold">Build Discussion</h4>
                    <p className="text-[10px] text-ink/40 uppercase tracking-[0.1em]">Direct feedback log</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogin}
                    disabled={isInitialLoading}
                    className="rounded-full bg-ink/5 hover:bg-ink/10 p-2 text-ink transition disabled:opacity-50"
                    title="Sync Feed"
                  >
                    <span className={`block text-xs font-mono font-bold ${isSyncing ? 'animate-spin' : ''}`}>
                      ↻
                    </span>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4 space-y-3 scrollbar-hide text-sm">
                  {comments.length === 0 ? (
                    <p className="text-xs text-ink/40 text-center py-6 font-mono">No comments on this build yet.</p>
                  ) : (
                    comments.map((msg, cIdx) => (
                      <div
                        key={cIdx}
                        className={`max-w-[80%] rounded-2xl px-4 py-3 bg-black/5 rounded-bl-none`}
                      >
                        <div className="flex justify-between items-center gap-4 text-[9px] uppercase tracking-[0.05em] font-bold text-ink/40">
                          <span>{msg.author}</span>
                          <span>{msg.time}</span>
                        </div>
                        <p className="mt-1 leading-relaxed text-xs break-words">{msg.text}</p>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handlePostComment} className="border-t border-ink/10 pt-3 flex gap-2">
                  <input
                    type="text"
                    placeholder="Send feedback..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 rounded-xl border border-ink/20 bg-paper/50 px-3 py-2 text-xs placeholder-ink/40 transition focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <button
                    type="submit"
                    disabled={isSyncing || !newComment.trim()}
                    className="rounded-xl bg-ink px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-paper hover:bg-accent hover:text-ink transition disabled:opacity-50"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-ink bg-white p-6 md:p-8 shadow-card">
              <h3 className="font-display text-2xl font-bold">Active Build Logs</h3>
              <p className="text-sm uppercase tracking-[0.3em] text-ink/50 mt-1">Order Tracking</p>

              <div className="mt-8 space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-ink/10">
                {stages.map((stage, idx) => {
                  const stageNumber = idx + 1;
                  const isCompleted = stageNumber < (orderData?.currentStage || 1);
                  const isActive = stageNumber === orderData?.currentStage;
                  const isQueued = stageNumber > (orderData?.currentStage || 1);
                  const photo = uploadedPhotos[idx];

                  return (
                    <div key={idx} className="relative pl-10 group">
                      <div
                        className={`absolute left-2.5 top-1.5 h-3.5 w-3.5 rounded-full border border-ink transition-all ${
                          isCompleted ? 'bg-ink scale-110' : isActive ? 'bg-lime scale-125 ring-4 ring-lime/20' : 'bg-paper'
                        }`}
                      />

                      <div className={`rounded-3xl border p-5 transition ${
                        isActive ? 'border-ink bg-[#f9f9f7] shadow-sm' : 'border-ink/10 bg-white'
                      }`}>
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <stage.icon className={`h-4 w-4 ${isActive ? 'text-ink' : 'text-ink/40'}`} />
                              <h4 className="font-display text-lg font-bold">{stage.title}</h4>
                            </div>
                            <p className="text-xs uppercase tracking-[0.1em] text-ink/45 mt-0.5">{stage.subtitle}</p>
                          </div>

                          <span className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-bold ${
                            isCompleted ? 'bg-ink/5 text-ink' : isActive ? 'bg-lime/25 text-ink' : 'bg-ink/5 text-ink/40'
                          }`}>
                            {isCompleted ? 'Finished' : isActive ? 'In Progress' : 'Queued'}
                          </span>
                        </div>

                        <p className="text-sm text-ink/75 mt-3 leading-relaxed">{stage.description}</p>

                        {!isQueued && (
                          <div className="mt-4 rounded-2xl bg-ink/5 p-4 space-y-2 border border-ink/5">
                            {stage.logs.map((log, lIdx) => (
                              <div key={lIdx} className="flex gap-4 text-xs font-mono">
                                <span className="text-ink/40 shrink-0">{log.time}</span>
                                <span className="text-ink/80">{log.text}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {(() => {
                          const rawPhotos = uploadedPhotos[idx];
                          const photoArray = Array.isArray(rawPhotos) ? rawPhotos : (rawPhotos ? [rawPhotos] : []);
                          
                          if (photoArray.length === 0) return null;
                          
                          return (
                            <div className="mt-4 space-y-3">
                              <span className="block text-[10px] uppercase tracking-[0.15em] font-bold text-ink/50">
                                Workshop Photo Feed
                              </span>
                              <div className={`grid gap-3 ${photoArray.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                {photoArray.map((p, pIdx) => (
                                  <div key={pIdx} className="relative rounded-2xl overflow-hidden border border-ink/10 bg-black/5">
                                    <Image
                                      src={p}
                                      alt={`Progress of ${stage.title} - ${pIdx + 1}`}
                                      width={800}
                                      height={600}
                                      sizes="(max-width: 768px) 100vw, 50vw"
                                      className="w-full h-full max-h-[22rem] object-cover hover:scale-105 transition duration-500"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
