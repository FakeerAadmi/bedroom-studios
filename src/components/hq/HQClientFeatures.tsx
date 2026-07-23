// @ts-nocheck
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, X, Send, ArrowLeft, Package, LayoutDashboard, Inbox, Tags, Users, Settings, LogOut, CheckCircle, Search, AlertTriangle, Plus, MessageCircle, Calculator, Printer, Hammer, ShieldCheck, Cog } from 'lucide-react';
import Link from 'next/link';
import { useStoreState } from '@/context/StoreContext';
import CommissionsTab from '@/components/hq/tabs/CommissionsTab';
import CostCalculatorTab from '@/components/hq/tabs/CostCalculatorTab';
import SuppliesTab from '@/components/hq/tabs/SuppliesTab';
import { Wrench } from 'lucide-react';

const STAGES = [
  { label: 'Order Received', icon: Inbox },
  { label: 'Files Prep', icon: Cog },
  { label: 'Printing', icon: Printer },
  { label: 'Post-Processing', icon: Hammer },
  { label: 'Quality Check', icon: ShieldCheck },
  { label: 'Shipped', icon: Package }
];

export default function HQClientFeatures() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const { inventory: liveInventory, settings: liveSettings } = useStoreState();

  const [localSettings, setLocalSettings] = useState({
    maintenanceMode: false,
    announcementBanner: '',
    supportEmail: 'hello@bedroomstudios.store',
    shippingLeadTime: 'Ships in 4-7 days',
    featuredFamily: 'Hybrid Builds',
    featuredMaterialFocus: 'Cast cement + PLA+',
    experimentalNotice: 'Bedroom Labs is for experiments, prototypes, and material tests.',
  });
  const [localInventory, setLocalInventory] = useState<any[] | null>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  useEffect(() => {
    if (liveSettings) setLocalSettings(liveSettings);
    if (liveInventory) setLocalInventory(liveInventory);
  }, [liveSettings, liveInventory]);

  const [orders, setOrders] = useState<Record<string, any>>({});
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStageFilter, setOrderStageFilter] = useState('all');
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryStatusFilter, setInventoryStatusFilter] = useState('all');
  
  const [selectedOrderCode, setSelectedOrderCode] = useState<string | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState({});
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [copiedShareText, setCopiedShareText] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [newOrder, setNewOrder] = useState({ customerName: '', phone: '', email: '', productName: '', material: '', total: '', notes: '' });
  const [customerNotes, setCustomerNotes] = useState<Record<string, { notes: string; tags: string }>>({});

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
      // Not authenticated
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleLogin = async (e: any) => {
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

  const syncToCloud = async (orderId: string, newOrderData: any) => {
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

  const handlePhotoUpload = async (stageIndex: number, e: any) => {
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
        await syncToCloud(selectedOrderCode as string, { ...activeOrder, uploadedPhotos: updatedPhotos });
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

  const handleClearPhoto = async (stageIndex: number, photoIndexToRemove: number) => {
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
    await syncToCloud(selectedOrderCode as string, { ...activeOrder, uploadedPhotos: updatedPhotos });
  };

  const handleClearComment = async (commentIndex: number) => {
    if (!activeOrder) return;
    const updatedComments = comments.filter((_: any, i: number) => i !== commentIndex);
    setComments(updatedComments);
    await syncToCloud(selectedOrderCode as string, { ...activeOrder, comments: updatedComments });
  };

  const handleStageUpdate = async (newStage: number) => {
    if (!activeOrder) return;
    await syncToCloud(selectedOrderCode as string, { ...activeOrder, currentStage: newStage });
  };

  const handlePostComment = async (e: any) => {
    e.preventDefault();
    if (!newComment.trim() || !activeOrder) return;
    const newEntry = { text: newComment, author: 'Admin', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const updatedComments = [...(activeOrder.comments || []), newEntry];
    setComments(updatedComments);
    setNewComment('');
    await syncToCloud(selectedOrderCode as string, { ...activeOrder, comments: updatedComments });
  };

  const openOrder = (orderId: string) => {
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

  const handleWhatsAppSend = () => {
    if (!activeOrder) return;
    const trackUrl = `${window.location.origin}/track`;
    const phone = activeOrder.phone || '';
    const messageText = encodeURIComponent(`Hey ${activeOrder.customerName}! Your '${activeOrder.productName}' build is underway ✦\n\nTrack your progress live:\n🔗 ${trackUrl}\nOrder: ${activeOrder.orderNumber}\n\nCheers,\nBedroom Studios`);
    const url = phone
      ? `https://wa.me/91${phone}?text=${messageText}`
      : `https://wa.me/?text=${messageText}`;
    window.open(url, '_blank');
  };

  const handleCreateOrder = async (e: any) => {
    e.preventDefault();
    const orderId = String(Date.now()).slice(-6);
    const orderData = {
      id: orderId,
      customerName: newOrder.customerName,
      phone: newOrder.phone,
      email: newOrder.email,
      productName: newOrder.productName,
      material: newOrder.material,
      total: Number(newOrder.total) || 0,
      notes: newOrder.notes,
      date: new Date().toISOString().split('T')[0],
      currentStage: 1,
      comments: newOrder.notes ? [{ text: newOrder.notes, author: 'Admin', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }] : [],
      uploadedPhotos: {},
    };
    await syncToCloud(orderId, orderData);
    setNewOrder({ customerName: '', phone: '', email: '', productName: '', material: '', total: '', notes: '' });
    setShowCreateOrder(false);
    fetchOrders();
  };

  const activeOrder = selectedOrderCode ? orders[selectedOrderCode] : null;
  const orderEntries = Object.entries(orders).map(([id, order]: any) => ({ id, ...order }));
  const orderValues = orderEntries.map((entry) => entry);
  const totalRevenue = orderValues.reduce((sum, ord: any) => sum + (ord.total || 0), 0);
  const activeBuilds = orderValues.filter((o: any) => (o.currentStage || 0) < STAGES.length).length;
  const averageOrderValue = orderValues.length ? Math.round(totalRevenue / orderValues.length) : 0;
  const customers = orderValues.reduce((acc: any, order: any) => {
    const key = order.email || order.customerName;
    if (!acc[key]) {
      acc[key] = {
        name: order.customerName,
        email: order.email,
        spent: 0,
        orders: 0,
        lastOrderDate: order.date,
      };
    }
    acc[key].spent += order.total || 0;
    acc[key].orders += 1;
    acc[key].lastOrderDate = order.date;
    return acc;
  }, {});
  const customerList = Object.values(customers).sort((left: any, right: any) => right.spent - left.spent);
  const repeatCustomers = customerList.filter((customer: any) => customer.orders > 1).length;
  const inventoryList = localInventory || [];
  const lowStockCount = inventoryList.filter((product: any) => (product.stock ?? 0) <= 5).length;
  const experimentalCount = inventoryList.filter((product: any) => product.adminStatus === 'experimental').length;
  const limitedDropCount = inventoryList.filter((product: any) => product.limitedDrop).length;
  const filteredOrders = orderEntries
    .filter((order: any) => {
      const haystack = `${order.id} ${order.customerName} ${order.productName} ${order.material || ''}`.toLowerCase();
      const matchesSearch = !orderSearch || haystack.includes(orderSearch.toLowerCase());
      const matchesStage = orderStageFilter === 'all' || String(order.currentStage) === orderStageFilter;
      return matchesSearch && matchesStage;
    })
    .reverse();
  const filteredInventory = inventoryList.filter((product: any) => {
    const haystack = `${product.name} ${product.sku || ''} ${product.family || ''} ${product.label || ''}`.toLowerCase();
    const matchesSearch = !inventorySearch || haystack.includes(inventorySearch.toLowerCase());
    if (inventoryStatusFilter === 'all') return matchesSearch;
    if (inventoryStatusFilter === 'limited') return matchesSearch && product.limitedDrop;
    if (inventoryStatusFilter === 'low-stock') return matchesSearch && (product.stock ?? 0) <= 5;
    return matchesSearch && product.adminStatus === inventoryStatusFilter;
  });

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
              onChange={(e: any) => setUsername(e.target.value)}
              className="w-full rounded-2xl border border-ink bg-white/80 px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none font-mono"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
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

  const renderRevenueChart = () => {
    const days = 30;
    const dayData: { date: string; rev: number }[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const rev = orderValues
        .filter((o: any) => o.date === key)
        .reduce((s: number, o: any) => s + (o.total || 0), 0);
      dayData.push({ date: key, rev });
    }
    const maxRev = Math.max(...dayData.map(d => d.rev), 1);
    const W = 600;
    const H = 80;
    const barW = W / days - 2;
    return (
      <div className="rounded-[2rem] border border-ink bg-paper p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-ink/50">Revenue — Last 30 Days</p>
            <p className="mt-1 text-xs text-ink/40 font-mono">{dayData[0]?.date} → {dayData[days - 1]?.date}</p>
          </div>
          <p className="font-display text-2xl font-bold">₹{dayData.reduce((s, d) => s + d.rev, 0).toLocaleString('en-IN')}</p>
        </div>
        <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full" preserveAspectRatio="none">
          {dayData.map((d, i) => {
            const barH = d.rev > 0 ? Math.max((d.rev / maxRev) * H, 4) : 2;
            const x = i * (W / days) + 1;
            const y = H - barH;
            return (
              <g key={d.date}>
                <rect
                  x={x} y={y} width={barW} height={barH}
                  rx={2}
                  fill={d.rev > 0 ? '#1a1a1a' : '#f4f1ea'}
                  className="transition-all duration-300"
                />
                {d.rev > 0 && (
                  <title>₹{d.rev.toLocaleString('en-IN')} on {d.date}</title>
                )}
              </g>
            );
          })}
          <text x="0" y={H + 16} fontSize="8" fill="#aaa" fontFamily="monospace">{dayData[0]?.date?.slice(5)}</text>
          <text x={W - 30} y={H + 16} fontSize="8" fill="#aaa" fontFamily="monospace">{dayData[days - 1]?.date?.slice(5)}</text>
        </svg>
      </div>
    );
  };

  const renderDashboardTab = () => {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="font-display text-3xl font-bold">Analytics Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
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
          <div className="rounded-3xl border border-ink bg-paper p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-widest text-ink/50">Average Order Value</p>
            <p className="mt-2 text-4xl font-display font-bold">₹{averageOrderValue.toLocaleString('en-IN')}</p>
          </div>
          <div className="rounded-3xl border border-ink bg-paper p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-widest text-ink/50">Low Stock Alerts</p>
            <p className="mt-2 text-4xl font-display font-bold">{lowStockCount}</p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-ink bg-paper p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-ink/50">Recent Orders</p>
                <p className="mt-2 text-sm text-ink/60">A quick read on what is moving through the workshop right now.</p>
              </div>
              <button
                onClick={() => setActiveTab('orders')}
                className="rounded-full border border-ink px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-ink hover:text-paper"
              >
                Open orders
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {filteredOrders.slice(0, 5).map((order: any) => (
                <button
                  key={order.id}
                  type="button"
                  onClick={() => {
                    setActiveTab('orders');
                    openOrder(order.id);
                  }}
                  className="flex w-full items-center justify-between rounded-[1.4rem] border border-ink/10 bg-[#f6f3ee] px-4 py-4 text-left transition hover:border-ink/30 hover:bg-white"
                >
                  <div>
                    <p className="font-mono text-xs text-ink/45">{order.orderNumber}</p>
                    <p className="mt-1 font-bold">{order.customerName}</p>
                    <p className="mt-1 text-sm text-ink/60">{order.productName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.15em] text-ink/45">
                      {STAGES[(order.currentStage || 1) - 1]?.label || 'Order received'}
                    </p>
                    <p className="mt-2 font-bold">₹{(order.total || 0).toLocaleString('en-IN')}</p>
                  </div>
                </button>
              ))}
              {filteredOrders.length === 0 ? (
                <div className="rounded-[1.4rem] border border-dashed border-ink/20 px-4 py-8 text-center text-sm text-ink/50">
                  No order activity yet.
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-ink bg-paper p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-widest text-ink/50">Catalog Health</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.4rem] bg-[#f6f3ee] p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Experimental</p>
                  <p className="mt-2 text-3xl font-display font-bold">{experimentalCount}</p>
                </div>
                <div className="rounded-[1.4rem] bg-[#f6f3ee] p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Limited Drops</p>
                  <p className="mt-2 text-3xl font-display font-bold">{limitedDropCount}</p>
                </div>
                <div className="rounded-[1.4rem] bg-[#fff4e8] p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Low Stock</p>
                  <p className="mt-2 text-3xl font-display font-bold">{lowStockCount}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-ink bg-[#f4f1ea] p-8">
              <p className="font-mono text-sm text-ink/50 mb-4">Store Operations</p>
              <div className="grid gap-3 text-sm text-ink/70">
                <div className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white/70 px-4 py-3">
                  <span>Repeat customers</span>
                  <span className="font-bold text-ink">{repeatCustomers}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white/70 px-4 py-3">
                  <span>Featured family</span>
                  <span className="font-bold text-ink">{localSettings.featuredFamily || 'Not set'}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white/70 px-4 py-3">
                  <span>Lead time</span>
                  <span className="font-bold text-ink">{localSettings.shippingLeadTime || 'Not set'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {renderRevenueChart()}
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
            <div className="flex gap-2 flex-wrap">
              <button onClick={handleShareTrackingMessage} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] transition ${copiedShareText ? 'border-accent bg-accent text-ink' : 'border-ink/30 text-ink/70 hover:border-ink hover:bg-ink hover:text-paper'}`}>
                {copiedShareText ? '✓ Copied' : 'Copy Tracking Link'}
              </button>
              <button onClick={handleWhatsAppSend} className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#128C7E] hover:bg-[#25D366]/20 transition">
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </button>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-ink bg-paper p-8 shadow-card">
            <h2 className="font-display text-3xl font-bold">{activeOrder.customerName}'s {activeOrder.productName}</h2>
            <p className="mt-2 font-mono text-sm text-ink/60">Order: {activeOrder.orderNumber} | Date: {activeOrder.date}</p>
            
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
                        <div className="text-ink/70 flex items-center justify-center p-1.5 rounded-full bg-ink/5 border border-ink/10"><stage.icon className="w-4 h-4" /></div>
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
                                    <Image src={photoUrl} width={96} height={96} alt="Progress" className="h-24 w-24 rounded-xl object-cover border border-ink/10 shadow-sm" />
                                    <button onClick={() => handleClearPhoto(index, photoIdx)} className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow-md hover:bg-red-600 transition hover:scale-110">
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                                <label className="inline-flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-ink/20 bg-black/5 text-xs font-medium hover:bg-black/10 transition">
                                  <Camera className="h-4 w-4 opacity-70" /> 
                                  <span className="opacity-70">Add Photo</span>
                                  <input type="file" accept="image/*" className="hidden" onChange={(e: any) => handlePhotoUpload(index, e)} />
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
                  {comments.map((c: any, i: number) => (
                    <div key={i} className={`flex ${c.author === 'Admin' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`group relative max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${c.author === 'Admin' ? 'bg-ink text-paper rounded-br-none' : 'bg-black/5 rounded-bl-none'}`}>
                        <button 
                          onClick={() => handleClearComment(i)}
                          className={`absolute -top-2 ${c.author === 'Admin' ? '-left-2' : '-right-2'} rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 shadow-md hover:bg-red-600 hover:scale-110 z-10`}
                          title="Delete message"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <p className="text-sm">{c.text}</p>
                        <span className="mt-1 block text-[10px] opacity-60 font-mono">{c.time} • {c.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handlePostComment} className="flex gap-2">
                  <input type="text" value={newComment} onChange={(e: any) => setNewComment(e.target.value)} placeholder="Type a message to the customer..." className="flex-1 rounded-full border border-ink/20 bg-black/5 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition" />
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
        <div className="flex flex-col gap-4 mb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">Order Management</h2>
            <p className="mt-2 text-sm text-ink/60">Search by customer, product, or order code and jump into build progress fast.</p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowCreateOrder(true)}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-ink hover:bg-ink hover:text-paper transition"
            >
              <Plus className="w-3.5 h-3.5" /> New Manual Order
            </button>
            <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <label className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
              <input
                value={orderSearch}
                onChange={(event) => setOrderSearch(event.target.value)}
                placeholder="Search orders..."
                className="w-full rounded-full border border-ink/15 bg-paper py-3 pl-11 pr-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </label>
            <select
              value={orderStageFilter}
              onChange={(event) => setOrderStageFilter(event.target.value)}
              className="rounded-full border border-ink/15 bg-paper px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            >
              <option value="all">All stages</option>
              {STAGES.map((stage, index) => (
                <option key={stage.label} value={String(index + 1)}>
                  Stage {index + 1} · {stage.label}
                </option>
              ))}
            </select>
            </div>
          </div>
        </div>

        <div className="grid gap-4 mb-8 md:grid-cols-4">
          <div className="rounded-[1.8rem] border border-ink/10 bg-paper p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Queued orders</p>
            <p className="mt-2 text-3xl font-display font-bold">{orderValues.length}</p>
          </div>
          <div className="rounded-[1.8rem] border border-ink/10 bg-paper p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">In production</p>
            <p className="mt-2 text-3xl font-display font-bold">
              {orderValues.filter((order: any) => (order.currentStage || 0) >= 2 && (order.currentStage || 0) < STAGES.length).length}
            </p>
          </div>
          <div className="rounded-[1.8rem] border border-ink/10 bg-paper p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Ready / shipped</p>
            <p className="mt-2 text-3xl font-display font-bold">
              {orderValues.filter((order: any) => (order.currentStage || 0) === STAGES.length).length}
            </p>
          </div>
          <div className="rounded-[1.8rem] border border-ink/10 bg-paper p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Revenue in queue</p>
            <p className="mt-2 text-3xl font-display font-bold">₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map((order: any) => (
            <div key={order.id} onClick={() => openOrder(order.id)} className="cursor-pointer rounded-3xl border border-ink/20 bg-paper p-6 shadow-sm transition hover:-translate-y-1 hover:border-ink hover:shadow-card relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-ink/5 group-hover:bg-accent transition-colors"></div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-xs font-bold text-ink/50">{order.orderNumber}</p>
                  <h3 className="mt-1 font-bold text-lg">{order.customerName}</h3>
                </div>
                <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${order.currentStage === STAGES.length ? 'bg-ink text-paper' : 'bg-accent/30 text-ink'}`}>
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
          {filteredOrders.length === 0 && (
            <div className="col-span-full py-12 text-center text-ink/50 border border-dashed border-ink/20 rounded-3xl">
              No orders match the current search or stage filter.
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

  const handleSaveProductEdit = (e: any) => {
    e.preventDefault();
    const normalizedProduct = {
      ...editingProduct,
      price: Number(editingProduct.price) || 0,
      stock: Number(editingProduct.stock) || 0,
      colors: typeof editingProduct.colors === 'string'
        ? editingProduct.colors.split(',').map((item: string) => item.trim()).filter(Boolean)
        : editingProduct.colors,
      materialOptions: typeof editingProduct.materialOptions === 'string'
        ? editingProduct.materialOptions.split(',').map((item: string) => item.trim()).filter(Boolean)
        : editingProduct.materialOptions,
      materials: typeof editingProduct.materials === 'string'
        ? editingProduct.materials.split(',').map((item: string) => item.trim()).filter(Boolean)
        : editingProduct.materials,
    };
    setLocalInventory((prev: any) => prev.map((p: any) => p.id === normalizedProduct.id ? normalizedProduct : p));
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

      <div className="grid gap-4 mb-8 md:grid-cols-4">
        <div className="rounded-[1.8rem] border border-ink/10 bg-paper p-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Total SKUs</p>
          <p className="mt-2 text-3xl font-display font-bold">{inventoryList.length}</p>
        </div>
        <div className="rounded-[1.8rem] border border-ink/10 bg-paper p-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Active</p>
          <p className="mt-2 text-3xl font-display font-bold">{inventoryList.filter((item: any) => item.adminStatus === 'active').length}</p>
        </div>
        <div className="rounded-[1.8rem] border border-ink/10 bg-paper p-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Experimental</p>
          <p className="mt-2 text-3xl font-display font-bold">{experimentalCount}</p>
        </div>
        <div className="rounded-[1.8rem] border border-ink/10 bg-[#fff4e8] p-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Low stock</p>
          <p className="mt-2 text-3xl font-display font-bold">{lowStockCount}</p>
        </div>
      </div>

      <div className="mb-6 grid gap-3 lg:grid-cols-[1fr_220px]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
          <input
            value={inventorySearch}
            onChange={(event) => setInventorySearch(event.target.value)}
            placeholder="Search by product, SKU, or family..."
            className="w-full rounded-full border border-ink/15 bg-paper py-3 pl-11 pr-4 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>
        <select
          value={inventoryStatusFilter}
          onChange={(event) => setInventoryStatusFilter(event.target.value)}
          className="rounded-full border border-ink/15 bg-paper px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="experimental">Experimental</option>
          <option value="limited">Limited drops</option>
          <option value="low-stock">Low stock</option>
        </select>
      </div>
      
      <div className="rounded-3xl border border-ink bg-paper shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink/5 text-xs uppercase tracking-widest text-ink/50">
            <tr>
              <th className="px-6 py-4 font-bold">Product</th>
              <th className="px-6 py-4 font-bold">SKU</th>
              <th className="px-6 py-4 font-bold">Family</th>
              <th className="px-6 py-4 font-bold">Price</th>
              <th className="px-6 py-4 font-bold">Stock</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {filteredInventory.map((p: any, i: number) => (
              <tr key={i} className="hover:bg-ink/5 transition-colors">
                <td className="px-6 py-4 font-medium flex items-center gap-3">
                  {p.gallery?.[0]?.image ? (
                    <Image src={p.gallery[0].image} width={40} height={40} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg border border-ink/10 bg-[#f4f1ea]" />
                  )}
                  {p.name}
                </td>
                <td className="px-6 py-4 font-mono text-xs">{p.sku || 'No SKU'}</td>
                <td className="px-6 py-4 text-ink/65">{p.family || 'Unassigned'}</td>
                <td className="px-6 py-4 font-mono">₹{p.price}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${(p.stock ?? 0) <= 5 ? 'bg-[#fff1e4] text-[#9a4f1e]' : 'bg-[#eef6ea] text-[#43733c]'}`}>
                    {p.stock ?? 0} units
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${p.adminStatus === 'experimental' ? 'bg-[#eef0ff] text-[#4859a5]' : p.adminStatus === 'draft' ? 'bg-[#f0f0f0] text-[#666]' : 'bg-lime-100 text-lime-800'}`}>
                      {p.adminStatus || 'active'}
                    </span>
                    {p.limitedDrop ? (
                      <span className="rounded-full bg-orange-100 px-2 py-1 text-[10px] font-bold uppercase text-orange-800">
                        Limited
                      </span>
                    ) : null}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => setEditingProduct(p)} className="text-xs font-bold uppercase tracking-widest text-ink/50 hover:text-ink transition">Edit Details</button>
                </td>
              </tr>
            ))}
            {filteredInventory.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-ink/50">
                  No products match the current inventory search.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

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
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">SKU</label>
                  <input type="text" value={editingProduct.sku || ''} onChange={e => setEditingProduct({...editingProduct, sku: e.target.value})} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Price (₹)</label>
                  <input type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Stock</label>
                  <input type="number" value={editingProduct.stock ?? 0} onChange={e => setEditingProduct({...editingProduct, stock: Number(e.target.value)})} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none" required />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Label</label>
                  <input type="text" value={editingProduct.label || ''} onChange={e => setEditingProduct({...editingProduct, label: e.target.value})} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Family</label>
                  <input type="text" value={editingProduct.family || ''} onChange={e => setEditingProduct({...editingProduct, family: e.target.value})} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none" />
                </div>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Admin Status</label>
                  <select value={editingProduct.adminStatus || 'active'} onChange={e => setEditingProduct({...editingProduct, adminStatus: e.target.value})} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none">
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="experimental">Experimental</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Colors</label>
                  <input type="text" value={Array.isArray(editingProduct.colors) ? editingProduct.colors.join(', ') : editingProduct.colors || ''} onChange={e => setEditingProduct({...editingProduct, colors: e.target.value})} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Materials</label>
                  <input type="text" value={Array.isArray(editingProduct.materials) ? editingProduct.materials.join(', ') : editingProduct.materials || ''} onChange={e => setEditingProduct({...editingProduct, materials: e.target.value})} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Material Options</label>
                  <input type="text" value={Array.isArray(editingProduct.materialOptions) ? editingProduct.materialOptions.join(', ') : editingProduct.materialOptions || ''} onChange={e => setEditingProduct({...editingProduct, materialOptions: e.target.value})} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Description</label>
                <textarea value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none min-h-[80px]" required />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Story / Lore</label>
                <textarea value={editingProduct.story || ''} onChange={e => setEditingProduct({...editingProduct, story: e.target.value})} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none min-h-[100px]" />
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
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="font-display text-3xl font-bold mb-4">Customers (CRM)</h2>
        <p className="text-ink/60 mb-8">View lifetime value, contact info, and notes for all buyers.</p>

        <div className="grid gap-4 mb-8 md:grid-cols-3">
          <div className="rounded-[1.8rem] border border-ink/10 bg-paper p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Customers</p>
            <p className="mt-2 text-3xl font-display font-bold">{customerList.length}</p>
          </div>
          <div className="rounded-[1.8rem] border border-ink/10 bg-paper p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Repeat buyers</p>
            <p className="mt-2 text-3xl font-display font-bold">{repeatCustomers}</p>
          </div>
          <div className="rounded-[1.8rem] border border-ink/10 bg-paper p-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Average customer spend</p>
            <p className="mt-2 text-3xl font-display font-bold">
              ₹{customerList.length ? Math.round(totalRevenue / customerList.length).toLocaleString('en-IN') : 0}
            </p>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {customerList.map((c: any, i: number) => {
            const key = c.email || c.name;
            const meta = customerNotes[key] || { notes: '', tags: '' };
            return (
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
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-ink/40">
                  {c.orders > 1 ? 'Repeat buyer' : 'First-time buyer'} · Last order {c.lastOrderDate || 'Unknown'}
                </p>

                {/* Tags */}
                {meta.tags && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {meta.tags.split(',').filter(Boolean).map((t: string) => (
                      <span key={t} className="rounded-full bg-accent/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink/60">{t.trim()}</span>
                    ))}
                  </div>
                )}

                {/* Admin Notes */}
                <div className="mt-4 pt-4 border-t border-ink/10 space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-ink/40">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={meta.tags}
                    onChange={e => setCustomerNotes(prev => ({ ...prev, [key]: { ...meta, tags: e.target.value } }))}
                    placeholder="instagram, commission client, repeat"
                    className="w-full rounded-xl border border-ink/10 bg-[#f6f3ee] px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-accent"
                  />
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-ink/40">Private Notes</label>
                  <textarea
                    value={meta.notes}
                    onChange={e => setCustomerNotes(prev => ({ ...prev, [key]: { ...meta, notes: e.target.value } }))}
                    placeholder="Internal notes..."
                    rows={2}
                    className="w-full rounded-xl border border-ink/10 bg-[#f6f3ee] px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-accent resize-none"
                  />
                </div>
              </div>
            );
          })}
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

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-ink bg-paper p-8 shadow-sm">
            <h3 className="font-bold mb-2">Support Email</h3>
            <p className="text-xs text-ink/50 mb-4">Primary contact shown in operations and support copy.</p>
            <input 
              type="email" 
              value={localSettings.supportEmail || ''}
              onChange={(e) => setLocalSettings(s => ({ ...s, supportEmail: e.target.value }))}
              placeholder="hello@bedroomstudios.store" 
              className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none" 
            />
          </div>

          <div className="rounded-3xl border border-ink bg-paper p-8 shadow-sm">
            <h3 className="font-bold mb-2">Shipping Lead Time</h3>
            <p className="text-xs text-ink/50 mb-4">Useful for banners, customer chat, and future storefront messaging.</p>
            <input 
              type="text" 
              value={localSettings.shippingLeadTime || ''}
              onChange={(e) => setLocalSettings(s => ({ ...s, shippingLeadTime: e.target.value }))}
              placeholder="Ships in 4-7 days" 
              className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none" 
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-ink bg-paper p-8 shadow-sm">
            <h3 className="font-bold mb-2">Featured Family</h3>
            <p className="text-xs text-ink/50 mb-4">A merchandiser-friendly field for what the store should currently push.</p>
            <input 
              type="text" 
              value={localSettings.featuredFamily || ''}
              onChange={(e) => setLocalSettings(s => ({ ...s, featuredFamily: e.target.value }))}
              placeholder="Hybrid Builds" 
              className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none" 
            />
          </div>

          <div className="rounded-3xl border border-ink bg-paper p-8 shadow-sm">
            <h3 className="font-bold mb-2">Material Focus</h3>
            <p className="text-xs text-ink/50 mb-4">Helps define current launch language and editorial direction.</p>
            <input 
              type="text" 
              value={localSettings.featuredMaterialFocus || ''}
              onChange={(e) => setLocalSettings(s => ({ ...s, featuredMaterialFocus: e.target.value }))}
              placeholder="Cast cement + PLA+" 
              className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none" 
            />
          </div>
        </div>

        <div className="rounded-3xl border border-ink bg-paper p-8 shadow-sm">
          <h3 className="font-bold mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Bedroom Labs Notice</h3>
          <p className="text-xs text-ink/50 mb-4">Admin-facing note for how the experimental area should be positioned.</p>
          <textarea
            value={localSettings.experimentalNotice || ''}
            onChange={(e) => setLocalSettings(s => ({ ...s, experimentalNotice: e.target.value }))}
            className="w-full rounded-xl border border-ink/20 bg-white px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none min-h-[100px]"
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
            { id: 'commissions', icon: MessageCircle, label: 'Commissions' },
            { id: 'inventory', icon: Package, label: 'Inventory' },
            { id: 'supplies', icon: Wrench, label: 'Materials' },
            { id: 'crm', icon: Users, label: 'Customers' },
            { id: 'costcalc', icon: Calculator, label: 'Cost Calc' },
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

      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && renderDashboardTab()}
          {activeTab === 'orders' && renderOrdersTab()}
          {activeTab === 'commissions' && <CommissionsTab />}
          {activeTab === 'inventory' && renderInventoryTab()}
          {activeTab === 'supplies' && <SuppliesTab />}
          {activeTab === 'crm' && renderCRMTab()}
          {activeTab === 'costcalc' && <CostCalculatorTab />}
          {activeTab === 'settings' && renderSettingsTab()}
        </div>
      </main>

      {/* Create Order Modal */}
      {showCreateOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-lg rounded-[2.5rem] bg-paper p-8 shadow-card relative"
          >
            <button onClick={() => setShowCreateOrder(false)} className="absolute top-6 right-6 text-ink/40 hover:text-ink">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display text-2xl font-bold mb-2">New Manual Order</h3>
            <p className="text-sm text-ink/55 mb-6">Log an order from Instagram, WhatsApp, UPI, or any offline channel.</p>
            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Customer Name *</label>
                  <input required type="text" value={newOrder.customerName} onChange={e => setNewOrder(p => ({ ...p, customerName: e.target.value }))} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-accent" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Phone (for WhatsApp)</label>
                  <input type="tel" value={newOrder.phone} onChange={e => setNewOrder(p => ({ ...p, phone: e.target.value }))} placeholder="10-digit" className="w-full rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-accent" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Email</label>
                  <input type="email" value={newOrder.email} onChange={e => setNewOrder(p => ({ ...p, email: e.target.value }))} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-accent" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Amount (₹) *</label>
                  <input required type="number" value={newOrder.total} onChange={e => setNewOrder(p => ({ ...p, total: e.target.value }))} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-sm font-mono outline-none focus:ring-1 focus:ring-accent" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Product *</label>
                  <input required type="text" value={newOrder.productName} onChange={e => setNewOrder(p => ({ ...p, productName: e.target.value }))} placeholder="e.g. Halo Lamp" className="w-full rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-accent" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Material</label>
                  <input type="text" value={newOrder.material} onChange={e => setNewOrder(p => ({ ...p, material: e.target.value }))} placeholder="e.g. Cast cement + PLA+" className="w-full rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-accent" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Notes / Source</label>
                <input type="text" value={newOrder.notes} onChange={e => setNewOrder(p => ({ ...p, notes: e.target.value }))} placeholder="e.g. Paid via UPI on Instagram DM" className="w-full rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-accent" />
              </div>
              <button type="submit" className="w-full rounded-xl bg-ink py-4 text-sm font-bold uppercase tracking-widest text-paper hover:bg-accent transition mt-2">
                Create Order
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
