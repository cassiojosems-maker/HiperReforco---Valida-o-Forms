import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FormSelectorWizard } from './components/FormSelectorWizard';
import { FormCardsGrid } from './components/FormCardsGrid';
import { FormModal } from './components/FormModal';
import { QrCodeModal } from './components/QrCodeModal';
import { HiperDiagnosticDemo } from './components/HiperDiagnosticDemo';
import { TeamPanel } from './components/TeamPanel';
import { Footer } from './components/Footer';
import { ValidationForm, VALIDATION_FORMS } from './utils/formMatcher';

export default function App() {
  const [activeTab, setActiveTabState] = useState<'forms' | 'wizard' | 'hiper' | 'team'>('forms');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [previewForm, setPreviewForm] = useState<ValidationForm | null>(null);
  const [qrForm, setQrForm] = useState<ValidationForm | null>(null);
  const [highlightedFormId, setHighlightedFormId] = useState<string | null>(null);

  const setActiveTab = (tab: 'forms' | 'wizard' | 'hiper' | 'team') => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

        {/* Tab 4: Research Team & Drive Panel */}
        {activeTab === 'team' && (
          <TeamPanel />
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

      {/* Global Footer */}
      <Footer />

    </div>
  );
}
