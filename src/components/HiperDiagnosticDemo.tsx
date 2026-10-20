import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  RotateCcw,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Printer,
  ChevronRight,
  Lightbulb,
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';
import {
  DIAGNOSTIC_QUESTIONS,
  DiagnosticAnswers,
  AgeBracket,
  ExpansionReport,
  generateExpansionReport,
  HIPER_PROACTIVE_OPENING
} from '../utils/hiperEngine';

interface Message {
  id: string;
  sender: 'hiper' | 'user';
  text: string;
  isOpening?: boolean;
  questionIndex?: number;
  report?: ExpansionReport;
}

const AGE_BRACKETS: AgeBracket[] = ['até 6', '7 a 10', '11 a 14', '15 ou mais'];

export function HiperDiagnosticDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-0',
      sender: 'hiper',
      text: HIPER_PROACTIVE_OPENING,
      isOpening: true
    }
  ]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number | null>(null);
  const [inputText, setInputText] = useState('');
  const [selectedNickname, setSelectedNickname] = useState('');
  const [selectedAgeBracket, setSelectedAgeBracket] = useState<AgeBracket>('7 a 10');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Partial<DiagnosticAnswers>>({});
  const [generatedReport, setGeneratedReport] = useState<ExpansionReport | null>(null);
  const [copiedReport, setCopiedReport] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatFeedRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTo({
        top: chatFeedRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, generatedReport]);

  const handleStartQuestionnaire = () => {
    setMessages(prev => [
      ...prev,
      { id: `user-start-${Date.now()}`, sender: 'user', text: 'Sim, pode começar! 🚀' }
    ]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setCurrentQuestionIdx(0);
      setMessages(prev => [
        ...prev,
        {
          id: `hiper-q-0`,
          sender: 'hiper',
          text: `Maravilha! Vamos lá:\n\n${DIAGNOSTIC_QUESTIONS[0].promptText}`,
          questionIndex: 0
        }
      ]);
    }, 600);
  };

  const handleExplainModule = () => {
    setMessages(prev => [
      ...prev,
      { id: `user-explain-${Date.now()}`, sender: 'user', text: 'Como funciona este módulo?' },
      {
        id: `hiper-explain-${Date.now()}`,
        sender: 'hiper',
        text: 'O HiperReforço mapeia os hiperfocos da criança para construir "pontes temáticas" em direção a novos conhecimentos, sem romper com o que ela já ama. São 7 perguntas curtas e eu gero um relatório completo com níveis de proximidade (🟢 🟡 🔴) e estratégias de transição. Quer começar agora?'
      }
    ]);
  };

  const handleDecline = () => {
    setMessages(prev => [
      ...prev,
      { id: `user-decline-${Date.now()}`, sender: 'user', text: 'Agora não, obrigado.' },
      {
        id: `hiper-decline-${Date.now()}`,
        sender: 'hiper',
        text: 'Sem problema! Quando quiser, é só chamar. Estarei por aqui.'
      }
    ]);
  };

  const getEmpatheticFeedback = (idx: number, answerText: string): string => {
    switch (idx) {
      case 0:
        return 'Excelente, anotado! Ter essa faixa de idade nos ajuda a calibrar a maturidade das atividades.';
      case 1:
        return `Que tema fascinante! ${answerText.trim()} tem uma riqueza de detalhes enorme para explorarmos.`;
      case 2:
        return 'Muito interessante! Hiperfocos anteriores guardam elos afetivos valiosos para conexões seguras.';
      case 3:
        return 'Perfeito! Esses interesses secundários funcionam como excelentes ramificações de curiosidade.';
      case 4:
        return 'Fundamental saber disso. Nosso compromisso é nunca propor atividades que toquem nessas rejeições.';
      case 5:
        return 'Ótimo mapeamento do canal preferencial de aprendizagem. Vamos priorizar esses formatos.';
      case 6:
        return 'Entendido. Compreender esse desafio é chave para construirmos pontes que reduzam a sobrecarga e o estresse.';
      default:
        return 'Perfeito, compreendido!';
    }
  };

  const handleNicknameAgeSubmit = () => {
    const nick = selectedNickname.trim();
    const bracket = selectedAgeBracket;
    const displayText = nick 
      ? `${nick} • Faixa: ${bracket} anos` 
      : `A criança • Faixa: ${bracket} anos`;

    const updatedAnswers: Partial<DiagnosticAnswers> = {
      ...answers,
      childNickname: nick,
      ageBracket: bracket
    };
    setAnswers(updatedAnswers);

    setMessages(prev => [
      ...prev,
      { id: `user-ans-0`, sender: 'user', text: displayText }
    ]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const empathy = getEmpatheticFeedback(0, displayText);
      setCurrentQuestionIdx(1);
      setMessages(prev => [
        ...prev,
        {
          id: `hiper-q-1`,
          sender: 'hiper',
          text: `${empathy}\n\n${DIAGNOSTIC_QUESTIONS[1].promptText}`,
          questionIndex: 1
        }
      ]);
    }, 600);
  };

  const handleAnswerSubmit = (customText?: string) => {
    if (currentQuestionIdx === null) return;
    const q = DIAGNOSTIC_QUESTIONS[currentQuestionIdx];

    if (q.type === 'nickname_age') {
      handleNicknameAgeSubmit();
      return;
    }

    let answerVal = '';
    if (q.type === 'multiselect') {
      if (selectedStyles.length === 0) return;
      answerVal = selectedStyles.join(', ');
    } else {
      answerVal = (customText || inputText).trim();
      if (!answerVal) return;
    }

    // Map question index to key in answers
    let key: keyof DiagnosticAnswers;
    if (currentQuestionIdx === 1) key = 'currentHyperfocus';
    else if (currentQuestionIdx === 2) key = 'pastHyperfocus';
    else if (currentQuestionIdx === 3) key = 'secondaryInterest';
    else if (currentQuestionIdx === 4) key = 'rejections';
    else if (currentQuestionIdx === 5) key = 'learningStyles';
    else key = 'dailyChallenge';

    const updatedAnswers: Partial<DiagnosticAnswers> = {
      ...answers,
      [key]: q.type === 'multiselect' ? selectedStyles : answerVal
    };
    setAnswers(updatedAnswers);

    setMessages(prev => [
      ...prev,
      {
        id: `user-ans-${currentQuestionIdx}`,
        sender: 'user',
        text: q.type === 'multiselect' 
          ? selectedStyles.map(s => q.options?.find(o => o.id === s)?.label).filter(Boolean).join('\n')
          : answerVal
      }
    ]);

    setInputText('');
    setSelectedStyles([]);

    const nextIdx = currentQuestionIdx + 1;
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const empathy = getEmpatheticFeedback(currentQuestionIdx, answerVal);

      if (nextIdx < DIAGNOSTIC_QUESTIONS.length) {
        setCurrentQuestionIdx(nextIdx);
        const nextQ = DIAGNOSTIC_QUESTIONS[nextIdx];
        setMessages(prev => [
          ...prev,
          {
            id: `hiper-q-${nextIdx}`,
            sender: 'hiper',
            text: `${empathy}\n\n${nextQ.promptText}`,
            questionIndex: nextIdx
          }
        ]);
      } else {
        // All 7 questions completed!
        setCurrentQuestionIdx(null);
        const finalReport = generateExpansionReport(updatedAnswers as DiagnosticAnswers);
        setGeneratedReport(finalReport);

        setMessages(prev => [
          ...prev,
          {
            id: `hiper-complete`,
            sender: 'hiper',
            text: `${empathy}\n\nConcluímos todas as 7 perguntas! Estou gerando o Relatório de Expansão de Hiperfoco com as pontes temáticas personalizadas... ✨`,
            report: finalReport
          }
        ]);
      }
    }, 700);
  };

  const handleLoadSample = (sampleType: 'ferrovias' | 'minecraft' | 'dinossauros') => {
    let sampleAnswers: DiagnosticAnswers;

    if (sampleType === 'ferrovias') {
      sampleAnswers = {
        childNickname: 'L.',
        ageBracket: '7 a 10',
        currentHyperfocus: 'Trens de carga, ferrovias e malha de metrô',
        pastHyperfocus: 'Animais marinhos e tubarões',
        secondaryInterest: 'Mapas de rotas e placas de sinalização',
        rejections: 'Odeia copiar textos longos sem ilustrações e barulhos repentinos',
        learningStyles: ['videos_imagens', 'experimentos_construcoes', 'colecionar_catalogar'],
        dailyChallenge: 'Forte frustração ao interromper a brincadeira de trilhos para o banho ou lição de casa.'
      };
    } else if (sampleType === 'minecraft') {
      sampleAnswers = {
        childNickname: 'S.',
        ageBracket: '7 a 10',
        currentHyperfocus: 'Minecraft, construção de redstone e biomas',
        pastHyperfocus: 'Lego e blocos magnéticos',
        secondaryInterest: 'História medieval e castelos',
        rejections: 'Cálculos mecânicos sem contexto e tarefas sem objetivo claro',
        learningStyles: ['jogos_competicoes', 'experimentos_construcoes', 'historias_narrativas'],
        dailyChallenge: 'Dificuldade de manter o foco em tarefas escolares com pouco estímulo visual.'
      };
    } else {
      sampleAnswers = {
        childNickname: 'E.',
        ageBracket: '7 a 10',
        currentHyperfocus: 'Dinossauros do período Cretáceo e fósseis',
        pastHyperfocus: 'Super-heróis',
        secondaryInterest: 'Desenhar vulcões e colecionar pedras',
        rejections: 'Atividades com regras rígidas de grupo ou muita cobrança de caligrafia',
        learningStyles: ['videos_imagens', 'colecionar_catalogar', 'leitura_escrita'],
        dailyChallenge: 'Dificuldade de conversar com os colegas da turma sobre outros temas além de dinossauros.'
      };
    }

    setAnswers(sampleAnswers);
    const report = generateExpansionReport(sampleAnswers);
    setGeneratedReport(report);
    setCurrentQuestionIdx(null);

    setMessages([
      {
        id: 'msg-sample',
        sender: 'hiper',
        text: `Carregamos o caso ilustrativo com hiperfoco em **${report.currentHyperfocus}** (${report.childAge}). Veja o relatório completo de pontes temáticas gerado abaixo:`,
        report
      }
    ]);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'msg-0',
        sender: 'hiper',
        text: HIPER_PROACTIVE_OPENING,
        isOpening: true
      }
    ]);
    setCurrentQuestionIdx(null);
    setInputText('');
    setSelectedNickname('');
    setSelectedAgeBracket('7 a 10');
    setSelectedStyles([]);
    setAnswers({});
    setGeneratedReport(null);
  };

  const handleCopyMarkdown = async () => {
    if (!generatedReport) return;
    try {
      await navigator.clipboard.writeText(generatedReport.markdown);
      setCopiedReport(true);
      setTimeout(() => setCopiedReport(false), 2500);
    } catch {
      setCopiedReport(true);
      setTimeout(() => setCopiedReport(false), 2500);
    }
  };

  const handleDownloadMarkdown = () => {
    if (!generatedReport) return;
    const blob = new Blob([generatedReport.markdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Relatorio_Expansao_Hiperfoco_${generatedReport.childName.replace(/\s+/g, '_')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentQ = currentQuestionIdx !== null ? DIAGNOSTIC_QUESTIONS[currentQuestionIdx] : null;

  return (
    <div className="space-y-6">
      
      {/* Module Title Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-1.5 shadow-md shrink-0 flex items-center justify-center">
            <img
              src="/assets/aistudio/Logo_Hiper_88795513.png"
              alt="Logo HiperReforço"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Módulo de IA Especializada • HiperReforço</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              HIPER: Questionário & Expansão de Hiperfocos
            </h2>
            <p className="text-indigo-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Experimente ao vivo o motor pedagógico que transforma hiperfocos em portais de curiosidade através de pontes temáticas graduais (Nível 🟢 Adjacente, 🟡 Exploratório e 🔴 Novo Território).
            </p>
          </div>
        </div>

        {/* Fast Sample Buttons */}
        <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-xs border border-white/15 space-y-2 shrink-0">
          <p className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5" />
            Testar com casos pré-configurados:
          </p>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleLoadSample('ferrovias')}
              className="text-xs px-2.5 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium transition-colors cursor-pointer"
            >
              🚂 Caso 1 (Trens)
            </button>
            <button
              onClick={() => handleLoadSample('minecraft')}
              className="text-xs px-2.5 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium transition-colors cursor-pointer"
            >
              🎮 Caso 2 (Minecraft)
            </button>
            <button
              onClick={() => handleLoadSample('dinossauros')}
              className="text-xs px-2.5 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium transition-colors cursor-pointer"
            >
              🦖 Caso 3 (Fósseis)
            </button>
          </div>
        </div>
      </div>

      {/* Persistent Visible Notice (Item 2.4) */}
      <div className="bg-amber-50 border-2 border-amber-300/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-xs">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm text-amber-950 leading-relaxed">
          <p className="font-bold text-amber-900">
            Aviso de Privacidade do Módulo de Demonstração
          </p>
          <p>
            Este é um módulo de demonstração. Nada do que você escrever é enviado ou armazenado — tudo acontece no seu navegador e some ao fechar a página. Ainda assim, não escreva nome completo, diagnóstico, laudo ou CID.
          </p>
        </div>
      </div>

      {/* Interactive Chat & Diagnostic Interface */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden flex flex-col h-[750px] max-h-[85vh]">
        
        {/* Chat Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-xs">
              <img
                src="/assets/aistudio/Logo_Hiper_88795513.png"
                alt="HIPER"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  HIPER • Assistente Diagnóstico
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p className="text-xs text-slate-500">
                {currentQuestionIdx !== null 
                  ? `Pergunta ${currentQuestionIdx + 1} de 7: ${DIAGNOSTIC_QUESTIONS[currentQuestionIdx].label}`
                  : generatedReport 
                    ? 'Relatório de Expansão Gerado com Sucesso'
                    : 'Sessão Pronta para Início'}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetChat}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>

        {/* Chat Messages Feed */}
        <div ref={chatFeedRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          
          {/* In-feed Privacy Reminder above first question (Item 2.4) */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Lembrete:</strong> Este é um módulo de demonstração local. Não escreva nome completo, diagnóstico, laudo ou CID.
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              {msg.sender === 'hiper' && (
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 p-0.5 flex items-center justify-center shrink-0 shadow-xs">
                  <img
                    src="/assets/aistudio/Logo_Hiper_88795513.png"
                    alt="HIPER"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <div className="space-y-3">
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-tl-xs whitespace-pre-line'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Proactive Opening Decision Buttons */}
                {msg.isOpening && currentQuestionIdx === null && !generatedReport && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={handleStartQuestionnaire}
                      className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer"
                    >
                      <span>Sim, pode começar! 🚀</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleExplainModule}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium text-xs transition-colors cursor-pointer"
                    >
                      Como funciona o módulo?
                    </button>
                    <button
                      onClick={handleDecline}
                      className="px-3 py-2 text-slate-400 hover:text-slate-600 rounded-xl text-xs cursor-pointer"
                    >
                      Agora não
                    </button>
                  </div>
                )}

                {/* Render Full Generated Report inside message if available */}
                {msg.report && (
                  <div className="mt-4 p-5 sm:p-6 rounded-3xl bg-white border border-indigo-200 shadow-lg text-slate-900 space-y-6">
                    {/* Top report header */}
                    <div className="pb-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Relatório Oficial de Expansão</span>
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                          🧩 Mapa de Expansão: {msg.report.childName}
                        </h3>
                        <p className="text-xs text-slate-500">
                          Faixa etária: <strong>{msg.report.childAge}</strong> • Hiperfoco Atual: <strong>{msg.report.currentHyperfocus}</strong> • Data: {msg.report.dateStr}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCopyMarkdown}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                          title="Copiar relatório em Markdown"
                        >
                          {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedReport ? 'Copiado!' : 'Copiar'}</span>
                        </button>
                        <button
                          onClick={handleDownloadMarkdown}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold transition-colors cursor-pointer"
                          title="Baixar arquivo .md"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Baixar .md</span>
                        </button>
                        <button
                          onClick={handlePrint}
                          className="p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
                          title="Imprimir relatório"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Section 1: Profile Analysis */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        🔍 Análise do Perfil
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                        {msg.report.profileAnalysis}
                      </p>
                    </div>

                    {/* Section 2: Bridges */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        🌉 Pontes Temáticas Sugeridas ({msg.report.bridges.length} Territórios)
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {msg.report.bridges.map((bridge, bIdx) => (
                          <div
                            key={bIdx}
                            className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2.5"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h5 className="font-bold text-sm text-slate-900 leading-tight">
                                {bridge.emoji} Sugestão {bIdx + 1}: {bridge.title}
                              </h5>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                                bridge.levelTag === 'adjacente'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : bridge.levelTag === 'exploratorio'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-rose-100 text-rose-800'
                              }`}>
                                {bridge.level}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 leading-snug">
                              <strong>Por que faz sentido:</strong> {bridge.whyItMakesSense}
                            </p>

                            <div className="text-[11px] space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700">
                              <p>🎯 <strong>Atividade inicial:</strong> {bridge.initialActivity}</p>
                              <p>📚 <strong>Material sugerido:</strong> {bridge.entryMaterial}</p>
                              <p className="text-indigo-700 font-medium">🔗 <strong>Gancho verbal:</strong> {bridge.hookWithHyperfocus}</p>
                            </div>

                            <p className="text-[10px] text-amber-800 bg-amber-50 px-2 py-1 rounded-lg">
                              ⚠️ <strong>Alerta pedagógico:</strong> {bridge.pedagogicalAlert}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 3: Summary Table */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        📋 Tabela Resumo das Pontes
                      </h4>
                      <div className="overflow-x-auto rounded-xl border border-slate-200">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                            <tr>
                              <th className="p-2.5">#</th>
                              <th className="p-2.5">Tema Sugerido</th>
                              <th className="p-2.5">Nível</th>
                              <th className="p-2.5">Ponte Principal</th>
                              <th className="p-2.5">Formato</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-600">
                            {msg.report.bridges.map((b, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="p-2.5 font-bold text-slate-800">{idx + 1}</td>
                                <td className="p-2.5 font-semibold text-slate-800">{b.title}</td>
                                <td className="p-2.5">{b.emoji}</td>
                                <td className="p-2.5 max-w-[200px] truncate">{b.whyItMakesSense}</td>
                                <td className="p-2.5">{b.preferredFormat}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Section 4: Strategy */}
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-1.5 text-xs text-amber-950">
                      <h5 className="font-bold flex items-center gap-1.5 text-amber-900">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        💡 Estratégia de Transição Recomendada (Regra 80/20)
                      </h5>
                      <p className="leading-relaxed">
                        {msg.report.transitionStrategy}
                      </p>
                    </div>

                    {/* Section 5: What to avoid */}
                    <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/70 space-y-2 text-xs text-rose-950">
                      <h5 className="font-bold text-rose-900">
                        ⚠️ O Que Evitar Para Este Perfil
                      </h5>
                      <ul className="space-y-1 list-disc list-inside">
                        {msg.report.whatToAvoid.map((item, iIdx) => (
                          <li key={iIdx} className="leading-snug">{item}</li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-[11px] text-slate-400 text-center italic pt-2 border-t border-slate-100">
                      Relatório gerado pelo módulo HiperReforço — Expansão de Hiperfocos. Para uso educacional. Não substitui avaliação clínica especializada.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-center text-xs text-slate-400 py-1">
              <div className="w-7 h-7 rounded-xl bg-white border border-slate-200 p-0.5 flex items-center justify-center shadow-xs">
                <img
                  src="/assets/aistudio/Logo_Hiper_88795513.png"
                  alt="HIPER"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="flex gap-1 items-center px-3 py-2 bg-white rounded-xl border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
              </span>
            </div>
          )}
        </div>

        {/* Input Bar / Options for Current Question */}
        {currentQ && (
          <div className="p-4 bg-white border-t border-slate-200 space-y-3">
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Etapa {currentQ.number} de 7: <strong>{currentQ.label}</strong></span>
              <span>{Math.round((currentQ.number / 7) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full transition-all duration-300"
                style={{ width: `${(currentQ.number / 7) * 100}%` }}
              />
            </div>

            {/* Custom UI for Question 1: Nickname (optional) + Age bracket */}
            {currentQ.type === 'nickname_age' ? (
              <div className="space-y-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Como você quer chamar a criança neste relatório? (Opcional)
                  </label>
                  <input
                    type="text"
                    value={selectedNickname}
                    onChange={(e) => setSelectedNickname(e.target.value)}
                    placeholder="Apelido ou iniciais (deixe vazio para usar 'a criança')"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    💡 Use um apelido ou as iniciais. Não escreva o nome completo.
                  </p>
                  <p className="text-[11px] text-amber-700 font-medium mt-1">
                    ⚠️ Não escreva o nome completo nem o diagnóstico da criança.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Faixa de idade da criança:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {AGE_BRACKETS.map((bracket) => (
                      <button
                        key={bracket}
                        type="button"
                        onClick={() => setSelectedAgeBracket(bracket)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                          selectedAgeBracket === bracket
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {bracket} anos
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleNicknameAgeSubmit}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Confirmar e Continuar</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : currentQ.type === 'multiselect' ? (
              /* Multiselect question (Learning styles) */
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {currentQ.options?.map((opt) => {
                    const isSelected = selectedStyles.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setSelectedStyles(prev =>
                            prev.includes(opt.id)
                              ? prev.filter(x => x !== opt.id)
                              : [...prev, opt.id]
                          );
                        }}
                        className={`text-xs p-2 rounded-xl border text-left font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-bold ring-1 ring-indigo-500/20'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <button
                    disabled={selectedStyles.length === 0}
                    onClick={() => handleAnswerSubmit()}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Confirmar Seleção ({selectedStyles.length})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Text Input with mandatory warning below */
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAnswerSubmit();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={currentQ.placeholder}
                    autoFocus
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-800"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold transition-colors cursor-pointer shadow-xs"
                    aria-label="Enviar resposta"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Mandated Notice under free text inputs (Item 2.5) */}
                <p className="text-[11px] text-amber-700 font-medium mt-1.5 flex items-center gap-1">
                  <span>⚠️</span>
                  <span>Não escreva o nome completo nem o diagnóstico da criança.</span>
                </p>

                {currentQ.helperText && (
                  <p className="text-[11px] text-slate-400 mt-1">
                    💡 {currentQ.helperText}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
