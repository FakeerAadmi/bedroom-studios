import React, { useState, useEffect } from 'react';
import { Plus, Wrench, Search, AlertTriangle, Edit2, Trash2, Check, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['Filament', 'Resin', 'Tool', 'Hardware', 'Packaging', 'Other'];
const FILAMENT_BRANDS = [
  'Numakers',
  'Flashforge',
  'eSun',
  'Sunlu',
  'Creality',
  'Anycubic',
  'Polymaker',
  '3D Idea',
  'Wol3D',
  'Elegoo',
  'Generic',
];
const UNITS = ['kg', 'g', 'pieces', 'meters', 'ml', 'liters', 'spools'];

export default function SuppliesTab() {
  const [supplies, setSupplies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Filament',
    brand: '',
    quantity: 1,
    unit: 'kg',
    threshold: 1,
    cost: 0,
    notes: ''
  });

  const fetchSupplies = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/supplies');
      const data = await res.json();
      setSupplies(data.supplies || []);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSupplies();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await fetch('/api/admin/supplies', {
          method: 'PUT',
          body: JSON.stringify({ ...formData, id: editingItem.id }),
        });
      } else {
        await fetch('/api/admin/supplies', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setShowModal(false);
      setEditingItem(null);
      fetchSupplies();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await fetch(`/api/admin/supplies?id=${id}`, { method: 'DELETE' });
      fetchSupplies();
    } catch (e) {
      console.error(e);
    }
  };

  const handleQuickAdjust = async (id: string, currentQty: number, adjustment: number) => {
    const newQty = Math.max(0, currentQty + adjustment);
    try {
      await fetch('/api/admin/supplies', {
        method: 'PUT',
        body: JSON.stringify({ id, quantity: newQty }),
      });
      setSupplies((prev) =>
        prev.map((s) => (s.id === id ? { ...s, quantity: newQty } : s))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const openAddModal = () => {
    setFormData({
      name: '',
      category: 'Filament',
      brand: 'Numakers',
      quantity: 1,
      unit: 'kg',
      threshold: 0.5,
      cost: 0,
      notes: ''
    });
    setEditingItem(null);
    setShowModal(true);
  };

  const openEditModal = (item: any) => {
    setFormData({ ...item });
    setEditingItem(item);
    setShowModal(true);
  };

  const filteredSupplies = supplies.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || (s.brand || '').toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = supplies.filter(s => s.quantity <= s.threshold);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 mb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold flex items-center gap-3">
            <Wrench className="w-8 h-8" />
            Materials & Tools
          </h2>
          <p className="mt-2 text-sm text-ink/60">Manage your filaments, resin, spare parts, and workshop inventory.</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-ink hover:bg-ink hover:text-paper transition"
        >
          <Plus className="w-3.5 h-3.5" /> Add Supply
        </button>
      </div>

      <div className="grid gap-4 mb-8 md:grid-cols-3">
        <div className="rounded-[1.8rem] border border-ink/10 bg-paper p-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Total Items</p>
          <p className="mt-2 text-3xl font-display font-bold">{supplies.length}</p>
        </div>
        <div className="rounded-[1.8rem] border border-[#ff4e4e]/20 bg-[#ff4e4e]/5 p-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#ff4e4e]/80">Low Stock / Reorder</p>
          <p className="mt-2 text-3xl font-display font-bold text-[#ff4e4e]">{lowStockItems.length}</p>
        </div>
        <div className="rounded-[1.8rem] border border-ink/10 bg-paper p-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink/45">Inventory Value</p>
          <p className="mt-2 text-3xl font-display font-bold">
            ₹{supplies.reduce((acc, curr) => acc + ((curr.cost || 0) * curr.quantity), 0).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-ink bg-paper p-8 shadow-card">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
            <input
              type="text"
              placeholder="Search inventory..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-ink/20 bg-white py-2.5 pl-11 pr-4 text-sm outline-none focus:border-ink focus:ring-1 focus:ring-ink"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-full border border-ink/20 bg-white px-4 py-2.5 text-sm font-bold outline-none focus:border-ink"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-ink/40 text-sm">Loading inventory...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink/5 text-xs uppercase tracking-widest text-ink/50">
                <tr>
                  <th className="px-6 py-4 font-bold">Item</th>
                  <th className="px-6 py-4 font-bold">Category</th>
                  <th className="px-6 py-4 font-bold">Stock</th>
                  <th className="px-6 py-4 font-bold">Unit Cost</th>
                  <th className="px-6 py-4 font-bold text-right">Adjust</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {filteredSupplies.map((item) => (
                  <tr key={item.id} className="hover:bg-ink/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {item.quantity <= item.threshold && (
                          <AlertTriangle className="w-4 h-4 text-[#ff4e4e]" />
                        )}
                        <div>
                          <p className="font-bold">{item.name}</p>
                          {item.brand && <p className="text-xs text-ink/50 mt-0.5">{item.brand}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-ink/5 border border-ink/10 px-2.5 py-1 text-[10px] font-bold uppercase">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={`font-mono text-base ${item.quantity <= item.threshold ? 'text-[#ff4e4e] font-bold' : ''}`}>
                          {item.quantity} {item.unit}
                        </span>
                        <span className="text-[10px] text-ink/40 uppercase tracking-widest">
                          Min: {item.threshold}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono">
                      ₹{item.cost || 0}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleQuickAdjust(item.id, item.quantity, -1)} className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-paper transition" title="Consume 1">
                          -
                        </button>
                        <button onClick={() => handleQuickAdjust(item.id, item.quantity, 1)} className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-paper transition" title="Add 1">
                          +
                        </button>
                        <button onClick={() => openEditModal(item)} className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-paper transition ml-2">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredSupplies.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-ink/50">
                      No inventory items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg overflow-y-auto max-h-[90vh] rounded-[2.5rem] bg-paper p-8 shadow-card relative"
            >
              <h3 className="font-display text-2xl font-bold mb-6">{editingItem ? 'Edit Supply' : 'Add Supply'}</h3>
              <form onSubmit={handleSave} className="space-y-4">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Item Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-accent" placeholder="e.g. PLA+ Matte Black" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Category</label>
                    <select value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-accent">
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {formData.category === 'Filament' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Brand</label>
                    <select value={formData.brand} onChange={e => setFormData(p => ({ ...p, brand: e.target.value }))} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-accent">
                      <option value="">Select Brand</option>
                      {FILAMENT_BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Quantity</label>
                    <input required type="number" step="0.1" value={formData.quantity} onChange={e => setFormData(p => ({ ...p, quantity: Number(e.target.value) }))} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-sm font-mono outline-none focus:ring-1 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Unit</label>
                    <select value={formData.unit} onChange={e => setFormData(p => ({ ...p, unit: e.target.value }))} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-accent">
                      {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Alert Threshold</label>
                    <input required type="number" step="0.1" value={formData.threshold} onChange={e => setFormData(p => ({ ...p, threshold: Number(e.target.value) }))} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-sm font-mono outline-none focus:ring-1 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Cost per unit (₹)</label>
                    <input type="number" value={formData.cost} onChange={e => setFormData(p => ({ ...p, cost: Number(e.target.value) }))} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-sm font-mono outline-none focus:ring-1 focus:ring-accent" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-ink/50 mb-1">Notes / Storage Location</label>
                  <input type="text" value={formData.notes} onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))} className="w-full rounded-xl border border-ink/20 bg-white px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-accent" />
                </div>

                <div className="flex gap-4 pt-6">
                  {editingItem && (
                    <button type="button" onClick={() => { handleDelete(editingItem.id); setShowModal(false); }} className="px-4 py-3 text-[#ff4e4e] border border-[#ff4e4e]/30 rounded-xl hover:bg-[#ff4e4e]/10 transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 rounded-xl bg-ink/5 py-4 text-sm font-bold uppercase tracking-widest text-ink hover:bg-ink/10 transition">
                    Cancel
                  </button>
                  <button type="submit" className="flex-[2] rounded-xl bg-ink py-4 text-sm font-bold uppercase tracking-widest text-paper hover:bg-accent transition">
                    {editingItem ? 'Save Changes' : 'Add Item'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
