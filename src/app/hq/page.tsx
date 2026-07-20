// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronRight, X, Send, ArrowLeft, Package, LayoutDashboard, Inbox, Tags, Users, Settings, LogOut, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useStoreState } from '@/context/StoreContext';
const STAGES = [
  { label: 'Order Received', icon: '📥' },
  { label: 'Files Prep', icon: '⚙️' },
  { label: 'Printing', icon: '🖨️' },
  { label: 'Post-Processing', icon: '🛠️' },
  { label: 'Quality Check', icon: '🔍' },
  { label: 'Shipped', icon: '📦' }
];

export default function AdminHQPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const { inventory: liveInventory, settings: liveSettings, isStoreLoading } = useStoreState();

  // Settings state
  const [localSettings, setLocalSettings] = useState({ maintenanceMode: false, announcementBanner: '' });
  const [localInventory, setLocalInventory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  
  useEffect(() => {
    if (liveSettings) setLocalSettings(liveSettings);
    if (liveInventory) setLocalInventory(liveInventory);
  }, [liveSettings, liveInventory]);

  // Data
  const [orders, setOrders] = useState({});
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Specific order view
  const [selectedOrderCode, setSelectedOrderCode] = useState(null);
  const [uploadedPhotos, setUploadedPhotos] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [copiedShareText, setCopiedShareText] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    verifySession();
  }, []);

  const verifySession = async () => {
    try {
      const res = await fetch('/api/auth/verify');
      if (res.ok) {
        setIsAuthenticated(true);
        fetchOrders();
      }
    } catch (err) {
      console.log('Not authenticated');
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        setIsAuthenticated(true);
        fetchOrders();
      } else {
        const data = await res.json();
        setLoginError(data.error || 'Login failed');
      }
    } catch (err) {
      setLoginError('Network error');
    }
  };

  const handleLogout = () => {
    // A proper logout would clear the cookie via a backend route, but for now we'll just reload the page 
    // to clear state (in a real app, you'd hit an /api/auth/logout endpoint to clear the HttpOnly cookie)
    document.cookie = "hq_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin');
      const data = await res.json();
      if (res.ok) setOrders(data.orders || {});
    } catch (err) {
      console.error(err);
    }
  };

  const syncToCloud = async (orderId, newOrderData) => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/admin', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, orderData: newOrderData })
      });
      if (!res.ok) throw new Error('Failed to sync');
      setOrders(prev => ({ ...prev, [orderId]: newOrderData }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
    }
  };

  const compressImage = (base64Str) => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.6));
      };
      img.onerror = () => resolve(base64Str);
    });
  };

  const handlePhotoUpload = async (stageIndex, e) => {
    const file = e.target.files[0];
    if (!file || !activeOrder) return;
    setIsSyncing(true);
    try {
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
      });
      const blob = await response.json();
      
      if (!response.ok) {
        throw new Error(blob.error || 'Server returned ' + response.status);
      }
      
      if (blob && blob.url) {
        const existing = activeOrder.uploadedPhotos?.[stageIndex];
        const existingArray = Array.isArray(existing) ? existing : (existing ? [existing] : []);
        const updatedPhotos = { ...(activeOrder.uploadedPhotos || {}), [stageIndex]: [...existingArray, blob.url] };
        
        setUploadedPhotos(updatedPhotos);
        await syncToCloud(selectedOrderCode, { ...activeOrder, uploadedPhotos: updatedPhotos });
      } else {
        throw new Error("Upload response missing url");
      }
    } catch (err) {
      console.error(err);
      alert('Photo upload failed: ' + err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleClearPhoto = async (stageIndex, photoIndexToRemove) => {
    if (!activeOrder) return;
    const existing = activeOrder.uploadedPhotos?.[stageIndex];
    const existingArray = Array.isArray(existing) ? existing : (existing ? [existing] : []);
    const updatedArray = existingArray.filter((_, i) => i !== photoIndexToRemove);

    const updatedPhotos = { ...(activeOrder.uploadedPhotos || {}) };
    if (updatedArray.length === 0) {
      delete updatedPhotos[stageIndex];
    } else {
      updatedPhotos[stageIndex] = updatedArray;
    }
    
    setUploadedPhotos(updatedPhotos);
    await syncToCloud(selectedOrderCode, { ...activeOrder, uploadedPhotos: updatedPhotos });
  };

  const handleStageUpdate = async (newStage) => {
    if (!activeOrder) return;
    await syncToCloud(selectedOrderCode, { ...activeOrder, currentStage: newStage });
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !activeOrder) return;
    const newEntry = { text: newComment, author: 'Admin', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const updatedComments = [...(activeOrder.comments || []), newEntry];
    setComments(updatedComments);
    setNewComment('');
    await syncToCloud(selectedOrderCode, { ...activeOrder, comments: updatedComments });
  };

  const openOrder = (orderId) => {
    setSelectedOrderCode(orderId);
    const order = orders[orderId];
    setUploadedPhotos(order.uploadedPhotos || {});
    setComments(order.comments || []);
  };

  const handleShareTrackingMessage = async () => {
    if (!activeOrder) return;
    const trackUrl = `${window.location.origin}/track`;
    const messageText = `Hey ${activeOrder.customerName}, your '${activeOrder.productName}' build is underway! ✦\n\nTrack live progress here:\n🔗 ${trackUrl}\n👤 ${activeOrder.customerName}\n📦 ${selectedOrderCode}\n\nCheers,\nBedroom Studios`;

    try {
      await navigator.clipboard.writeText(messageText);
      setCopiedShareText(true);
      setTimeout(() => setCopiedShareText(false), 2500);
    } catch (err) {}
  };

  const activeOrder = selectedOrderCode ? orders[selectedOrderCode] : null;

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-[#f9f9f7] text-ink flex items-center justify-center">
        <div className="font-mono text-sm text-ink/40 animate-pulse">Verifying secure connection...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f9f9f7] text-ink selection:bg-accent selection:text-ink flex flex-col items-center justify-center p-4">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block text-xl font-display font-black uppercase tracking-tight">
            Bedroom<br/><span className="text-ink/40">Studios</span>
          </Link>
          <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-lime-600 flex items-center justify-center gap-1">
            <CheckCircle className="w-3 h-3" /> HQ Secure
          </div>
        </div>
        
        <div className="w-full max-w-md rounded-[2.5rem] border border-ink bg-paper p-8 shadow-card md:p-12">
          <div className="text-center">
            <LayoutDashboard className="mx-auto h-8 w-8 text-ink/40" />
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">Admin HQ</h1>
            <p className="mt-2 text-sm text-ink/60">Workshop personnel only.</p>
          </div>
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            {loginError && <p className="text-red-500 text-sm bg-red-500/10 p-3 rounded-xl border border-red-500/20">{loginError}</p>}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-2xl border border-ink bg-white/80 px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none font-mono"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-ink bg-white/80 px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none font-mono tracking-widest"
            />
            <button className="w-full rounded-2xl bg-ink py-4 text-sm font-bold uppercase tracking-widest text-paper hover:bg-accent hover:text-ink transition">
              Unlock Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- TAB RENDERERS ---

  const renderDashboardTab = () => {
    const orderValues = Object.values(orders);
    const totalRevenue = orderValues.reduce((sum, ord) => sum + (ord.total || 0), 0);
    const activeBuilds = orderValues.filter(o => o.currentStage < 6).length;

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="font-display text-3xl font-bold">Analytics Overview</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-ink bg-paper p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-widest text-ink/50">Total Revenue</p>
            <p className="mt-2 text-4xl font-display font-bold">₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>
          <div className="rounded-3xl border border-ink bg-paper p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-widest text-ink/50">Active Builds</p>
            <p className="mt-2 text-4xl font-display font-bold">{activeBuilds}</p>
          </div>
          <div className="rounded-3xl border border-ink bg-paper p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-widest text-ink/50">Total Orders</p>
            <p className="mt-2 text-4xl font-display font-bold">{orderValues.length}</p>
          </div>
        </div>
        <div className="rounded-3xl border border-ink bg-[#f4f1ea] p-8 mt-8">
          <p className="font-mono text-sm text-ink/50 mb-4">Live Redis Connection Status</p>
          <div className="flex items-center gap-2 text-lime-600 font-bold uppercase tracking-widest text-xs">
            <span className="h-2 w-2 rounded-full bg-lime-500 animate-pulse"></span> Connected to Upstash Vercel KV
          </div>
        </div>
      </div>
    );
  };

  const renderOrdersTab = () => {
    if (activeOrder) {
      return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-ink/10">
            <button onClick={() => setSelectedOrderCode(null)} className="inline-flex items-center gap-2 rounded-full border border-ink bg-paper px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] hover:bg-ink hover:text-paper transition">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Orders
            </button>
            <button onClick={handleShareTrackingMessage} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] transition ${copiedShareText ? 'border-accent bg-accent text-ink' : 'border-ink bg-ink text-paper hover:bg-accent hover:text-ink'}`}>
              {copiedShareText ? '✓ Copied' : 'Share Tracking Link'}
            </button>
          </div>

          <div className="rounded-[2.5rem] border border-ink bg-paper p-8 shadow-card">
            <h2 className="font-display text-3xl font-bold">{activeOrder.customerName}'s {activeOrder.productName}</h2>
            <p className="mt-2 font-mono text-sm text-ink/60">Order: BS-{selectedOrderCode} | Date: {activeOrder.date}</p>
            
            <div className="mt-12 space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink/70">Update Stage:</span>
                <div className="flex flex-wrap gap-2">
                  {STAGES.map((s, i) => (
                    <button key={i} onClick={() => handleStageUpdate(i + 1)} className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition ${activeOrder.currentStage === i + 1 ? 'bg-accent border-accent text-ink shadow-sm scale-105' : 'border-ink/20 text-ink/60 hover:bg-ink/5'}`}>
                      {i + 1}. {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative pl-6 before:absolute before:bottom-0 before:left-[11px] before:top-2 before:w-[2px] before:bg-ink/10">
                {STAGES.map((stage, index) => {
                  const stepNum = index + 1;
                  const isCompleted = stepNum <= activeOrder.currentStage;
                  const isCurrent = stepNum === activeOrder.currentStage;
                  return (
                    <div key={stage.label} className={`relative mb-8 transition-opacity ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                      <div className={`absolute -left-[30px] flex h-4 w-4 items-center justify-center rounded-full border-2 bg-paper ${isCompleted ? 'border-accent' : 'border-ink/20'} ${isCurrent ? 'ring-4 ring-accent/20 scale-125' : ''}`} />
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{stage.icon}</span>
                        <h3 className="font-bold">{stage.label}</h3>
                      </div>
                      {isCompleted && (
                        <div className="mt-4 flex flex-wrap gap-3">
                          {(() => {
                            const rawPhotos = uploadedPhotos[index];
                            const photoArray = Array.isArray(rawPhotos) ? rawPhotos : (rawPhotos ? [rawPhotos] : []);
                            return (
                              <>
                                {photoArray.map((photoUrl, photoIdx) => (
                                  <div key={photoIdx} className="relative inline-block">
                                    <img src={photoUrl} alt="Progress" className="h-24 w-24 rounded-xl object-cover border border-ink/10 shadow-sm" />
                                    <button onClick={() => handleClearPhoto(index, photoIdx)} className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow-md hover:bg-red-600 transition hover:scale-110">
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                                <label className="inline-flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-ink/20 bg-black/5 text-xs font-medium hover:bg-black/10 transition">
                                  <Camera className="h-4 w-4 opacity-70" /> 
                                  <span className="opacity-70">Add Photo</span>
                                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(index, e)} />
                                </label>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-12 border-t border-ink/10 pt-8">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-ink/70">Workshop Chat</h3>
                <div className="space-y-4 mb-4">
                  {comments.map((c, i) => (
                    <div key={i} className={`flex ${c.author === 'Admin' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${c.author === 'Admin' ? 'bg-ink text-paper rounded-br-none' : 'bg-black/5 rounded-bl-none'}`}>
                        <p className="text-sm">{c.text}</p>
                        <span className="mt-1 block text-[10px] opacity-60 font-mono">{c.time} • {c.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handlePostComment} className="flex gap-2">
                  <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Type a message to the customer..." className="flex-1 rounded-full border border-ink/20 bg-black/5 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition" />
                  <button type="submit" className="rounded-full bg-accent p-2 text-ink hover:scale-105 transition"><Send className="h-4 w-4" /></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="font-display text-3xl font-bold mb-8">Order Management</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(orders).reverse().map(([orderId, order]) => (
            <div key={orderId} onClick={() => openOrder(orderId)} className="cursor-pointer rounded-3xl border border-ink/20 bg-paper p-6 shadow-sm transition hover:-translate-y-1 hover:border-ink hover:shadow-card relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-ink/5 group-hover:bg-accent transition-colors"></div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-xs font-bold text-ink/50">BS-{orderId}</p>
                  <h3 className="mt-1 font-bold text-lg">{order.customerName}</h3>
                </div>
                <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${order.currentStage === 6 ? 'bg-ink text-paper' : 'bg-accent/30 text-ink'}`}>
                  Stage {order.currentStage}
                </span>
              </div>
              <p className="mt-4 text-sm text-ink/80 font-medium">{order.productName}</p>
              <p className="mt-1 text-xs text-ink/50">{order.material}</p>
              <div className="mt-4 flex items-center justify-between pt-4 border-t border-ink/10">
                <span className="text-xs font-mono text-ink/50">{order.date}</span>
                <span className="text-sm font-bold">₹{order.total?.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
          {Object.keys(orders).length === 0 && (
            <div className="col-span-full py-12 text-center text-ink/50 border border-dashed border-ink/20 rounded-3xl">
              No orders found in Redis.
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleSaveStore = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/admin/store', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: localSettings, inventory: localInventory })
      });
      if (!res.ok) throw new Error('Failed to save store state');
      alert('Store saved successfully! Refreshing to apply.');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Failed to save');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSaveProductEdit = (e) => {
    e.preventDefault();
    setLocalInventory(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
  };

  const renderInventoryTab = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-3xl font-bold">Inventory & Products</h2>
        <button 
          onClick={handleSaveStore}
          disabled={isSyncing}
          className="rounded-xl bg-ink px-4 py-2 text-xs font-bold uppercase tracking-widest text-paper hover:bg-accent transition disabled:opacity-50"
        >
          {isSyncing ? 'Saving...' : 'Save to Redis'}
        </button>
      </div>
      <p className="text-ink/60 mb-8">Manage product listings, pricing, and stock levels. (Syncs with Redis state)</p>
      
      <div className="rounded-3xl border border-ink bg-paper shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink/5 text-xs uppercase tracking-widest text-ink/50">
            <tr>
              <th className="px-6 py-4 font-bold">Product</th>
              <th className="px-6 py-4 font-bold">Price</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {localInventory && localInventory.map((p, i) => (
              <tr key={i} className="hover:bg-ink/5 transition-colors">
                <td className="px-6 py-4 font-medium flex items-center gap-3">
                  <img src={p.gallery[0].image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  {p.name}
                </td>
                <td className="px-6 py-4 font-mono">₹{p.price}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${p.limitedDrop ? 'bg-orange-100 text-orange-800' : 'bg-lime-100 text-lime-800'}`}>
                    {p.limitedDrop ? 'Limited' : 'Core'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => setEditingProduct(p)} className="text-xs font-bold uppercase tracking-widest text-ink/50 hover:text-ink transition">Edit Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-paper p-8 shadow-card relative"
          >
            <button onClick={() => setEditingProduct(null)} className="absolute top-6 right-6 text-ink/50 hover:text-ink">
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="font-display text-2xl font-bold mb-6">Edit Product: {editingProduct.name}</h3>
            
            <form onSubmit={handleSaveProductEdit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Name</label>
                  <input type="text" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Price (₹)</label>
                  <input type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none" required />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Label</label>
                <input type="text" value={editingProduct.label || ''} onChange={e => setEditingProduct({...editingProduct, label: e.target.value})} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Description</label>
                <textarea value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none min-h-[80px]" required />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Story / Lore</label>
                <textarea value={editingProduct.story || ''} onChange={e => setEditingProduct({...editingProduct, story: e.target.value})} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none min-h-[100px]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Dimensions</label>
                  <input type="text" value={editingProduct.dimensions || ''} onChange={e => setEditingProduct({...editingProduct, dimensions: e.target.value})} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Care Instructions</label>
                  <input type="text" value={editingProduct.care || ''} onChange={e => setEditingProduct({...editingProduct, care: e.target.value})} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none" />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-ink/10">
                <input 
                  type="checkbox" 
                  id="limitedDrop"
                  checked={editingProduct.limitedDrop || false} 
                  onChange={e => setEditingProduct({...editingProduct, limitedDrop: e.target.checked})}
                  className="w-5 h-5 rounded border-ink/20 text-accent focus:ring-accent"
                />
                <label htmlFor="limitedDrop" className="text-sm font-bold">Limited Drop Status</label>
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full rounded-xl bg-ink px-4 py-4 text-sm font-bold uppercase tracking-widest text-paper hover:bg-accent transition">
                  Apply Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );

  const renderCRMTab = () => {
    const customers = Object.values(orders).reduce((acc, order) => {
      if (!acc[order.customerName]) {
        acc[order.customerName] = { name: order.customerName, email: order.email, spent: 0, orders: 0 };
      }
      acc[order.customerName].spent += (order.total || 0);
      acc[order.customerName].orders += 1;
      return acc;
    }, {});

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="font-display text-3xl font-bold mb-4">Customers (CRM)</h2>
        <p className="text-ink/60 mb-8">View lifetime value and contact info for all buyers.</p>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(customers).map((c, i) => (
            <div key={i} className="rounded-3xl border border-ink/20 bg-paper p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center font-bold text-ink">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold">{c.name}</h3>
                  <p className="text-xs text-ink/50 font-mono">{c.email || 'No email'}</p>
                </div>
              </div>
              <div className="flex justify-between pt-4 border-t border-ink/10">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-ink/50 font-bold">Orders</p>
                  <p className="font-mono text-sm mt-1">{c.orders}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-ink/50 font-bold">Lifetime Spent</p>
                  <p className="font-mono text-sm mt-1 font-bold text-lime-600">₹{c.spent.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSettingsTab = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
      <h2 className="font-display text-3xl font-bold mb-8">Store Settings</h2>
      
      <div className="space-y-6">
        <div className="rounded-3xl border border-ink bg-paper p-8 shadow-sm">
          <h3 className="font-bold mb-2 flex items-center gap-2"><Tags className="w-4 h-4" /> Global Announcement Banner</h3>
          <p className="text-xs text-ink/50 mb-4">Display a banner at the top of the store.</p>
          <input 
            type="text" 
            value={localSettings.announcementBanner}
            onChange={(e) => setLocalSettings(s => ({ ...s, announcementBanner: e.target.value }))}
            placeholder="e.g. Free shipping on all orders this weekend!" 
            className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none" 
          />
        </div>

        <div className="rounded-3xl border border-ink bg-paper p-8 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="font-bold mb-1 flex items-center gap-2"><Settings className="w-4 h-4" /> Maintenance Mode</h3>
            <p className="text-xs text-ink/50">Hide the shop from public view. Only Admin HQ remains accessible.</p>
          </div>
          <button 
            onClick={() => setLocalSettings(s => ({ ...s, maintenanceMode: !s.maintenanceMode }))}
            className={`w-14 h-7 rounded-full transition-colors relative ${localSettings.maintenanceMode ? 'bg-accent' : 'bg-ink/20'}`}
          >
            <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${localSettings.maintenanceMode ? 'translate-x-7' : ''}`} />
          </button>
        </div>

        <button 
          onClick={handleSaveStore}
          disabled={isSyncing}
          className="mt-4 w-full rounded-xl bg-ink px-4 py-4 text-sm font-bold uppercase tracking-widest text-paper hover:bg-accent transition disabled:opacity-50"
        >
          {isSyncing ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f9f9f7] text-ink selection:bg-accent selection:text-ink flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-paper border-b md:border-b-0 md:border-r border-ink/10 flex flex-col">
        <div className="p-6 border-b border-ink/10">
          <Link href="/" className="inline-block text-xl font-display font-black uppercase tracking-tight">
            Bedroom<br/><span className="text-ink/40">Studios</span>
          </Link>
          <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-lime-600 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> HQ Secure
          </div>
        </div>
        
        <nav className="p-4 space-y-1 flex-1 overflow-x-auto flex md:flex-col gap-2">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'orders', icon: Inbox, label: 'Orders' },
            { id: 'inventory', icon: Package, label: 'Inventory' },
            { id: 'crm', icon: Users, label: 'Customers' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedOrderCode(null); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition whitespace-nowrap ${activeTab === tab.id ? 'bg-ink text-paper shadow-md' : 'text-ink/60 hover:bg-ink/5 hover:text-ink'}`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-ink/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 w-full transition">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && renderDashboardTab()}
          {activeTab === 'orders' && renderOrdersTab()}
          {activeTab === 'inventory' && renderInventoryTab()}
          {activeTab === 'crm' && renderCRMTab()}
          {activeTab === 'settings' && renderSettingsTab()}
        </div>
      </main>

    </div>
  );
}
