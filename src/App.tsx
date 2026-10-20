import React, { useState } from 'react';
import { Lock, X, KeyRound } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FormSelectorWizard } from './components/FormSelectorWizard';
import { FormCardsGrid } from './components/FormCardsGrid';
import { FormModal } from './components/FormModal';
import { QrCodeModal } from './components/QrCodeModal';
import { HiperDiagnosticDemo } from './components/HiperDiagnosticDemo';
import { TeamPanel } from './components/TeamPanel';
import { Footer } from './components/Footer';
import { ValidationForm } from './utils/formMatcher';

const ADMIN_PIN = 'hiper2026';

export default function App() {
  const initialAdminFromUrl =
    typeof window !== 'undefined' &&
    (window.location.search.includes('admin=1') || window.location.hash.includes('admin'));

  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(initialAdminFromUrl);
  const [activeTab, setActiveTabState] = useState<'forms' | 'wizard' | 'hiper' | 'team'>(
    initialAdminFromUrl ? 'team' : 'forms'
  );
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [previewForm, setPreviewForm] = useState<ValidationForm | null>(null);
  const [qrForm, setQrForm] = useState<ValidationForm | null>(null);
  const [highlightedFormId, setHighlightedFormId] = useState<string | null>(null);

  // Admin unlock modal state
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const setActiveTab = (tab: 'forms' | 'wizard' | 'hiper' | 'team') => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdminAccess = () => {
    if (isAdminUnlocked) {
      setActiveTab('team');
    } else {
      setPinInput('');
      setPinError(false);
      setShowAdminModal(true);
    }
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim().toLowerCase() === ADMIN_PIN) {
      setIsAdminUnlocked(true);
      setShowAdminModal(false);
      setPinInput('');
      setPinError(false);
      setActiveTab('team');
    } else {
      setPinError(true);
    }
  };

  const handleLockAdmin = () => {
    setIsAdminUnlocked(false);
    setActiveTab('forms');
  };

  const handleSelectRoleQuick = (formId: string) => {
    setActiveTab('forms');
    setHighlightedFormId(formId);
    setTimeout(() => {
      const el = document.getElementById(`form-card-${formId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleSelectFormFromWizard = (form: ValidationForm) => {
    setActiveTab('forms');
    setHighlightedFormId(form.id);
    setTimeout(() => {
      const el = document.getElementById(`form-card-${form.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
    } ${
      highContrast ? 'bg-black text-white' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        isAdminUnlocked={isAdminUnlocked}
      />

      {/* Hero Section (only when on forms or wizard tab for clean immersion) */}
      {(activeTab === 'forms' || activeTab === 'wizard') && (
        <Hero
          onSelectRoleQuick={handleSelectRoleQuick}
          onOpenWizard={() => setActiveTab('wizard')}
          highContrast={highContrast}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Tab 1: Forms Selection Grid */}
        {activeTab === 'forms' && (
          <div className="space-y-12">
            <FormCardsGrid
              onOpenPreview={(form) => setPreviewForm(form)}
              onOpenQr={(form) => setQrForm(form)}
              highlightedFormId={highlightedFormId}
            />

            {/* Quick helper callout below grid */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-50 to-amber-50/60 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-extrabold text-base text-slate-900">
                  Quer ver como funciona a tecnologia do HiperReforço na prática?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Experimente o assistente HIPER que transforma o hiperfoco da criança em um Relatório de Expansão Pedagógica com pontes temáticas.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('hiper')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 cursor-pointer"
              >
                Testar Módulo HIPER →
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Wizard */}
        {activeTab === 'wizard' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Seletor Guiado
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Encontre o Formulário Perfeito para Você
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Criamos perguntas personalizadas para cada perfil de modo a respeitar o seu tempo e coletar dados precisos para a pesquisa.
              </p>
            </div>

            <FormSelectorWizard
              onSelectForm={handleSelectFormFromWizard}
              onPreviewForm={(form) => setPreviewForm(form)}
            />
          </div>
        )}

        {/* Tab 3: HIPER Assistant & Diagnostic Demo */}
        {activeTab === 'hiper' && (
          <HiperDiagnosticDemo />
        )}

        {/* Tab 4: Research Team & Drive Panel (Protected) */}
        {activeTab === 'team' && isAdminUnlocked && (
          <div className="space-y-4">
            <div className="flex justify-end max-w-5xl mx-auto">
              <button
                onClick={handleLockAdmin}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Ocultar Painel da Coordenação</span>
              </button>
            </div>
            <TeamPanel />
          </div>
        )}

      </main>

      {/* Global Modals */}
      <FormModal
        form={previewForm}
        onClose={() => setPreviewForm(null)}
      />

      <QrCodeModal
        form={qrForm}
        onClose={() => setQrForm(null)}
      />

      {/* Admin Access Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 relative">
            <button
              onClick={() => setShowAdminModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Acesso da Coordenação
                </h3>
                <p className="text-xs text-slate-500">
                  Painel Administrativo & Google Drive
                </p>
              </div>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chave de acesso da pesquisa:
                </label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Digite a chave..."
                  autoFocus
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-900"
                />
                {pinError && (
                  <p className="text-xs text-rose-600 font-medium mt-1">
                    Chave incorreta. Tente novamente.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-sm cursor-pointer"
              >
                Desbloquear Painel da Pesquisa
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer
        onOpenAdminAccess={handleOpenAdminAccess}
        isAdminUnlocked={isAdminUnlocked}
      />

    </div>
  );
}
