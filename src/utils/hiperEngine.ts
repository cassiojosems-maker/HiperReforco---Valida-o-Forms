export interface DiagnosticQuestion {
  id: string;
  number: number;
  label: string;
  promptText: string;
  helperText?: string;
  placeholder: string;
  type: 'text' | 'multiselect' | 'select';
  options?: { id: string; label: string }[];
}

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    number: 1,
    id: 'p1',
    label: 'Nome e Idade',
    promptText: 'Qual é o nome da criança e quantos anos ela tem?',
    placeholder: 'Ex: Lucas, 8 anos',
    type: 'text',
    helperText: 'Ajuda a personalizar as pontes e calibrar a maturidade das atividades.'
  },
  {
    number: 2,
    id: 'p2',
    label: 'Hiperfoco Principal',
    promptText: 'Qual é o hiperfoco PRINCIPAL dela agora? (pode ser um assunto, personagem, jogo, animal, veículo, etc.)',
    placeholder: 'Ex: Trens e ferrovias, Dinossauros, Minecraft, Sistema Solar, Pokémons...',
    type: 'text',
    helperText: 'O tema que mais ativa os olhos e a energia da criança.'
  },
  {
    number: 3,
    id: 'p3',
    label: 'Intensidade e Tempo',
    promptText: 'Há quanto tempo ela se interessa por esse tema? E o quanto ele domina as conversas, brincadeiras ou desenhos dela no dia a dia?',
    placeholder: 'Ex: Há cerca de 1 ano. Praticamente 90% das brincadeiras e conversas giram em torno disso.',
    type: 'text'
  },
  {
    number: 4,
    id: 'p4',
    label: 'Hiperfoco Anterior',
    promptText: 'Já existiu algum hiperfoco ANTERIOR que ela amava e hoje não menciona mais? Qual?',
    placeholder: 'Ex: Antes eram animais marinhos / tubarões, ou blocos de montar lego (ou "Nenhum anterior marcante")',
    type: 'text',
    helperText: 'Hiperfocos antigos são minas de ouro para conexões seguras de Nível Adjacente.'
  },
  {
    number: 5,
    id: 'p5',
    label: 'Assunto Secundário',
    promptText: 'Existe algum assunto secundário que ela demonstra interesse, mesmo que bem menor? (pode ser algo que ela só menciona de vez em quando)',
    placeholder: 'Ex: Curte carros de bombeiro, gosta de desenhar mapas, ouve músicas eletrônicas...',
    type: 'text'
  },
  {
    number: 6,
    id: 'p6',
    label: 'Rejeições Críticas',
    promptText: 'O que a criança DEFINITIVAMENTE não gosta ou rejeita? (temas, formatos, situações)',
    placeholder: 'Ex: Odeia copiar textos longos, rejeita temas de princesas, não gosta de barulhos altos ou esportes coletivos...',
    type: 'text',
    helperText: 'Regra de ouro: nunca iremos sugerir pontes que toquem nessas rejeições.'
  },
  {
    number: 7,
    id: 'p7',
    label: 'Estilo de Aprendizagem',
    promptText: 'Como ela aprende melhor? Marque os que se aplicam:',
    placeholder: 'Selecione as opções que mais engajam a criança',
    type: 'multiselect',
    options: [
      { id: 'videos_imagens', label: '(a) Vídeos e imagens' },
      { id: 'historias_narrativas', label: '(b) Histórias e narrativas' },
      { id: 'experimentos_construcoes', label: '(c) Experimentos e construções' },
      { id: 'musicas_ritmos', label: '(d) Músicas e ritmos' },
      { id: 'leitura_escrita', label: '(e) Leitura e escrita' },
      { id: 'jogos_competicoes', label: '(f) Jogos e competições' },
      { id: 'colecionar_catalogar', label: '(g) Colecionar e catalogar' },
      { id: 'outro', label: '(h) Outro formato prático' }
    ]
  },
  {
    number: 8,
    id: 'p8',
    label: 'Contexto Escolar',
    promptText: 'Qual é o ano escolar/série da criança? Ela está em escola regular, AEE, escola especial ou ensino domiciliar?',
    placeholder: 'Ex: 3º ano do Ensino Fundamental em escola regular com AEE 2x por semana',
    type: 'text'
  },
  {
    number: 9,
    id: 'p9',
    label: 'Diagnóstico (Opcional)',
    promptText: 'A criança tem diagnóstico confirmado? (TDAH, TEA, Altas Habilidades, outro) — esta informação é opcional, mas ajuda a calibrar as sugestões.',
    placeholder: 'Ex: TEA Nível 1 de suporte, TDAH desatento, Dupla Excepcionalidade, Em investigação...',
    type: 'text',
    helperText: 'Calibra a sensibilidade sensorial e a cadência de transição.'
  },
  {
    number: 10,
    id: 'p10',
    label: 'Maior Desafio Diário',
    promptText: 'Qual é o maior DESAFIO atual no dia a dia dela relacionado ao hiperfoco? (ex: não consegue parar para fazer outras atividades, se frustra quando o assunto muda, não interage com crianças que não compartilham o tema, etc.)',
    placeholder: 'Ex: Crises de frustração quando precisa mudar de atividade para o dever de casa; isolamento social nos intervalos.',
    type: 'text'
  }
];

export interface DiagnosticAnswers {
  p1_childNameAge: string;
  p2_currentHyperfocus: string;
  p3_durationIntensity: string;
  p4_pastHyperfocus: string;
  p5_secondaryInterest: string;
  p6_rejections: string;
  p7_learningStyles: string[];
  p8_schoolContext: string;
  p9_diagnosisOptional: string;
  p10_dailyChallenge: string;
}

export interface ThematicBridge {
  emoji: string;
  title: string;
  level: '🟢 Adjacente' | '🟡 Exploratório' | '🔴 Novo Território';
  levelTag: 'adjacente' | 'exploratorio' | 'novo';
  whyItMakesSense: string;
  initialActivity: string;
  entryMaterial: string;
  hookWithHyperfocus: string;
  pedagogicalAlert: string;
  preferredFormat: string;
}

export interface ExpansionReport {
  childName: string;
  childAge: string;
  currentHyperfocus: string;
  dateStr: string;
  profileAnalysis: string;
  bridges: ThematicBridge[];
  transitionStrategy: string;
  whatToAvoid: string[];
  markdown: string;
}

export const HIPER_PROACTIVE_OPENING = `E aí — que tal a gente tentar algo diferente hoje? 🚀
Tenho aqui um jeito de descobrir novos assuntos que podem combinar super bem com o que a criança já curte.
São só algumas perguntinhas rápidas e eu monto um mapa de novos territórios pra explorar.
Posso começar?`;

export function parseNameAndAge(p1: string): { name: string; age: string } {
  const clean = p1.trim();
  const match = clean.match(/^([^,]+)(?:,\s*(\d+.*))?$/);
  if (match) {
    const name = match[1].trim();
    const age = match[2] ? match[2].trim() : 'idade informada';
    return { name, age };
  }
  return { name: clean || 'Estudante', age: 'em idade escolar' };
}

export function generateExpansionReport(answers: DiagnosticAnswers): ExpansionReport {
  const { name, age } = parseNameAndAge(answers.p1_childNameAge || 'A criança');
  const focus = answers.p2_currentHyperfocus.trim() || 'o tema de interesse central';
  const pastFocus = answers.p4_pastHyperfocus.trim();
  const secondary = answers.p5_secondaryInterest.trim();
  const rejections = answers.p6_rejections.trim();
  const challenge = answers.p10_dailyChallenge.trim() || 'transição entre atividades e flexibilidade atencional';

  const styles = (answers.p7_learningStyles || []).map(s => {
    const found = DIAGNOSTIC_QUESTIONS[6].options?.find(o => o.id === s);
    return found ? found.label.replace(/^\([a-z]\)\s*/, '') : s;
  });
  const stylesText = styles.length > 0 ? styles.join(', ') : 'estímulos visuais e atividades práticas';

  const dateStr = new Date().toLocaleDateString('pt-BR');

  // Profile Analysis paragraph (4-6 lines)
  const profileAnalysis = `${name} apresenta um perfil de vinculação atencional profunda e altamente mobilizado por ${focus}, demonstrando retenção e motivação intrínseca quando imerso em seu centro de interesse. Sua curva de absorção cognitiva é potencializada através de ${stylesText}, demandando pontes claras de significado que conectem novos conteúdos ao seu repertório consolidado. O desengajamento ocorre principalmente sob ${rejections || 'pressões de ruptura abrupta ou tarefas desprovidas de contexto visual/prático'}, sendo essencial preservar a previsibilidade da transição. A oportunidade central de expansão consiste em utilizar o vocabulário e a mecânica de ${focus} como âncora afetiva para franquear o acesso a territórios conexos de investigação científica, espacial e narrativa.`;

  // Generate Bridges
  const bridges: ThematicBridge[] = [];

  // Bridge 1: Adjacente (verde) - compartilha elemento direto
  const hasPast = pastFocus && !pastFocus.toLowerCase().includes('nenhum') && !pastFocus.toLowerCase().includes('não');
  const adjName = hasPast ? `Ressignificação: ${pastFocus} & ${focus}` : `Engenharia e Bastidores de ${focus}`;
  bridges.push({
    emoji: '🟢',
    title: adjName,
    level: '🟢 Adjacente',
    levelTag: 'adjacente',
    whyItMakesSense: `Conecta a familiaridade absoluta de ${focus} com aspectos estruturais, mecanismos ou sistemas de funcionamento, mantendo 100% de segurança cognitiva sem gerar sensação de mudança de tema.`,
    initialActivity: `Mapear visualmente "como funciona por dentro" ou criar um catálogo ilustrado de 3 componentes essenciais de ${focus}.`,
    entryMaterial: `Infográfico ilustrado de alta definição ou vídeo curto em câmera lenta demonstrando os bastidores técnicos.`,
    hookWithHyperfocus: `"Você já reparou em como esse detalhe específico de ${focus} foi projetado para funcionar sem falhar?"`,
    pedagogicalAlert: `Não exija formalização escrita precoce; priorize a observação atenta e a catalogação dos elementos favoritos da criança.`,
    preferredFormat: styles[0] || 'Vídeos e imagens'
  });

  // Bridge 2: Adjacente ou Exploratório baseado no interesse secundário
  const bridge2Title = secondary ? `Cruzamento de Universos: ${focus} + ${secondary}` : `Geografia e Rotas de ${focus}`;
  bridges.push({
    emoji: '🟡',
    title: bridge2Title,
    level: '🟡 Exploratório',
    levelTag: 'exploratorio',
    whyItMakesSense: secondary 
      ? `Utiliza o interesse latente por ${secondary} como alavanca de curvatura suave, sem concorrer com a energia investida em ${focus}.`
      : `Expande o olhar de ${focus} para a escala espacial: de onde vêm, para onde vão e como se organizam no espaço físico ou cartográfico.`,
    initialActivity: `Desenhar um mapa esquemático ou linha do tempo conectando diferentes cenários ou missões relacionadas a ${focus}.`,
    entryMaterial: `Mapa interativo simples, atlas ilustrado temático ou aplicativo com navegação visual em camadas.`,
    hookWithHyperfocus: `"Se a gente tivesse que traçar a rota perfeita ou construir a base ideal para ${focus}, onde ela ficaria no mapa?"`,
    pedagogicalAlert: `Se houver frustração ao desviar o foco, retorne imediatamente à imagem ou personagem de ancoragem antes de prosseguir.`,
    preferredFormat: styles[1] || 'Experimentos e construções'
  });

  // Bridge 3: Exploratório - Ciência ou Narrativa aplicada
  bridges.push({
    emoji: '🟡',
    title: `Desafios de Criação e Simulação`,
    level: '🟡 Exploratório',
    levelTag: 'exploratorio',
    whyItMakesSense: `Transforma a postura de espectador ou colecionador de ${name} em uma postura de construtor e solucionador de problemas reais inspirados em ${focus}.`,
    initialActivity: `Criar um pequeno protótipo com materiais recicláveis ou montar um cenário tridimensional com regras próprias.`,
    entryMaterial: `Kit simples de blocos/sucata com cartões de missões contendo desafios de 5 a 10 minutos de duração.`,
    hookWithHyperfocus: `"Qual é o maior obstáculo que existe hoje em ${focus} e como a sua invenção poderia resolver isso?"`,
    pedagogicalAlert: `Focalize o processo investigativo e não a perfeição estética do produto final para evitar sobrecarga de rigidez.`,
    preferredFormat: styles[2] || 'Jogos e competições'
  });

  // Bridge 4: Novo Território (vermelho) - gancho emocional com universo mais amplo
  bridges.push({
    emoji: '🔴',
    title: `Expedições e Narrativas do Mundo Real`,
    level: '🔴 Novo Território',
    levelTag: 'novo',
    whyItMakesSense: `Embora explore um ecossistema inteiramente novo (biodiversidade, astronomia ou tecnologias do futuro), mantém a sensação de descoberta investigativa que torna o hiperfoco tão fascinante.`,
    initialActivity: `Assistir a um trecho de 4 minutos de documentário de alta qualidade ou folhear um livro de curiosidades extremas com fatos surpreendentes.`,
    entryMaterial: `Livro ilustrado de grandes exploradores ou série documental com ritmo ágil e riqueza sonora/visual.`,
    hookWithHyperfocus: `"Você sabia que os cientistas usam a mesma lógica que você ama em ${focus} para explorar as profundezas do oceano e o espaço?"`,
    pedagogicalAlert: `Apresente como convite opcional; nunca imponha como tarefa obrigatória ou substituição ao hiperfoco original.`,
    preferredFormat: 'Histórias e narrativas'
  });

  // Transition Strategy
  const transitionStrategy = `A regra de ouro com ${name} é a 'Regra 80/20 de Acolhimento': reserve 80% do tempo de atividade para a validação calorosa de ${focus} e utilize pequenas janelas de 5 a 10 minutos para inaugurar a ponte sugerida. O gatilho de transição deve sempre partir de uma pergunta de curiosidade formulada pela própria criança, e nunca de um comando diretivo de interrupção ('agora chega de ${focus}'). Sinais claros de receptividade incluem perguntas de desdobramento, contato visual sustentado com o novo material e tentativa autônoma de relacionar o novo tema à sua coleção ou brincadeira habitual. Havendo rigidez ou tensão, celebre o esforço e encerre a janela com acolhimento.`;

  // What to avoid
  const whatToAvoid = [
    `Interrupções súbitas sem aviso prévio de tempo (sempre utilize um timer visual ou contagem regressiva de 3 e 1 minuto).`,
    `Tentar suprimir ou desvalorizar ${focus} como se fosse perda de tempo ('você só fala disso'). O hiperfoco é a identidade afetiva da aprendizagem.`,
    `Exigir produções em formatos expressamente rejeitados (${rejections || 'longas cópias em folha branca ou tarefas estritamente auditivas'}).`,
    `Competições de velocidade que penalizem o tempo de processamento ou estimulem a frustração ao mudar de assunto.`
  ];

  // Markdown output
  let markdown = `---

# 🧩 Relatório de Expansão de Hiperfoco
**Criança:** ${name} | **Idade:** ${age} | **Hiperfoco atual:** ${focus}
**Data:** ${dateStr}

---

## 🔍 Análise do Perfil

${profileAnalysis}

---

## 🌉 Pontes Temáticas Sugeridas

`;

  bridges.forEach((b, idx) => {
    markdown += `### ${b.emoji} Sugestão ${idx + 1}: ${b.title}
**Nível de proximidade:** [${b.level}]
**Por que faz sentido para ${name}:** ${b.whyItMakesSense}
**Como introduzir:**
- 🎯 Atividade inicial (curta, baixo risco): ${b.initialActivity}
- 📚 Material de entrada sugerido: ${b.entryMaterial}
- 🔗 Gancho com o hiperfoco atual: ${b.hookWithHyperfocus}
**Alerta pedagógico:** ${b.pedagogicalAlert}

`;
  });

  markdown += `---

## 📋 Tabela Resumo

| # | Tema Sugerido | Nível | Ponte Principal | Formato Preferencial |
|---|--------------|-------|-----------------|----------------------|
`;

  bridges.forEach((b, idx) => {
    markdown += `| ${idx + 1} | ${b.title} | ${b.emoji} | ${b.whyItMakesSense.slice(0, 48)}... | ${b.preferredFormat} |\n`;
  });

  markdown += `
---

## 💡 Estratégia de Transição Recomendada

${transitionStrategy}

---

## ⚠️ O Que Evitar

`;

  whatToAvoid.forEach(item => {
    markdown += `- ${item}\n`;
  });

  markdown += `
---

*Relatório gerado pelo módulo HiperReforço — Expansão de Hiperfocos*
*Para uso educacional. Não substitui avaliação clínica especializada.*

---
`;

  return {
    childName: name,
    childAge: age,
    currentHyperfocus: focus,
    dateStr,
    profileAnalysis,
    bridges,
    transitionStrategy,
    whatToAvoid,
    markdown
  };
}
