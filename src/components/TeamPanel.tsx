import { useState } from 'react';
import {
  FolderLock,
  ExternalLink,
  Edit3,
  Copy,
  Check,
  FolderOpen,
  Shield,
  FileSpreadsheet,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { VALIDATION_FORMS, DRIVE_FOLDER_URL, ValidationForm } from '../utils/formMatcher';

export function TeamPanel() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(id);
      setTimeout(() => setCopiedLink(null), 2500);
    } catch {
      setCopiedLink(id);
      setTimeout(() => setCopiedLink(null), 2500);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
            <FolderLock className="w-3.5 h-3.5" />
            <span>Coordenação da Pesquisa & Validação</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Painel Administrativo da Pesquisa HiperReforço
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Acesso centralizado aos 5 formulários oficiais no Google Forms (edição e envio) e ao repositório unificado de dados e planilhas de validação no Google Drive.
          </p>
        </div>

        {/* Big Drive Folder CTA */}
        <a
          href={DRIVE_FOLDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] shrink-0"
        >
          <FolderOpen className="w-5 h-5 text-slate-950" />
          <span>Acessar Pasta no Drive</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Forms Management Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
              <span>Matriz de Formulários de Validação (5 Instrumentos: Triagem, Roteiros A, D, E e G)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Links diretos para envio a participantes e edição pela equipe do projeto
            </p>
          </div>

          <div className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Sincronizado com o repositório oficial</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">Formulário / Público</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Link para Enviar (Público)</th>
                <th className="p-4">Link para Editar (Admin)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {VALIDATION_FORMS.map((form) => {
                const isCopiedSend = copiedLink === `send-${form.id}`;
                const isCopiedEdit = copiedLink === `edit-${form.id}`;

                return (
                  <tr key={form.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    {/* Form title */}
                    <td className="p-4 max-w-xs">
                      <div className="font-bold text-slate-900 text-sm">{form.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-snug">{form.audienceHeadline}</div>
                      {form.hypothesisCode && (
                        <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.2 rounded-full bg-rose-100 text-rose-800">
                          Hipótese {form.hypothesisCode}
                        </span>
                      )}
                    </td>

                    {/* Category */}
                    <td className="p-4">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${form.badgeColor}`}>
                        {form.badge}
                      </span>
                    </td>

                    {/* Send Link */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={form.sendUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors"
                        >
                          <span>Responder</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleCopy(form.sendUrl, `send-${form.id}`)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                          title="Copiar link de envio"
                        >
                          {isCopiedSend ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>

                    {/* Edit Link */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={form.editUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-xs border border-amber-200 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Editar no Forms</span>
                        </a>
                        <button
                          onClick={() => handleCopy(form.editUrl, `edit-${form.id}`)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                          title="Copiar link de edição"
                        >
                          {isCopiedEdit ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Governance, MROSC & LGPD Technical Note */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
            <Shield className="w-4 h-4 text-indigo-600" />
            <span>Conformidade com a LGPD (Lei 13.709/2018)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            As coletas de dados obedecem estritamente aos princípios de finalidade, necessidade e transparência para validação tecnológica e pesquisa científica (Art. 7º, IV). Nenhuma informação de identificação sensível da criança é exposta ou comercializada.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Marco do MROSC & Editais de Inovação</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Estrutura metodológica desenhada para fundamentar a escalabilidade socioeducativa e orçamentária do projeto HiperReforço em editais públicos de fomento (FINEP, Centelha/Fundect e Termos de Colaboração da Lei 13.019/14).
          </p>
        </div>
      </div>

    </div>
  );
}
