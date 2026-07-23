"use client";
// @ts-nocheck
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import {
  Package, MapPin, Heart, User, LogOut, ChevronRight, ChevronDown,
  MessageCircle, Send, Loader2, Plus, Pencil, Trash2, Star,
  ShieldCheck, Printer, Hammer, Inbox, Cog, CheckCircle
} from 'lucide-react';

const STAGES = [
  { label: 'Order Received', icon: Inbox },
  { label: 'Files Prep', icon: Cog },
  { label: 'Printing', icon: Printer },
  { label: 'Post-Processing', icon: Hammer },
  { label: 'Quality Check', icon: ShieldCheck },
  { label: 'Shipped', icon: Package },
];

const TABS = [
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'profile', label: 'Profile', icon: User },
];

// ─── Order Tracker ────────────────────────────────────────────────────────────
function OrderTracker({ order, onClose }) {
  const { user } = useAuth();
  const [comments, setComments] = useState(order.comments || []);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setIsSending(true);
    const optimistic = { text: newMessage, author: order.customerName, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) };
    setComments((c) => [...c, optimistic]);
    setNewMessage('');
    try {
      await fetch('/api/account/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id, message: optimistic.text })
      });
    } catch {}
    setIsSending(false);
  };

  return (
    <div className="mt-6 rounded-3xl border border-ink/10 bg-paper p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-mono text-xs text-ink/40">{order.orderNumber}</p>
          <h3 className="font-display text-xl font-bold mt-0.5">{order.productName}</h3>
        </div>
        <button onClick={onClose} className="rounded-full border border-ink/15 px-3 py-1.5 text-xs font-bold uppercase tracking-widest hover:bg-ink hover:text-paper transition">Close</button>
      </div>

      {/* Stage Progress */}
      <div className="relative pl-6 before:absolute before:bottom-0 before:left-[11px] before:top-2 before:w-[2px] before:bg-ink/10 mb-8">
        {STAGES.map((stage, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum <= order.currentStage;
          const isCurrent = stepNum === order.currentStage;
          const photos = order.uploadedPhotos?.[index];
          const photoArr = Array.isArray(photos) ? photos : (photos ? [photos] : []);
          return (
            <div key={stage.label} className={`relative mb-6 transition-opacity ${isCompleted ? 'opacity-100' : 'opacity-35'}`}>
              <div className={`absolute -left-[30px] flex h-4 w-4 items-center justify-center rounded-full border-2 bg-paper ${isCompleted ? 'border-accent' : 'border-ink/20'} ${isCurrent ? 'ring-4 ring-accent/20 scale-125' : ''}`} />
              <div className="flex items-center gap-2">
                <div className="text-ink/60 flex items-center justify-center p-1 rounded-full bg-ink/5 border border-ink/10">
                  <stage.icon className="w-3.5 h-3.5" />
                </div>
                <span className={`text-sm font-bold ${isCurrent ? 'text-accent' : ''}`}>{stage.label}</span>
                {isCurrent && <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink">Current</span>}
              </div>
              {isCompleted && photoArr.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 ml-6">
                  {photoArr.map((url, i) => (
                    <img key={i} src={url} alt="Build progress" className="h-20 w-20 rounded-xl object-cover border border-ink/10" />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Workshop Chat */}
      <div className="border-t border-ink/10 pt-6">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-ink/50 mb-4">Workshop Chat</h4>
        <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
          {comments.length === 0 && (
            <p className="text-sm text-ink/40 text-center py-4">No messages yet. Ask us anything!</p>
          )}
          {comments.map((c: any, i: number) => {
            const isAdmin = c.author === 'Admin';
            return (
              <div key={i} className={`flex ${isAdmin ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${isAdmin ? 'bg-ink/8 rounded-tl-none' : 'bg-ink text-paper rounded-tr-none'}`}>
                  <p>{c.text}</p>
                  <span className="mt-1 block text-[10px] opacity-50 font-mono">{c.time} · {isAdmin ? 'Bedroom Studios' : 'You'}</span>
                </div>
              </div>
            );
          })}
        </div>
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask about your build..."
            className="flex-1 rounded-full border border-ink/15 bg-ink/5 px-4 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition"
          />
          <button type="submit" disabled={isSending || !newMessage.trim()} className="rounded-full bg-accent px-4 py-2 text-sm font-bold disabled:opacity-40 hover:scale-105 transition">
            {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AccountPage() {
  const { user, profile, isLoading: authLoading, signOut, refreshProfile } = useAuth();
  const { wishlistIds, setWishlistIds } = useCart();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Profile edit state
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ fullName: '', phone: '' });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Address form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({ fullName: '', phone: '', streetAddress: '', city: '', state: '', pincode: '', isDefault: false });
  const [isSavingAddress, setIsSavingAddress] = useState(false);

  // Chat
  const [chatOrderId, setChatOrderId] = useState(null);

  useEffect(() => {
    if (profile) {
      setProfileForm({ fullName: profile.fullName || '', phone: profile.phone || '' });
    }
  }, [profile]);

  const fetchOrders = useCallback(async () => {
    setIsDataLoading(true);
    try {
      const res = await fetch('/api/account/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } finally {
      setIsDataLoading(false);
    }
  }, []);

  const fetchAddresses = useCallback(async () => {
    const res = await fetch('/api/account/addresses');
    if (res.ok) {
      const data = await res.json();
      setAddresses(data.addresses || []);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && user) {
      fetchOrders();
      fetchAddresses();
    }
  }, [authLoading, user, fetchOrders, fetchAddresses]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    await fetch('/api/account/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileForm)
    });
    await refreshProfile();
    setEditingProfile(false);
    setIsSavingProfile(false);
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setIsSavingAddress(true);
    await fetch('/api/account/addresses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addressForm)
    });
    await fetchAddresses();
    setShowAddressForm(false);
    setAddressForm({ fullName: '', phone: '', streetAddress: '', city: '', state: '', pincode: '', isDefault: false });
    setIsSavingAddress(false);
  };

  const handleDeleteAddress = async (id) => {
    await fetch('/api/account/addresses', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    await fetchAddresses();
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-ink/30" />
      </div>
    );
  }

  const initials = profile?.fullName ? profile.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : user?.email?.[0]?.toUpperCase() || '?';

  return (
    <div className="min-h-screen bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper font-display text-xl font-bold">
              {initials}
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">{profile?.fullName || 'My Account'}</h1>
              <p className="text-sm text-ink/50">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm text-ink/60 hover:border-red-300 hover:text-red-500 transition"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-1 rounded-2xl border border-ink/10 bg-ink/3 p-1 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 min-w-max items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${activeTab === tab.id ? 'bg-paper shadow-sm text-ink' : 'text-ink/50 hover:text-ink'}`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ─── ORDERS TAB ─────────────────────────────────────────────── */}
        {activeTab === 'orders' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            {isDataLoading ? (
              <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-ink/30" /></div>
            ) : orders.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-ink/15 py-16 text-center">
                <Package className="mx-auto mb-3 h-10 w-10 text-ink/20" />
                <p className="font-bold text-ink/50">No orders yet</p>
                <p className="mt-1 text-sm text-ink/35">When you place an order, it'll appear here with live build tracking.</p>
                <a href="/shop" className="mt-4 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-paper hover:bg-accent hover:text-ink transition">Browse the shop</a>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order: any) => (
                  <div key={order.id} className="rounded-3xl border border-ink/10 bg-paper shadow-sm overflow-hidden">
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      className="w-full flex items-center justify-between p-6 hover:bg-ink/3 transition text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${order.currentStage >= 6 ? 'bg-green-100 text-green-700' : 'bg-accent/20 text-ink'}`}>
                          {order.currentStage >= 6 ? <CheckCircle className="h-5 w-5" /> : `${order.currentStage}/6`}
                        </div>
                        <div>
                          <p className="font-mono text-xs text-ink/40">{order.orderNumber}</p>
                          <p className="font-bold">{order.productName}</p>
                          <p className="text-xs text-ink/50">{order.date} · ₹{order.total?.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${order.currentStage >= 6 ? 'bg-green-100 text-green-700' : 'bg-accent/20 text-ink'}`}>
                          {STAGES[order.currentStage - 1]?.label || 'Processing'}
                        </span>
                        {expandedOrder === order.id ? <ChevronDown className="h-4 w-4 text-ink/40" /> : <ChevronRight className="h-4 w-4 text-ink/40" />}
                      </div>
                    </button>

                    {expandedOrder === order.id && (
                      <div className="px-6 pb-6">
                        <OrderTracker order={order} onClose={() => setExpandedOrder(null)} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── ADDRESSES TAB ─────────────────────────────────────────────── */}
        {activeTab === 'addresses' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold">Saved Addresses</h2>
              <button onClick={() => setShowAddressForm(true)} className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold hover:bg-ink hover:text-paper transition">
                <Plus className="h-4 w-4" /> Add New
              </button>
            </div>

            {showAddressForm && (
              <form onSubmit={handleSaveAddress} className="mb-6 rounded-3xl border border-ink/15 bg-ink/3 p-6 space-y-4">
                <h3 className="font-bold">New Address</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><label className="block text-xs font-bold uppercase tracking-widest text-ink/45 mb-1.5">Full Name</label><input required value={addressForm.fullName} onChange={(e) => setAddressForm(p => ({...p, fullName: e.target.value}))} className="w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent transition" /></div>
                  <div><label className="block text-xs font-bold uppercase tracking-widest text-ink/45 mb-1.5">Phone</label><input required value={addressForm.phone} onChange={(e) => setAddressForm(p => ({...p, phone: e.target.value}))} className="w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent transition" /></div>
                </div>
                <div><label className="block text-xs font-bold uppercase tracking-widest text-ink/45 mb-1.5">Street Address</label><input required value={addressForm.streetAddress} onChange={(e) => setAddressForm(p => ({...p, streetAddress: e.target.value}))} className="w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent transition" /></div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div><label className="block text-xs font-bold uppercase tracking-widest text-ink/45 mb-1.5">City</label><input required value={addressForm.city} onChange={(e) => setAddressForm(p => ({...p, city: e.target.value}))} className="w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent transition" /></div>
                  <div><label className="block text-xs font-bold uppercase tracking-widest text-ink/45 mb-1.5">State</label><input required value={addressForm.state} onChange={(e) => setAddressForm(p => ({...p, state: e.target.value}))} className="w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent transition" /></div>
                  <div><label className="block text-xs font-bold uppercase tracking-widest text-ink/45 mb-1.5">Pincode</label><input required value={addressForm.pincode} onChange={(e) => setAddressForm(p => ({...p, pincode: e.target.value}))} className="w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent transition" /></div>
                </div>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={addressForm.isDefault} onChange={(e) => setAddressForm(p => ({...p, isDefault: e.target.checked}))} className="rounded" />
                  Set as default address
                </label>
                <div className="flex gap-3">
                  <button type="submit" disabled={isSavingAddress} className="rounded-full bg-ink px-5 py-2 text-sm font-bold text-paper hover:bg-accent hover:text-ink transition disabled:opacity-50">
                    {isSavingAddress ? 'Saving...' : 'Save Address'}
                  </button>
                  <button type="button" onClick={() => setShowAddressForm(false)} className="rounded-full border border-ink/15 px-5 py-2 text-sm font-medium hover:bg-ink/5 transition">Cancel</button>
                </div>
              </form>
            )}

            {addresses.length === 0 && !showAddressForm ? (
              <div className="rounded-3xl border border-dashed border-ink/15 py-16 text-center">
                <MapPin className="mx-auto mb-3 h-10 w-10 text-ink/20" />
                <p className="font-bold text-ink/50">No saved addresses</p>
                <p className="mt-1 text-sm text-ink/35">Add an address to speed up checkout.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {addresses.map((addr: any) => (
                  <div key={addr.id} className="rounded-3xl border border-ink/10 bg-paper p-5 relative">
                    {addr.isDefault && <span className="absolute right-4 top-4 rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink flex items-center gap-1"><Star className="h-3 w-3" /> Default</span>}
                    <p className="font-bold">{addr.fullName}</p>
                    <p className="text-sm text-ink/60 mt-1">{addr.streetAddress}</p>
                    <p className="text-sm text-ink/60">{addr.city}, {addr.state} — {addr.pincode}</p>
                    <p className="text-sm text-ink/60 mt-1">{addr.phone}</p>
                    <div className="mt-4 flex gap-2">
                      <button onClick={() => handleDeleteAddress(addr.id)} className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 transition">
                        <Trash2 className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── WISHLIST TAB ─────────────────────────────────────────────── */}
        {activeTab === 'wishlist' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="font-display text-2xl font-bold mb-6">Saved Items</h2>
            {wishlistIds.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-ink/15 py-16 text-center">
                <Heart className="mx-auto mb-3 h-10 w-10 text-ink/20" />
                <p className="font-bold text-ink/50">Your wishlist is empty</p>
                <a href="/shop" className="mt-4 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-paper hover:bg-accent hover:text-ink transition">Explore the shop</a>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {wishlistIds.map((id: string) => (
                  <a key={id} href={`/product/${id}`} className="group rounded-3xl border border-ink/10 bg-paper p-5 hover:border-ink hover:-translate-y-1 transition-all">
                    <div className="h-32 rounded-2xl bg-ink/5 mb-4 flex items-center justify-center">
                      <Heart className="h-8 w-8 text-ink/20 group-hover:text-accent transition" />
                    </div>
                    <p className="font-mono text-xs text-ink/40">{id}</p>
                    <p className="font-bold mt-1">Saved Item</p>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── PROFILE TAB ─────────────────────────────────────────────── */}
        {activeTab === 'profile' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-lg">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold">Profile Settings</h2>
              {!editingProfile && (
                <button onClick={() => setEditingProfile(true)} className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium hover:bg-ink hover:text-paper transition">
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
              )}
            </div>

            <div className="rounded-3xl border border-ink/10 bg-paper p-6">
              {editingProfile ? (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-ink/45 mb-1.5">Full Name</label>
                    <input value={profileForm.fullName} onChange={(e) => setProfileForm(p => ({...p, fullName: e.target.value}))} className="w-full rounded-xl border border-ink/15 bg-white/60 px-4 py-3 text-sm outline-none focus:border-accent transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-ink/45 mb-1.5">Phone</label>
                    <input value={profileForm.phone} onChange={(e) => setProfileForm(p => ({...p, phone: e.target.value}))} className="w-full rounded-xl border border-ink/15 bg-white/60 px-4 py-3 text-sm outline-none focus:border-accent transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-ink/45 mb-1.5">Email</label>
                    <input value={user?.email || ''} disabled className="w-full rounded-xl border border-ink/10 bg-ink/5 px-4 py-3 text-sm text-ink/40 cursor-not-allowed" />
                    <p className="mt-1 text-xs text-ink/35">Email cannot be changed here.</p>
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" disabled={isSavingProfile} className="rounded-full bg-ink px-5 py-2 text-sm font-bold text-paper hover:bg-accent hover:text-ink transition disabled:opacity-50">
                      {isSavingProfile ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button type="button" onClick={() => setEditingProfile(false)} className="rounded-full border border-ink/15 px-5 py-2 text-sm font-medium hover:bg-ink/5 transition">Cancel</button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  {[
                    { label: 'Full Name', value: profile?.fullName || '—' },
                    { label: 'Phone', value: profile?.phone || '—' },
                    { label: 'Email', value: user?.email || '—' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-start py-3 border-b border-ink/8 last:border-0">
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-ink/45">{label}</span>
                      <span className="text-sm font-medium text-right">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 rounded-3xl border border-red-100 p-5">
              <p className="font-bold text-sm text-red-600 mb-1">Danger Zone</p>
              <p className="text-xs text-ink/50 mb-3">Signing out will clear your local session.</p>
              <button onClick={handleSignOut} className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 transition">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
