import React from 'react';

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  education?: string;
}

export interface TeamBlockConfig {
  tagline?: string;
  title: string;
  subtitle?: string;
  members: TeamMember[];
}

export const TeamBlock: React.FC<{ config: TeamBlockConfig }> = ({ config }) => {
  if (!config?.members || config.members.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-brand-sand border-b border-[#E3DAD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {config.tagline && (
            <span className="text-xs font-mono font-bold text-[#EFA73F] tracking-wider uppercase block mb-2">
              {config.tagline}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-vazir text-navy-950 mb-3">
            {config.title}
          </h2>
          {config.subtitle && (
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              {config.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.members.map((member, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#E3DAD0] shadow-card flex flex-col items-center text-center hover:border-navy-950 transition-colors group"
            >
              {member.imageUrl ? (
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-[#E3DAD0]"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-brand-sand border border-[#E3DAD0] flex items-center justify-center text-xl font-bold font-vazir text-navy-950 mb-4">
                  {member.name.charAt(0)}
                </div>
              )}

              <h3 className="text-base font-bold font-vazir text-navy-950 mb-1">
                {member.name}
              </h3>
              <p className="text-xs font-semibold text-[#EFA73F] mb-3">
                {member.role}
              </p>
              {member.education && (
                <span className="text-[11px] text-slate-400 font-mono mb-3 block">
                  {member.education}
                </span>
              )}
              {member.bio && (
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  {member.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
