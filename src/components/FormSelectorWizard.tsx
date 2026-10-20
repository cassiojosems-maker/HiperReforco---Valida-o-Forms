import { useState } from 'react';
import { Compass, CheckCircle2, ArrowRight, RotateCcw, ExternalLink } from 'lucide-react';
import { ValidationForm, matchForm, UserRole } from '../utils/formMatcher';

interface FormSelectorWizardProps {
  onSelectForm: (form: ValidationForm) => void;
  onPreviewForm: (form: ValidationForm) => void;
  onClose?: () => void;
}

export function FormSelectorWizard({ onSelectForm, onPreviewForm }: FormSelectorWizardProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [hasAEE, setHasAEE] = useState<boolean | null>(null);

  const matchedForm: ValidationForm | null = selectedRole
    ? selectedRole === 'familia'
      ? hasAEE !== null
        ? matchForm({ role: 'familia', hasAEE })
        : null
      : matchForm({ role: selectedRole })
    : null;

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'familia') {
      setStep(2);
    } else {
      setStep(1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedRole(null);
    setHasAEE(null);
  };

  return (
    <div className="bg-white rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-100/40 p-6 sm:p-8 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Guia Rápido: Qual é o seu formulário?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Responda em 10 segundos para encontrar o questionário desenhado exatamente para o seu contexto.
            </p>
          </div>
        </div>

        {(selectedRole !== null || step === 2) && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-600 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Recomeçar</span>
          </button>
        )}
      </div>

      {/* Step 1: Role selection */}
      {step === 1 && (
        <div className="pt-6 space-y-4">
          <p className="font-semibold text-sm sm:text-base text-slate-800">
            Passo 1 de 2: Qual das alternativas melhor descreve sua função principal?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleRoleSelect('gestor')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedRole === 'gestor'
                  ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50/80'
              }`}
            >
              <div className="text-3xl mb-2">🏛️</div>
              <div className="font-bold text-sm text-slate-900">Gestor(a) Público(a)</div>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                Secretarias de Educação, Direção Escolar, Coordenação ou Técnicos.
              </p>
            </button>

            <button
              onClick={() => handleRoleSelect('professor')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedRole === 'professor'
                  ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50/80'
              }`}
            >
              <div className="text-3xl mb-2">👩‍🏫</div>
              <div className="font-bold text-sm text-slate-900">Professora Regente</div>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                Docente que atua na sala de aula comum/regular com estudantes diversos.
              </p>
            </button>

            <button
              onClick={() => handleRoleSelect('familia')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedRole === 'familia'
                  ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50/80'
              }`}
            >
              <div className="text-3xl mb-2">🏡</div>
              <div className="font-bold text-sm text-slate-900">Mãe, Pai ou Responsável</div>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                Familiar ou cuidador de criança/jovem neurodivergente.
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Family AEE Question */}
      {step === 2 && (
        <div className="pt-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg w-fit">
            <span>Passo 2 de 2 • Contexto de Atendimento Escolar</span>
          </div>

          <p className="font-bold text-base text-slate-900">
            A escola do seu filho(a) oferece Atendimento Educacional Especializado (AEE / Sala de Recursos) e ele(a) frequenta esse serviço?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              onClick={() => setHasAEE(true)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                hasAEE === true
                  ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900 mb-1">
                <span className="text-xl">✅</span>
                <span>Sim, frequenta o AEE</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A escola conta com sala de recursos ou profissional de AEE no contraturno e a criança já participa.
              </p>
            </button>

            <button
              onClick={() => setHasAEE(false)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                hasAEE === false
                  ? 'border-rose-600 bg-rose-50 ring-2 ring-rose-500/20'
                  : 'border-slate-200 hover:border-rose-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900 mb-1">
                <span className="text-xl">⚠️</span>
                <span>Não / Ainda não tem AEE</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A escola não oferece sala de recursos, não há vaga ou a criança ainda não acessa o atendimento especializado.
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Result Card Match */}
      {matchedForm && (
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-lg space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Formulário Recomendado Para Você
              </span>
              <span className="text-xs text-slate-300">
                ⏱️ Preenchimento estimado: ~{matchedForm.estimatedMinutes} min
              </span>
            </div>

            <div>
              <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                {matchedForm.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {matchedForm.audienceDescription}
              </p>
            </div>

            {matchedForm.hypothesisCode && (
              <div className="text-xs bg-white/10 px-3 py-1.5 rounded-lg text-amber-200">
                <strong>Pesquisa {matchedForm.hypothesisCode}:</strong> {matchedForm.hypothesisNote}
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={matchedForm.sendUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onSelectForm(matchedForm)}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Abrir Formulário no Google Forms</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => onPreviewForm(matchedForm)}
                className="px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-sm transition-colors cursor-pointer text-center"
              >
                Visualizar na Página
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
