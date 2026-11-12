import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Upload, Trash2, Copy, Check, File, X, Search, FileText } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';

export const AdminMediaPage: React.FC = () => {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  const loadMedia = () => {
    setLoading(true);
    api.media.getAll()
      .then((res) => {
        if (res.success) setMediaList(res.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        await api.media.upload(files[i]);
      }
      setMessage({ text: 'فایل(ها) با موفقیت در کتابخانه رسانه ذخیره شدند.' });
      loadMedia();
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleCopyUrl = (id: number, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('آیا از حذف این فایل رسانه اطمینان دارید؟')) return;
    try {
      await api.media.delete(id);
      setMessage({ text: 'فایل با موفقیت حذف شد.' });
      loadMedia();
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    }
  };

  const filteredMedia = mediaList.filter(
    (m) =>
      m.original_name.toLowerCase().includes(search.toLowerCase()) ||
      (m.alt_text && m.alt_text.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-navy-950 font-vazir">کتابخانه رسانه‌ها (Media Library)</h1>
            <p className="text-xs text-slate-500 font-light mt-1">
              مدیریت تصاویر، آرت‌ورک‌ها و اسناد فنی بارگذاری‌شده در پلتفرم
            </p>
          </div>

          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#EFA73F] text-navy-950 hover:bg-[#D48E28] font-bold text-xs shadow-xs transition-colors cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'در حال آپلود...' : 'آپلود رسانه جدید'}</span>
            <input
              type="file"
              multiple
              disabled={uploading}
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
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

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#E3DAD0] shadow-card flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="جستجو در نام فایل..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-950 focus:outline-none focus:border-[#0F1821]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <span className="text-xs text-slate-500 font-mono">
            {filteredMedia.length} FILES
          </span>
        </div>

        {/* Media Grid */}
        {filteredMedia.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E3DAD0] shadow-card">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-navy-950 mb-1">هیچ فایلی یافت نشد</h3>
            <p className="text-xs text-slate-500">برای افزودن عکس یا سند از دکمه آپلود بالا استفاده نمایید.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredMedia.map((item) => {
              const isImage = item.mime_type?.startsWith('image/');
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#E3DAD0] shadow-card group flex flex-col justify-between"
                >
                  <div className="h-32 bg-slate-100 flex items-center justify-center overflow-hidden relative">
                    {isImage ? (
                      <img
                        src={item.url}
                        alt={item.alt_text || item.original_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <FileText className="w-10 h-10 text-slate-400" />
                    )}
                  </div>

                  <div className="p-3">
                    <span className="text-xs font-bold text-navy-950 block truncate" title={item.original_name}>
                      {item.original_name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                      {(item.size / 1024).toFixed(0)} KB
                    </span>

                    <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100">
                      <button
                        onClick={() => handleCopyUrl(item.id, item.url)}
                        className="text-[11px] font-semibold text-navy-950 hover:text-[#C92127] flex items-center gap-1"
                        title="کپی آدرس فایل"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">کپی شد</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>کپی URL</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="حذف فایل"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
