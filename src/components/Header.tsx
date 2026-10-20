import React from 'react';
import { Sparkles, FileText, Compass, Bot, FolderLock, ZoomIn, ZoomOut, Contrast, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: 'forms' | 'wizard' | 'hiper' | 'team';
  setActiveTab: (tab: 'forms' | 'wizard' | 'hiper' | 'team') => void;
  fontSize: 'normal' | 'large';
  setFontSize: React.Dispatch<React.SetStateAction<'normal' | 'large'>>;
  highContrast: boolean;
  setHighContrast: React.Dispatch<React.SetStateAction<boolean>>;
  isAdminUnlocked?: boolean;
}

export function Header({
  activeTab,
  setActiveTab,
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
  isAdminUnlocked = false
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'forms' as const, label: 'Formulários', icon: FileText, count: '5' },
    { id: 'wizard' as const, label: 'Descubra o Seu', icon: Compass },
    { id: 'hiper' as const, label: 'Módulo HIPER', icon: Bot, highlight: true },
    ...(isAdminUnlocked ? [{ id: 'team' as const, label: 'Painel da Pesquisa', icon: FolderLock }] : [])
  ];

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
      highContrast 
        ? 'bg-black text-white border-yellow-400' 
        : 'bg-white/95 text-slate-800 border-slate-200 shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('forms')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-slate-200/90 shadow-sm p-1 flex items-center justify-center group-hover:scale-105 group-hover:border-indigo-300 transition-all">
              <img
                src="/assets/aistudio/Logo_Hiper_88795513.png"
                alt="Logo HiperReforço"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-indigo-700 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
                  HiperReforço
                </span>
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Validação
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Portal de Direcionamento de Formulários & Diagnóstico
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? item.highlight
                        ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                        : 'bg-slate-100 text-indigo-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.count && (
                    <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-200/80 text-slate-600'
                    }`}>
                      {item.count}
                    </span>
                  )}
                  {item.highlight && !isActive && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Accessibility & Action Controls */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200/70">
              <button
                onClick={() => setFontSize(prev => prev === 'normal' ? 'large' : 'normal')}
                aria-label="Alternar tamanho da fonte"
                title={fontSize === 'normal' ? 'Aumentar tamanho do texto' : 'Tamanho de texto normal'}
                className={`p-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-colors ${
                  fontSize === 'large' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {fontSize === 'normal' ? <ZoomIn className="w-4 h-4" /> : <ZoomOut className="w-4 h-4" />}
                <span className="text-[11px]">Fonte {fontSize === 'large' ? '+15%' : 'A'}</span>
              </button>

              <button
                onClick={() => setHighContrast(prev => !prev)}
                aria-label="Alternar alto contraste"
                title="Modo alto contraste para maior legibilidade"
                className={`p-1.5 rounded transition-colors ${
                  highContrast ? 'bg-yellow-400 text-black' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Contrast className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-indigo-800 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.count} opções
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Acessibilidade:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setFontSize(prev => prev === 'normal' ? 'large' : 'normal')}
                className="px-2.5 py-1.5 bg-slate-100 rounded-md font-medium text-slate-700"
              >
                Fonte: {fontSize === 'large' ? 'Grande' : 'Normal'}
              </button>
              <button
                onClick={() => setHighContrast(prev => !prev)}
                className="px-2.5 py-1.5 bg-slate-100 rounded-md font-medium text-slate-700"
              >
                {highContrast ? 'Contraste Alto' : 'Contraste Normal'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
