import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Building,
  Trash2,
  X,
  FileText,
  AlertCircle,
  Archive,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';

export const AdminMessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMsg, setSelectedMsg] = useState<any | null>(null);
  const [noteInput, setNoteInput] = useState<string>('');
  const [feedback, setFeedback] = useState<{ text: string; isError?: boolean } | null>(null);

  const loadMessages = () => {
    setLoading(true);
    api.messages.getAll({ status: statusFilter, search })
      .then((res) => {
        if (res.success) setMessages(res.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMessages();
  }, [statusFilter]);

  const openMessageDetail = async (id: number) => {
    try {
      const res = await api.messages.getById(id);
      if (res.success) {
        setSelectedMsg(res.data);
        loadMessages(); // Update read status in list
      }
    } catch (err: any) {
      setFeedback({ text: err.message, isError: true });
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await api.messages.updateStatus(id, newStatus);
      setFeedback({ text: 'وضعیت پیام به‌روزرسانی شد.' });
      if (selectedMsg && selectedMsg.id === id) {
        setSelectedMsg({ ...selectedMsg, status: newStatus });
      }
      loadMessages();
    } catch (err: any) {
      setFeedback({ text: err.message, isError: true });
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim() || !selectedMsg) return;

    try {
      await api.messages.addNote(selectedMsg.id, noteInput);
      setFeedback({ text: 'یادداشت داخلی ثبت شد.' });
      setNoteInput('');
      const updated = await api.messages.getById(selectedMsg.id);
      if (updated.success) setSelectedMsg(updated.data);
    } catch (err: any) {
      setFeedback({ text: err.message, isError: true });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('آیا از حذف این پیام اطمینان دارید؟')) return;
    try {
      await api.messages.delete(id);
      setFeedback({ text: 'پیام حذف شد.' });
      setSelectedMsg(null);
      loadMessages();
    } catch (err: any) {
      setFeedback({ text: err.message, isError: true });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-navy-950 font-vazir">صندوق پیام‌ها و استعلام‌های دریافتی</h1>
            <p className="text-xs text-slate-500 font-light mt-1">
              مدیریت درخواست‌های ارتباط با شرکت، پیگیری وضعیت و یادداشت‌گذاری داخلی
            </p>
          </div>
        </div>

        {/* Feedback message */}
        {feedback && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-center justify-between ${
              feedback.isError
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            <span>{feedback.text}</span>
            <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#E3DAD0] shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {[
              { label: 'همه پیام‌ها', val: 'all' },
              { label: 'جدید و خوانده‌نشده', val: 'unread' },
              { label: 'در دست بررسی', val: 'in_progress' },
              { label: 'پاسخ داده شد', val: 'resolved' },
              { label: 'بایگانی', val: 'archived' },
            ].map((tab) => (
              <button
                key={tab.val}
                onClick={() => setStatusFilter(tab.val)}
                className={`px-3.5 py-1.5 rounded-[10px] text-xs font-semibold whitespace-nowrap transition-all ${
                  statusFilter === tab.val
                    ? 'bg-navy-950 text-white shadow-xs'
                    : 'bg-brand-sand text-navy-950 hover:bg-[#0F1821]/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <input
              type="text"
              placeholder="جستجو در پیام‌ها..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && loadMessages()}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-950 focus:outline-none focus:border-[#0F1821]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Messages List & Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Messages List (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-[#E3DAD0] shadow-card overflow-hidden">
            <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center py-12 text-xs text-slate-500">
                  پیامی با این فیلتر یافت نشد.
                </div>
              ) : (
                messages.map((m) => {
                  const isSelected = selectedMsg?.id === m.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => openMessageDetail(m.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-xs ${
                        isSelected
                          ? 'border-[#0F1821] bg-brand-sandLight shadow-xs'
                          : m.status === 'unread'
                          ? 'border-rose-200 bg-rose-50/40 hover:bg-rose-50/70'
                          : 'border-slate-100 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-navy-950 font-bold">{m.name}</strong>
                        <span
                          className={`px-2 py-0.5 rounded-[6px] text-[10px] font-bold ${
                            m.status === 'unread'
                              ? 'bg-rose-100 text-[#C92127]'
                              : m.status === 'resolved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : m.status === 'in_progress'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {m.status === 'unread'
                            ? 'جدید'
                            : m.status === 'resolved'
                            ? 'پاسخ داده شد'
                            : m.status === 'in_progress'
                            ? 'در دست بررسی'
                            : 'بایگانی'}
                        </span>
                      </div>

                      <p className="text-slate-600 line-clamp-2 leading-relaxed mb-2 font-light">
                        {m.message}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>{m.phone || m.email}</span>
                        <span>{m.created_at ? m.created_at.slice(0, 10) : ''}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Message Detail Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#E3DAD0] shadow-card">
            {selectedMsg ? (
              <div className="space-y-6 text-xs">
                {/* Header & Status Selector */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E3DAD0]">
                  <div>
                    <h2 className="text-base font-bold text-navy-950 font-vazir">{selectedMsg.name}</h2>
                    <span className="text-[11px] font-mono text-slate-500">
                      ثبت شده در: {selectedMsg.created_at}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedMsg.status}
                      onChange={(e) => handleStatusChange(selectedMsg.id, e.target.value)}
                      className="p-2 rounded-xl border border-[#E3DAD0] bg-brand-sand font-bold text-navy-950 text-xs focus:outline-none"
                    >
                      <option value="unread">جدید (خوانده نشده)</option>
                      <option value="read">خوانده شده</option>
                      <option value="in_progress">در دست بررسی فنی</option>
                      <option value="resolved">پاسخ داده شد و تکمیل</option>
                      <option value="archived">بایگانی</option>
                    </select>

                    <button
                      onClick={() => handleDelete(selectedMsg.id)}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-50"
                      title="حذف پیام"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Contact Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-brand-sandLight border border-[#E3DAD0] flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C92127]" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">شماره تماس:</span>
                      <strong className="text-navy-950 font-mono">{selectedMsg.phone || 'ثبت نشده'}</strong>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-brand-sandLight border border-[#E3DAD0] flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#EFA73F]" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">پست الکترونیکی:</span>
                      <strong className="text-navy-950 font-mono truncate block max-w-[140px]">{selectedMsg.email || 'ثبت نشده'}</strong>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-brand-sandLight border border-[#E3DAD0] flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-600" />
                    <div>
                      <span className="text-[10px] text-slate-400 block">سازمان / کارخانه:</span>
                      <strong className="text-navy-950">{selectedMsg.company || '—'}</strong>
                    </div>
                  </div>
                </div>

                {/* Full Message Body */}
                <div className="p-5 rounded-2xl bg-[#FAF7F3] border border-[#E3DAD0] space-y-2">
                  <span className="font-bold text-navy-950 block">متن کامل پیام:</span>
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap font-light">
                    {selectedMsg.message}
                  </p>
                </div>

                {/* Internal Notes Section */}
                <div className="space-y-3 pt-2">
                  <span className="font-bold text-navy-950 block">یادداشت‌های داخلی کارشناسان:</span>

                  {selectedMsg.internal_notes ? (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 whitespace-pre-wrap font-mono text-[11px] leading-relaxed max-h-40 overflow-y-auto">
                      {selectedMsg.internal_notes}
                    </div>
                  ) : (
                    <div className="text-slate-400 text-[11px]">هنوز یادداشت داخلی برای این پیام درج نشده است.</div>
                  )}

                  <form onSubmit={handleAddNote} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="افزودن یادداشت جدید (مثال: تماس گرفته شد، مقرر شد فلوشیت ارسال شود)..."
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      className="flex-1 p-2.5 rounded-xl border border-[#E3DAD0] text-xs focus:outline-none focus:border-[#0F1821]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-[10px] bg-[#EFA73F] text-navy-950 font-bold hover:bg-[#D48E28] transition-colors"
                    >
                      افزودن یادداشت
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="text-center py-24 text-slate-400">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <span>برای مشاهده جزئیات و پاسخ‌گویی، یکی از پیام‌های ستون راست را انتخاب فرمایید.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
