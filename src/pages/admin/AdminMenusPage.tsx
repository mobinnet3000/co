import React, { useState, useEffect } from 'react';
import {
  Compass,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  AlertCircle,
  Link as LinkIcon,
  FolderPlus,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';

export const AdminMenusPage: React.FC = () => {
  const [menus, setMenus] = useState<any[]>([]);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const [selectedMenuData, setSelectedMenuData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Modals
  const [showMenuModal, setShowMenuModal] = useState<boolean>(false);
  const [menuForm, setMenuForm] = useState({ name: '', slug: '', location: 'header' });

  const [showItemModal, setShowItemModal] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [itemForm, setItemForm] = useState({
    title: '',
    url: '',
    parent_id: '',
    target: '_self',
    is_active: 1,
  });

  const loadMenus = async () => {
    try {
      setLoading(true);
      const res = await api.menus.getAll();
      if (res.success) {
        setMenus(res.data);
        if (res.data.length > 0 && !selectedMenuId) {
          setSelectedMenuId(res.data[0].id);
        }
      }
    } catch (err: any) {
      setError(err.message || 'خطا در بارگذاری منوها');
    } finally {
      setLoading(false);
    }
  };

  const loadMenuDetails = async (id: number) => {
    try {
      const res = await api.menus.getById(id);
      if (res.success) {
        setSelectedMenuData(res);
      }
    } catch (err: any) {
      setError(err.message || 'خطا در دریافت آیتم‌های منو');
    }
  };

  useEffect(() => {
    loadMenus();
  }, []);

  useEffect(() => {
    if (selectedMenuId) {
      loadMenuDetails(selectedMenuId);
    }
  }, [selectedMenuId]);

  const handleCreateMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.menus.create(menuForm);
      if (res.success) {
        setSuccess('منوی جدید ایجاد شد.');
        setShowMenuModal(false);
        setMenuForm({ name: '', slug: '', location: 'header' });
        await loadMenus();
        setSelectedMenuId(res.id);
      }
    } catch (err: any) {
      setError(err.message || 'خطا در ایجاد منو');
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMenuId) return;

    try {
      const payload = {
        title: itemForm.title,
        url: itemForm.url,
        parent_id: itemForm.parent_id ? Number(itemForm.parent_id) : null,
        target: itemForm.target,
        is_active: itemForm.is_active,
      };

      if (editingItemId) {
        await api.menus.updateItem(editingItemId, payload);
        setSuccess('آیتم بروزرسانی شد.');
      } else {
        await api.menus.addItem(selectedMenuId, payload);
        setSuccess('آیتم به منو اضافه شد.');
      }

      setShowItemModal(false);
      setEditingItemId(null);
      setItemForm({ title: '', url: '', parent_id: '', target: '_self', is_active: 1 });
      loadMenuDetails(selectedMenuId);
    } catch (err: any) {
      setError(err.message || 'خطا در ذخیره آیتم');
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    if (!confirm('آیا از حذف این آیتم منو مطمئن هستید؟')) return;
    try {
      await api.menus.deleteItem(itemId);
      setSuccess('آیتم حذف شد.');
      if (selectedMenuId) loadMenuDetails(selectedMenuId);
    } catch (err: any) {
      setError(err.message || 'خطا در حذف آیتم');
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (!selectedMenuData || !selectedMenuId) return;
    const items = [...selectedMenuData.itemsFlat];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    // Swap sort orders
    const temp = items[index];
    items[index] = items[targetIndex];
    items[targetIndex] = temp;

    const reordered = items.map((it, idx) => ({
      id: it.id,
      sort_order: idx,
      parent_id: it.parent_id,
    }));

    try {
      await api.menus.reorderItems(selectedMenuId, reordered);
      loadMenuDetails(selectedMenuId);
    } catch (err: any) {
      setError('خطا در تغییر ترتیب آیتم‌ها');
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-1">
              <span>مدیریت ساختار ناوبری</span>
              <span>/</span>
              <span className="text-[#EFA73F]">Navigation Menus</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-navy-950 flex items-center gap-3">
              <Compass className="w-8 h-8 text-[#EFA73F]" />
              مدیریت منوها و ناوبری سایت
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              مدیریت پیوندهای هدر، فوتر و چیدمان سلسله‌مراتبی لینک‌ها بدون نیاز به کدنویسی
            </p>
          </div>

          <button
            onClick={() => setShowMenuModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm shadow-sm transition-all"
          >
            <FolderPlus className="w-4 h-4 text-[#EFA73F]" />
            ایجاد منوی جدید
          </button>
        </div>

        {/* Notifications */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button onClick={() => setError('')} className="text-xs font-bold">بستن</button>
          </div>
        )}
        {success && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>{success}</span>
            </div>
            <button onClick={() => setSuccess('')} className="text-xs font-bold">بستن</button>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Menus Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <h3 className="font-extrabold text-navy-950 text-base mb-4 flex items-center gap-2">
                <span>فهرست منوهای سامانه</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 font-mono font-bold text-slate-600">
                  {menus.length}
                </span>
              </h3>

              <div className="space-y-2">
                {menus.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMenuId(m.id)}
                    className={`w-full text-right p-4 rounded-xl border transition-all flex items-center justify-between ${
                      selectedMenuId === m.id
                        ? 'bg-navy-950 text-white border-navy-950 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-navy-900 border-slate-200'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm block leading-snug">{m.name}</span>
                      <span className={`text-xs font-mono ${selectedMenuId === m.id ? 'text-slate-300' : 'text-slate-500'}`}>
                        {m.slug} ({m.location || 'عمومی'})
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-md font-mono font-bold ${
                      selectedMenuId === m.id ? 'bg-[#EFA73F] text-navy-950' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {m.item_count || 0} لینک
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items Editor (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-navy-950">
                    آیتم‌های منو: {selectedMenuData?.menu?.name || 'انتخاب نشده'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    پیوند یکتا: <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">{selectedMenuData?.menu?.slug}</code>
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingItemId(null);
                    setItemForm({ title: '', url: '', parent_id: '', target: '_self', is_active: 1 });
                    setShowItemModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#EFA73F] hover:bg-amber-500 text-navy-950 font-bold text-xs shadow-xs transition-all"
                >
                  <Plus className="w-4 h-4" />
                  افزودن لینک جدید
                </button>
              </div>

              {/* Items Table / List */}
              {selectedMenuData?.itemsFlat?.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                  <LinkIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm font-medium">هیچ آیتمی در این منو ثبت نشده است.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedMenuData?.itemsFlat?.map((item: any, idx: number) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-700 flex items-center justify-center font-mono text-xs font-bold">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="font-bold text-sm text-navy-950 block">{item.title}</span>
                          <span className="text-xs text-slate-500 font-mono" dir="ltr">
                            {item.url}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Sort buttons */}
                        <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMove(idx, 'up')}
                            className="p-1 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-30"
                            title="انتقال به بالا"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === selectedMenuData.itemsFlat.length - 1}
                            onClick={() => handleMove(idx, 'down')}
                            className="p-1 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-30"
                            title="انتقال به پایین"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Edit & Delete */}
                        <button
                          type="button"
                          onClick={() => {
                            setEditingItemId(item.id);
                            setItemForm({
                              title: item.title,
                              url: item.url,
                              parent_id: item.parent_id ? String(item.parent_id) : '',
                              target: item.target || '_self',
                              is_active: item.is_active,
                            });
                            setShowItemModal(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-navy-950 hover:bg-slate-200"
                          title="ویرایش"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal: Create Menu */}
        {showMenuModal && (
          <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
              <h3 className="font-bold text-lg text-navy-950">ایجاد منوی ناوبری جدید</h3>
              <form onSubmit={handleCreateMenu} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">نام نمایشی منو</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: منوی بالای صفحه"
                    value={menuForm.name}
                    onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-navy-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">پیوند یکتا (Slug لاتین)</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: header یا footer"
                    value={menuForm.slug}
                    onChange={(e) => setMenuForm({ ...menuForm, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:border-navy-900 focus:outline-none"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">موقعیت استقرار</label>
                  <select
                    value={menuForm.location}
                    onChange={(e) => setMenuForm({ ...menuForm, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-navy-900 focus:outline-none"
                  >
                    <option value="header">هدر اصلی (Header)</option>
                    <option value="footer">فوتر (Footer)</option>
                    <option value="sidebar">ستون کناری (Sidebar)</option>
                    <option value="custom">سفارشی (Custom)</option>
                  </select>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowMenuModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-navy-950 text-white font-bold text-xs shadow-sm hover:bg-navy-900"
                  >
                    ثبت منو
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add/Edit Item */}
        {showItemModal && (
          <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
              <h3 className="font-bold text-lg text-navy-950">
                {editingItemId ? 'ویرایش لینک منو' : 'افزودن لینک جدید به منو'}
              </h3>
              <form onSubmit={handleSaveItem} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">عنوان لینک</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: خدمات فرآوری"
                    value={itemForm.title}
                    onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-navy-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">آدرس مقصد (URL)</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: /services یا https://..."
                    value={itemForm.url}
                    onChange={(e) => setItemForm({ ...itemForm, url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:border-navy-900 focus:outline-none"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">نحوه باز شدن لینک</label>
                  <select
                    value={itemForm.target}
                    onChange={(e) => setItemForm({ ...itemForm, target: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-navy-900 focus:outline-none"
                  >
                    <option value="_self">در همان تب (_self)</option>
                    <option value="_blank">در تب جدید (_blank)</option>
                  </select>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowItemModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#EFA73F] text-navy-950 font-bold text-xs shadow-sm hover:bg-amber-500"
                  >
                    ذخیره آیتم
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
