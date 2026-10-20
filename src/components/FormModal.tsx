import { ExternalLink, X, AlertCircle } from 'lucide-react';
import { ValidationForm } from '../utils/formMatcher';

interface FormModalProps {
  form: ValidationForm | null;
  onClose: () => void;
}

export function FormModal({ form, onClose }: FormModalProps) {
  if (!form) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-4xl h-[92vh] max-h-[850px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800">
              {form.badge}
            </span>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">
                {form.title}
              </h3>
              <p className="text-xs text-slate-500 hidden sm:block">
                Preenchimento direto seguro via Google Forms
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={form.sendUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              <span>Abrir em Nova Aba</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-colors"
              aria-label="Fechar pré-visualização"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Iframe Container */}
        <div className="flex-1 bg-slate-100 relative overflow-hidden flex flex-col">
          <div className="bg-amber-50 border-b border-amber-200/60 px-4 py-2 text-[11px] sm:text-xs text-amber-900 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Se o formulário solicitar login do Google e não carregar no quadro abaixo, clique no botão <strong>"Abrir em Nova Aba"</strong>.
              </span>
            </div>
            <a
              href={form.sendUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold shrink-0 hover:text-amber-950"
            >
              Abrir tela cheia
            </a>
          </div>

          <iframe
            src={`${form.sendUrl}?embedded=true`}
            title={`Formulário ${form.title}`}
            className="w-full h-full border-0 bg-white"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          >
            Carregando formulário oficial...
          </iframe>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <span>Tempo estimado de resposta: <strong>~{form.estimatedMinutes} minutos</strong></span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
