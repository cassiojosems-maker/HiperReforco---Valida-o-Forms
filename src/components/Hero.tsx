import { Sparkles, Clock, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

interface HeroProps {
  onSelectRoleQuick: (roleId: string) => void;
  onOpenWizard: () => void;
  highContrast?: boolean;
}

export function Hero({ onSelectRoleQuick, onOpenWizard, highContrast = false }: HeroProps) {
  return (
    <section className={`relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 border-b ${
      highContrast 
        ? 'bg-black text-white border-yellow-400' 
        : 'bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 border-slate-200/80'
    }`}>
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-indigo-200/30 via-amber-100/20 to-teal-100/30 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Micro badge */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white p-2 shadow-md border border-indigo-100 flex items-center justify-center mb-3 hover:scale-105 transition-transform">
            <img
              src="/assets/logo-hiper.png"
              alt="Logo HiperReforço — Conhecimento em Evolução"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-indigo-100/80 text-indigo-900 border border-indigo-200/70 shadow-xs">
            <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
            <span>Validação de Hipóteses • Pesquisa HiperReforço</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Hiperfocos não são obstáculos.{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-amber-600 bg-clip-text text-transparent">
              São portais de aprendizagem.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Estamos construindo a plataforma EdTech que utiliza os temas de fascínio de crianças e jovens neurodivergentes (TEA, TDAH, Altas Habilidades) como ponto de entrada para o currículo. Selecione o seu perfil abaixo e participe da pesquisa:
          </p>
        </div>

        {/* Fast Action Cards / Pill buttons */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 max-w-5xl mx-auto">
          <button
            onClick={() => onSelectRoleQuick('gestores')}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-white border border-amber-200 hover:border-amber-400 hover:shadow-md hover:-translate-y-0.5 transition-all text-center group cursor-pointer"
          >
            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🏛️</span>
            <span className="font-bold text-xs sm:text-sm text-slate-900">Gestores Públicos</span>
            <span className="text-[11px] text-amber-700 font-medium">Triagem • Secretarias</span>
          </button>

          <button
            onClick={() => onSelectRoleQuick('professora-regente')}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-white border border-emerald-200 hover:border-emerald-400 hover:shadow-md hover:-translate-y-0.5 transition-all text-center group cursor-pointer"
          >
            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">👩‍🏫</span>
            <span className="font-bold text-xs sm:text-sm text-slate-900">Professora Regente</span>
            <span className="text-[11px] text-emerald-700 font-medium">Roteiro A • Sala Regular</span>
          </button>

          <button
            onClick={() => onSelectRoleQuick('familia-com-aee')}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-white border border-indigo-200 hover:border-indigo-400 hover:shadow-md hover:-translate-y-0.5 transition-all text-center group cursor-pointer"
          >
            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🏡</span>
            <span className="font-bold text-xs sm:text-sm text-slate-900">Família com Apoio</span>
            <span className="text-[11px] text-indigo-700 font-medium">Roteiro D</span>
          </button>

          <button
            onClick={() => onSelectRoleQuick('familia-sem-aee')}
            className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-white border border-rose-200 hover:border-rose-400 hover:shadow-md hover:-translate-y-0.5 transition-all text-center group cursor-pointer"
          >
            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🤝</span>
            <span className="font-bold text-xs sm:text-sm text-slate-900">Família sem Apoio</span>
            <span className="text-[11px] text-rose-700 font-semibold">Roteiro E</span>
          </button>

          <button
            onClick={() => onSelectRoleQuick('roteiro-g-clinico')}
            className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-white border border-purple-200 hover:border-purple-400 hover:shadow-md hover:-translate-y-0.5 transition-all text-center group cursor-pointer"
          >
            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🧠</span>
            <span className="font-bold text-xs sm:text-sm text-slate-900">Atendimento Clínico</span>
            <span className="text-[11px] text-purple-700 font-semibold">Roteiro G</span>
          </button>
        </div>

        {/* Wizard Callout Banner */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-indigo-900 text-white shadow-lg shadow-indigo-900/10 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-indigo-700 flex items-center justify-center text-amber-300 shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold">Em dúvida sobre qual questionário preencher?</p>
              <p className="text-[11px] sm:text-xs text-indigo-200">Responda a 2 perguntas simples e nós indicamos o formulário ideal.</p>
            </div>
          </div>
          <button
            onClick={onOpenWizard}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-colors shrink-0 shadow-sm"
          >
            Descobrir meu formulário em 10s →
          </button>
        </div>

        {/* Trust & Meta metrics */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-amber-600" />
            <span>Pesquisa Aplicada para <strong>Educação Inclusiva</strong></span>
          </div>
        </div>

      </div>
    </section>
  );
}
