import { ShieldCheck, Heart, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdminAccess: () => void;
  isAdminUnlocked?: boolean;
}

export function Footer({ onOpenAdminAccess, isAdminUnlocked = false }: FooterProps) {
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

          {/* Direct Links */}
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
                  Roteiro D — Pais e Mães (Com Apoio na Escola)
                </a>
              </li>
              <li>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfJubH6LmG-PLZqenwNoxs6dw5BiGiiJEMus2FzD-MFjTh7wQ/viewform" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 hover:underline">
                  Roteiro E — Pais e Mães (Sem Apoio na Escola)
                </a>
              </li>
              <li>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLScsfRM_33ZV9DDDSBEmOoOqtrQiV2lTo3AGS-eH4RSvdyFtgw/viewform?usp=sharing&ouid=111041022314259236485" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 hover:underline">
                  Roteiro G — Atendimento Clínico
                </a>
              </li>
            </ul>
          </div>

          {/* Privacy & LGPD */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Privacidade & LGPD</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sua participação é 100% voluntária e anônima. Os dados coletados seguem a Lei Geral de Proteção de Dados (Lei 13.709/18) e destinam-se exclusivamente à pesquisa educacional.
            </p>
          </div>

        </div>

        {/* Bottom copyright & discreet coordinator lock */}
        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} HiperReforço. Todos os direitos reservados. Pesquisa de validação em conformidade com a LGPD.</p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1">
              <span>Desenvolvido com dedicação à neurodiversidade</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            </p>
            <button
              onClick={onOpenAdminAccess}
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
              title="Acesso restrito à coordenação da pesquisa"
            >
              <Lock className="w-3 h-3" />
              <span>{isAdminUnlocked ? 'Painel da Pesquisa' : 'Coordenação'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
