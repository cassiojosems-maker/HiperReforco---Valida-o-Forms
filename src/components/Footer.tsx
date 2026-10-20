import { Sparkles, FolderOpen, Heart } from 'lucide-react';
import { DRIVE_FOLDER_URL } from '../utils/formMatcher';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-0.5 flex items-center justify-center shadow-xs">
                <img
                  src="/assets/aistudio/Logo_Hiper_88795513.png"
                  alt="HiperReforço"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                HiperReforço
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                EdTech & Inclusão
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
              Tecnologia inclusiva que potencializa o aprendizado de crianças e jovens neurodivergentes (TEA, TDAH e Altas Habilidades) construindo pontes a partir de seus hiperfocos de interesse.
            </p>
            <p className="text-xs text-slate-400 italic">
              "Hiperfocos não são obstáculos — são portais."
            </p>
          </div>

          {/* Quick links to instruments */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Formulários da Pesquisa
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScbWQeO9FfnWTOU4PUgzrSe9iPT2iZTo-y7J-vMU_F6QyAoIQ/viewform" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 hover:underline">
                  Triagem — Gestores Públicos
                </a>
              </li>
              <li>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeoeCA79prPpFm5iE5fAhZ8OF5rifM4KGFhC8DoEKPm6xBLNQ/viewform" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 hover:underline">
                  Roteiro A — Professora Regente
                </a>
              </li>
              <li>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScP_YDK8NDI6D2Ylypj-DFAJQ78yRrKiYCWm4OXsfrXVOUwwg/viewform" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 hover:underline">
                  Roteiro D — Família com AEE
                </a>
              </li>
              <li>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfJubH6LmG-PLZqenwNoxs6dw5BiGiiJEMus2FzD-MFjTh7wQ/viewform" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 hover:underline">
                  Roteiro E — Família sem AEE (H6)
                </a>
              </li>
            </ul>
          </div>

          {/* Research & Drive */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Coordenação & Repositório
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Planilhas consolidadas e relatórios de validação no Google Drive da pesquisa:
            </p>
            <a
              href={DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
            >
              <FolderOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>Abrir Pasta no Drive</span>
            </a>
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} HiperReforço. Todos os direitos reservados. Pesquisa de validação em conformidade com a LGPD.</p>
          <p className="flex items-center gap-1">
            <span>Desenvolvido com dedicação à neurodiversidade</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
