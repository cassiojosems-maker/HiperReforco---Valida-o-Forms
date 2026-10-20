import React, { useState } from 'react';
import {
  ExternalLink,
  Copy,
  Check,
  QrCode,
  Share2,
  Clock,
  Sparkles,
  HelpCircle,
  Eye
} from 'lucide-react';
import { ValidationForm, VALIDATION_FORMS } from '../utils/formMatcher';

interface FormCardsGridProps {
  onOpenPreview: (form: ValidationForm) => void;
  onOpenQr: (form: ValidationForm) => void;
  highlightedFormId?: string | null;
}

export function FormCardsGrid({
  onOpenPreview,
  onOpenQr,
  highlightedFormId
}: FormCardsGridProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = async (form: ValidationForm) => {
    try {
      await navigator.clipboard.writeText(form.sendUrl);
      setCopiedId(form.id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Fallback
      setCopiedId(form.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleShareWhatsApp = (form: ValidationForm) => {
    const text = `Olá! Convido você a participar da pesquisa de validação do HiperReforço: "${form.title}". O preenchimento leva cerca de ${form.estimatedMinutes} minutos e apoia a inclusão escolar neurodivergente: ${form.sendUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getFormStyle = (id: string) => {
    switch (id) {
      case 'gestores':
        return {
          headerBg: 'from-amber-500/10 via-amber-50 to-white',
          borderColor: 'border-amber-200/80 hover:border-amber-400',
          accentColor: 'text-amber-700',
          btnBg: 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold',
          tagBg: 'bg-amber-100 text-amber-900 border-amber-300',
          avatar: '🏛️'
        };
      case 'professora-regente':
        return {
          headerBg: 'from-emerald-500/10 via-emerald-50 to-white',
          borderColor: 'border-emerald-200/80 hover:border-emerald-400',
          accentColor: 'text-emerald-700',
          btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold',
          tagBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          avatar: '👩‍🏫'
        };
      case 'familia-com-aee':
        return {
          headerBg: 'from-indigo-500/10 via-indigo-50 to-white',
          borderColor: 'border-indigo-200/80 hover:border-indigo-400',
          accentColor: 'text-indigo-700',
          btnBg: 'bg-indigo-600 hover:bg-indigo-700 text-white font-bold',
          tagBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
          avatar: '🏡'
        };
      case 'familia-sem-aee':
      default:
        return {
          headerBg: 'from-rose-500/10 via-rose-50 to-white',
          borderColor: 'border-rose-200/80 hover:border-rose-400',
          accentColor: 'text-rose-700',
          btnBg: 'bg-rose-600 hover:bg-rose-700 text-white font-bold',
          tagBg: 'bg-rose-100 text-rose-900 border-rose-300',
          avatar: '🤝'
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Instrumentos de Coleta
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Escolha o Seu Formulário Oficial
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Clique no botão do perfil correspondente para responder diretamente no Google Forms ou pré-visualizar aqui no navegador.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>4 formulários ativos e verificados</span>
        </div>
      </div>

      {/* Grid of 4 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
        {VALIDATION_FORMS.map((form) => {
          const style = getFormStyle(form.id);
          const isHighlighted = highlightedFormId === form.id;
          const isCopied = copiedId === form.id;

          return (
            <div
              key={form.id}
              id={`form-card-${form.id}`}
              className={`rounded-3xl border bg-white shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
                isHighlighted
                  ? 'ring-4 ring-indigo-500 shadow-2xl scale-[1.01]'
                  : `${style.borderColor} hover:shadow-xl`
              }`}
            >
              {/* Card Top Decorative Header */}
              <div className={`p-5 sm:p-6 bg-gradient-to-b ${style.headerBg} border-b border-slate-100`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-2xl bg-white shadow-xs border border-slate-100">
                      {style.avatar}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${style.tagBg}`}>
                          {form.badge}
                        </span>
                        {form.hypothesisCode && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-600 text-white">
                            {form.hypothesisCode}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1 tracking-tight">
                        {form.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-white/80 px-2.5 py-1 rounded-full border border-slate-200/80 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>~{form.estimatedMinutes} min</span>
                  </div>
                </div>

                {/* Target Audience */}
                <div className="mt-4 pt-3 border-t border-slate-200/50">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Público-alvo prioritário:
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                        {form.audienceDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body: Key Topics */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    O que este formulário avalia:
                  </h4>
                  <ul className="space-y-2">
                    {form.keyTopics.map((topic, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{topic}</span>
                      </li>
                    ))}
                  </ul>

                  {form.hypothesisNote && (
                    <div className="mt-3 p-2.5 rounded-xl bg-rose-50/70 border border-rose-200/70 text-[11px] text-rose-800">
                      <strong>Hipótese de Pesquisa:</strong> {form.hypothesisNote}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  
                  {/* Primary CTA: Send to Google Forms */}
                  <a
                    href={form.sendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl shadow-sm text-sm transition-all cursor-pointer ${style.btnBg} hover:shadow-md hover:scale-[1.01]`}
                  >
                    <span>Preencher Formulário Oficial</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  {/* Secondary CTAs */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <button
                      onClick={() => onOpenPreview(form)}
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
                      title="Abrir formulário embutido na página"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span className="truncate">Ver Aqui</span>
                    </button>

                    <button
                      onClick={() => handleCopyLink(form)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl font-medium transition-colors cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                      title="Copiar link para a área de transferência"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="truncate">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span className="truncate">Copiar Link</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onOpenQr(form)}
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
                      title="Exibir QR Code para escanear no smartphone"
                    >
                      <QrCode className="w-3.5 h-3.5 text-slate-500" />
                      <span className="truncate">QR Code</span>
                    </button>
                  </div>

                  {/* Share on WhatsApp */}
                  <button
                    onClick={() => handleShareWhatsApp(form)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 text-xs font-semibold border border-emerald-200/80 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Compartilhar este formulário no WhatsApp</span>
                  </button>

                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
