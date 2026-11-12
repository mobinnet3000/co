import React, { useState, useEffect } from 'react';
import { Users, Plus, Shield, Check, X, AlertCircle, Key, Activity } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export const AdminUsersPage: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'audit'>('users');
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  // Form State
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
    role: 'editor',
  });

  const loadUsersAndLogs = () => {
    setLoading(true);
    Promise.all([
      api.users.getAll().catch(() => ({ success: false, data: [] })),
      api.users.getAuditLogs().catch(() => ({ success: false, data: [] })),
    ])
      .then(([usersRes, logsRes]) => {
        if (usersRes.success) setUsers(usersRes.data);
        if (logsRes.success) setAuditLogs(logsRes.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsersAndLogs();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.users.create(form);
      setMessage({ text: 'کاربر جدید با موفقیت ایجاد گردید.' });
      setModalOpen(false);
      setForm({ username: '', email: '', password: '', full_name: '', role: 'editor' });
      loadUsersAndLogs();
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    }
  };

  const handleToggleActive = async (user: any) => {
    try {
      await api.users.update(user.id, { is_active: user.is_active ? 0 : 1 });
      setMessage({ text: `وضعیت حساب کاربر ${user.username} تغییر یافت.` });
      loadUsersAndLogs();
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    }
  };

  const handleDeleteUser = async (id: number, username: string) => {
    if (!window.confirm(`آیا از حذف حساب کاربری "${username}" اطمینان دارید؟`)) return;
    try {
      await api.users.delete(id);
      setMessage({ text: 'کاربر با موفقیت حذف شد.' });
      loadUsersAndLogs();
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-navy-950 font-vazir">مدیریت کاربران و سطوح دسترسی (RBAC)</h1>
            <p className="text-xs text-slate-500 font-light mt-1">
              مدیریت حساب‌های مدیران، نقش‌ها و بازبینی تاریخچه لاگ‌های امنیتی سیستم
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-3.5 py-2 rounded-[10px] text-xs font-bold transition-all ${
                activeTab === 'users'
                  ? 'bg-navy-950 text-white'
                  : 'bg-white border border-[#E3DAD0] text-slate-700 hover:border-[#0F1821]'
              }`}
            >
              فهرست کاربران
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3.5 py-2 rounded-[10px] text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'audit'
                  ? 'bg-navy-950 text-white'
                  : 'bg-white border border-[#E3DAD0] text-slate-700 hover:border-[#0F1821]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>لاگ‌های امنیتی ({auditLogs.length})</span>
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-[#EFA73F] text-navy-950 hover:bg-[#D48E28] font-bold text-xs shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>کاربر جدید</span>
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-center justify-between ${
              message.isError
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            <span>{message.text}</span>
            <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* TAB 1: USERS LIST */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl border border-[#E3DAD0] shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-[#FAF7F3] border-b border-[#E3DAD0] text-slate-500 font-bold">
                  <tr>
                    <th className="p-4">کاربر</th>
                    <th className="p-4">نام کاربری</th>
                    <th className="p-4">ایمیل</th>
                    <th className="p-4">نقش دسترسی</th>
                    <th className="p-4">وضعیت حساب</th>
                    <th className="p-4">آخرین ورود</th>
                    <th className="p-4 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <strong className="text-navy-950 font-bold block">{u.full_name}</strong>
                      </td>
                      <td className="p-4 font-mono text-slate-600" dir="ltr">
                        @{u.username}
                      </td>
                      <td className="p-4 font-mono text-slate-500" dir="ltr">
                        {u.email}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-[6px] text-[10px] font-bold ${
                            u.role === 'super_admin'
                              ? 'bg-purple-100 text-purple-800'
                              : u.role === 'admin'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {u.role === 'super_admin' ? 'مدیر ارشد' : u.role === 'admin' ? 'مدیر سیستم' : 'نویسنده'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-[6px] text-[10px] font-bold ${
                            u.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {u.is_active ? 'فعال' : 'غیرفعال'}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-slate-400 text-[11px]">
                        {u.last_login_at ? u.last_login_at.slice(0, 16).replace('T', ' ') : '—'}
                      </td>
                      <td className="p-4 text-center">
                        {u.id !== currentUser?.id ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleToggleActive(u)}
                              className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-navy-950"
                            >
                              {u.is_active ? 'غیرفعال‌سازی' : 'فعال‌سازی'}
                            </button>
                            {currentUser?.role === 'super_admin' && (
                              <button
                                onClick={() => handleDeleteUser(u.id, u.username)}
                                className="px-2 py-1 rounded-lg text-[10px] font-bold bg-rose-50 hover:bg-rose-100 text-rose-700"
                              >
                                حذف
                              </button>
                            )}
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-mono">نشست جاری شما</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-2xl border border-[#E3DAD0] shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-[#FAF7F3] border-b border-[#E3DAD0] text-slate-500 font-bold">
                  <tr>
                    <th className="p-4">زمان ثبت</th>
                    <th className="p-4">کاربر</th>
                    <th className="p-4">عملیات (Action)</th>
                    <th className="p-4">موجودیت (Resource)</th>
                    <th className="p-4">شرح رویداد</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        {log.created_at ? log.created_at.slice(0, 19).replace('T', ' ') : ''}
                      </td>
                      <td className="p-4 font-bold text-navy-950">@{log.username}</td>
                      <td className="p-4 font-mono font-bold text-[#C92127] text-[11px]">{log.action}</td>
                      <td className="p-4 font-mono text-slate-600">{log.resource}</td>
                      <td className="p-4 text-slate-700">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal: Create User */}
        {modalOpen && (
          <div className="fixed inset-0 bg-navy-950/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#E3DAD0] shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E3DAD0]">
                <h2 className="text-base font-bold text-navy-950 font-vazir">افزودن کاربر و تخصیص نقش</h2>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-navy-950 mb-1">نام و نام خانوادگی *</label>
                  <input
                    type="text"
                    required
                    value={form.full_name}
                    onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy-950 mb-1">نام کاربری انگلیسی (Username) *</label>
                  <input
                    type="text"
                    required
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821] font-mono"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy-950 mb-1">پست الکترونیکی (Email) *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821] font-mono"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy-950 mb-1">کلمه عبور امن (حداقل ۸ کاراکتر) *</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821] font-mono"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy-950 mb-1">سطح دسترسی و نقش *</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
                  >
                    <option value="editor">نویسنده و ویرایشگر محتوا (Editor)</option>
                    <option value="admin">مدیر سیستم (Admin)</option>
                    <option value="super_admin">مدیر ارشد کل سامانه (Super Admin)</option>
                  </select>
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-[10px] bg-[#EFA73F] text-navy-950 font-bold hover:bg-[#D48E28] transition-colors"
                  >
                    ثبت کاربر
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
