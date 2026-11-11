import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  Activity,
  AlertCircle,
  Calendar,
  ChevronDown,
  Clock,
  Cpu,
  Download,
  Filter,
  Layers,
  RefreshCw,
  Sliders,
  TrendingUp,
} from 'lucide-react';
import { demoDashboardData } from '../../data/platform';
import { toPersianDigits } from '../../utils/formatters';
import { SectionHeading } from '../common/SectionHeading';
import { AnimatedSection } from '../common/AnimatedSection';

export const PlatformDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'today' | 'week' | 'month'>('today');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'trends' | 'shifts' | 'equipment'>('trends');

  // Multiplier based on time range for interactive feel
  const timeMultiplier = selectedTimeRange === 'week' ? 1.05 : selectedTimeRange === 'month' ? 1.12 : 1;

  const chartData = demoDashboardData.hourlyFeedData.map((d) => ({
    ...d,
    feedRate: Math.round(d.feedRate * timeMultiplier),
    power: Math.round(d.power * timeMultiplier),
  }));

  const shiftData = demoDashboardData.shiftPerformance.map((s) => ({
    ...s,
    tonnage: Math.round(s.tonnage * timeMultiplier),
  }));

  const filteredEquipment =
    selectedEquipment === 'all'
      ? demoDashboardData.equipmentStatus
      : demoDashboardData.equipmentStatus.filter((eq) => eq.code === selectedEquipment);

  return (
    <section id="dashboard-demo" className="py-20 md:py-28 bg-navy-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-10">
          <SectionHeading
            variant="dark"
            align="center"
            eyebrow="دموی تعاملی رابط کاربری"
            title="نمای داشبورد عملیاتی و مانیتورینگ خط"
            description="نمایش ساختار ارزیابی شاخص‌های کلیدی عملکرد (KPIs)، موازنه متالورژیکی و رفتارهای داده‌ای با رابط کاربری صنعتی."
          />
        </AnimatedSection>

        {/* DEMO NOTICE BANNER (Prominently displayed per prompt requirement) */}
        <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 flex items-start gap-3 text-xs sm:text-sm max-w-4xl mx-auto">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-400" />
          <div className="leading-relaxed">
            <strong>نشانگر داده‌های شبیه‌سازی‌شده (DEMO DATA):</strong> {demoDashboardData.notice}
          </div>
        </div>

        {/* Industrial Dashboard Frame */}
        <div className="bg-navy-800/95 border border-slate-700/80 rounded-2xl shadow-2xl p-5 sm:p-7 backdrop-blur-md">
          {/* Top Control Bar: Filters & Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between pb-6 mb-6 border-b border-slate-700 gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-brand-cyan flex items-center gap-1.5 pl-3 border-l border-slate-700">
                <Activity className="w-4 h-4" />
                <span>PLANT 01 • CONCENTRATOR</span>
              </span>

              {/* Navigation Tabs */}
              <div className="flex items-center bg-navy-900 p-1 rounded-lg border border-slate-700 text-xs">
                <button
                  onClick={() => setActiveTab('trends')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeTab === 'trends' ? 'bg-brand-blue text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  روند خوراک و توان
                </button>
                <button
                  onClick={() => setActiveTab('shifts')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeTab === 'shifts' ? 'bg-brand-blue text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  کارنامه شیفت‌ها
                </button>
                <button
                  onClick={() => setActiveTab('equipment')}
                  className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                    activeTab === 'equipment' ? 'bg-brand-blue text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  وضعیت تجهیزات
                </button>
              </div>
            </div>

            {/* Time Filter & Equipment Filter */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Equipment Selector */}
              <div className="flex items-center gap-1.5 bg-navy-900 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
                <Sliders className="w-3.5 h-3.5 text-brand-cyan" />
                <select
                  value={selectedEquipment}
                  onChange={(e) => setSelectedEquipment(e.target.value)}
                  className="bg-transparent text-slate-200 focus:outline-none cursor-pointer pr-1"
                >
                  <option value="all" className="bg-navy-900 text-white">همه تجهیزات خط</option>
                  <option value="CR-101" className="bg-navy-900 text-white">سنگ‌شکن ژیراتوری</option>
                  <option value="ML-201" className="bg-navy-900 text-white">آسیای SAG</option>
                  <option value="ML-202" className="bg-navy-900 text-white">آسیای گلوله‌ای</option>
                  <option value="HC-301" className="bg-navy-900 text-white">هیدروسیکلون‌ها</option>
                  <option value="FL-401" className="bg-navy-900 text-white">فلوتاسیون رافر</option>
                </select>
              </div>

              {/* Time Range Selector */}
              <div className="flex items-center bg-navy-900 p-1 rounded-lg border border-slate-700 text-xs">
                <button
                  onClick={() => setSelectedTimeRange('today')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    selectedTimeRange === 'today' ? 'bg-brand-cyan text-navy-900 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  امروز (ساعتی)
                </button>
                <button
                  onClick={() => setSelectedTimeRange('week')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    selectedTimeRange === 'week' ? 'bg-brand-cyan text-navy-900 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  هفته جاری
                </button>
                <button
                  onClick={() => setSelectedTimeRange('month')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    selectedTimeRange === 'month' ? 'bg-brand-cyan text-navy-900 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ماه جاری
                </button>
              </div>
            </div>
          </div>

          {/* KPI Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {demoDashboardData.kpis.map((kpi, idx) => (
              <div
                key={idx}
                className="bg-navy-900/90 rounded-xl p-4 border border-slate-700/70 hover:border-slate-600 transition-colors"
              >
                <div className="text-xs text-slate-400 mb-2 truncate">{kpi.label}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white font-vazir">
                    {kpi.value}
                  </span>
                  <span className="text-[11px] text-slate-400 font-light">{kpi.unit}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 font-mono font-semibold">{kpi.change}</span>
                  <span className="text-[10px] text-slate-400">نسبت به میانگین</span>
                </div>
              </div>
            ))}
          </div>

          {/* Main Visual Content based on active tab */}
          {activeTab === 'trends' && (
            <div className="bg-navy-900/80 rounded-xl p-5 border border-slate-700/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <div>
                  <h4 className="text-sm font-bold text-white font-vazir flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-brand-cyan" />
                    <span>روند نرخ خوراک‌دهی (TPH) در مقایسه با توان مصرفی آسیا (kW)</span>
                  </h4>
                  <p className="text-xs text-slate-400 font-light mt-0.5">
                    بررسی رفتار مدار خردایش و پایش پیوستگی باردهی به خط فرآوری
                  </p>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  REFRESHED: LIVE CLIENT DEMO
                </div>
              </div>

              {/* Recharts Area Chart */}
              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="feedColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EFA73F" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#EFA73F" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="powerColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C92127" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#C92127" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E3752" />
                    <XAxis dataKey="time" stroke="#64748B" fontSize={11} />
                    <YAxis stroke="#64748B" fontSize={11} domain={['dataMin - 20', 'dataMax + 20']} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0F1821',
                        borderColor: '#EFA73F',
                        borderRadius: '10px',
                        color: '#FFF',
                        fontSize: '12px',
                        textAlign: 'right',
                        direction: 'rtl',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Area
                      type="monotone"
                      dataKey="feedRate"
                      name="نرخ خوراک (تن بر ساعت)"
                      stroke="#EFA73F"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#feedColor)"
                    />
                    <Area
                      type="monotone"
                      dataKey="power"
                      name="توان مصرفی آسیای نیمه‌خودشکن (کیلووات)"
                      stroke="#C92127"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#powerColor)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'shifts' && (
            <div className="bg-navy-900/80 rounded-xl p-5 border border-slate-700/60">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold text-white font-vazir">
                    مقایسه تناژ تولیدی شیفت‌ها با تارگت برنامه‌ریزی‌شده
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    ارزیابی عملکرد اپراتوری و رصد تحقق برنامه تولید ۲۴ ساعته
                  </p>
                </div>
              </div>

              {/* Recharts Bar Chart */}
              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={shiftData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E3752" />
                    <XAxis dataKey="shift" stroke="#64748B" fontSize={11} />
                    <YAxis stroke="#64748B" fontSize={11} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0F1821',
                        borderColor: '#EFA73F',
                        borderRadius: '10px',
                        color: '#FFF',
                        fontSize: '12px',
                        textAlign: 'right',
                        direction: 'rtl',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Bar dataKey="tonnage" name="تناژ واقعی محقق‌شده (تن)" fill="#EFA73F" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="target" name="هدف اسمی شیفت (تن)" fill="#324C64" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'equipment' && (
            <div className="bg-navy-900/80 rounded-xl p-5 border border-slate-700/60">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold text-white font-vazir">
                    جدول وضعیت بار و پارامترهای تجهیزات اصلی خط
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    نشانگر درصدی لود موتورها، وضعیت کارکرد و دمای یاتاقان‌ها
                  </p>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400">
                      <th className="py-3 px-3">کد تجهیز</th>
                      <th className="py-3 px-3">نام تجهیز</th>
                      <th className="py-3 px-3">وضعیت کارکرد</th>
                      <th className="py-3 px-3">درصد لود مکانیکی</th>
                      <th className="py-3 px-3">دمای پایش‌شده</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredEquipment.map((eq, i) => (
                      <tr key={i} className="hover:bg-navy-800/50 transition-colors">
                        <td className="py-3 px-3 font-mono text-brand-cyan">{eq.code}</td>
                        <td className="py-3 px-3 font-medium text-white">{eq.name}</td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>{eq.status}</span>
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-slate-700 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-brand-cyan h-full rounded-full"
                                style={{ width: `${eq.load}%` }}
                              ></div>
                            </div>
                            <span className="font-mono text-slate-300">{toPersianDigits(eq.load)}٪</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-300">
                          {toPersianDigits(eq.temp)} °C
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bottom Footnote on Dashboard Architecture */}
          <div className="mt-6 pt-4 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
            <span>
              طراحی‌شده بر پایه پروتکل‌های استاندارد وب و سازگار با سیستم‌های نمایشگر اتاق کنترل
            </span>
            <span className="text-brand-cyan font-mono text-[11px]">
              RECHARTS ENGINE • PURE FRONTEND DEMO
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
