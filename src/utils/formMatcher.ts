export interface ValidationForm {
  id: string;
  title: string;
  codeName: string;
  category: 'gestao' | 'docente' | 'familia';
  badge: string;
  badgeColor: string;
  estimatedMinutes: number;
  sendUrl: string;
  editUrl: string;
  audienceHeadline: string;
  audienceDescription: string;
  keyTopics: string[];
  hypothesisCode?: string;
  hypothesisNote?: string;
}

export const VALIDATION_FORMS: ValidationForm[] = [
  {
    id: 'gestores',
    title: 'Triagem — Gestores Públicos',
    codeName: 'Triagem — Gestores públicos',
    category: 'gestao',
    badge: 'Gestão Educacional',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    estimatedMinutes: 5,
    sendUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScbWQeO9FfnWTOU4PUgzrSe9iPT2iZTo-y7J-vMU_F6QyAoIQ/viewform',
    editUrl: 'https://docs.google.com/forms/d/1HkpHEAFiYNHJaIWlsPUOUcFQsSw7mpGoYaNGmSVNNV0/edit',
    audienceHeadline: 'Secretarias de Educação, Diretores, Coordenadores e Técnicos',
    audienceDescription: 'Para lideranças de redes municipais ou estaduais, coordenações pedagógicas e gestores de políticas públicas inclusivas.',
    keyTopics: [
      'Políticas de inclusão e infraestrutura das redes de ensino',
      'Desafios de capacitação e retenção de docentes na educação especial',
      'Interesse institucional em soluções EdTech/GovTech de baixo custo'
    ]
  },
  {
    id: 'professora-regente',
    title: 'Roteiro A — Professora Regente',
    codeName: 'Roteiro A — Professora regente',
    category: 'docente',
    badge: 'Sala de Aula Regular',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    estimatedMinutes: 4,
    sendUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeoeCA79prPpFm5iE5fAhZ8OF5rifM4KGFhC8DoEKPm6xBLNQ/viewform',
    editUrl: 'https://docs.google.com/forms/d/1g8p0ZXJ3AcDVinMEarMiUKPNNX6eyLXU0hOZ5Jz9zxU/edit',
    audienceHeadline: 'Professoras e Professores da Rede Regular de Ensino',
    audienceDescription: 'Para educadores que lecionam na sala regular e recebem estudantes neurodivergentes (TEA, TDAH, AH/SD e correlatos).',
    keyTopics: [
      'Manejo diário de atenção e engajamento da turma',
      'Articulação entre a sala regular e a sala de recursos',
      'Adaptação curricular sem sobrecarga de trabalho docente'
    ]
  },
  {
    id: 'familia-com-aee',
    title: 'Roteiro D — Família com AEE',
    codeName: 'Roteiro D — Família com AEE',
    category: 'familia',
    badge: 'Família • Com Atendimento AEE',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
    estimatedMinutes: 4,
    sendUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScP_YDK8NDI6D2Ylypj-DFAJQ78yRrKiYCWm4OXsfrXVOUwwg/viewform',
    editUrl: 'https://docs.google.com/forms/d/1Ffofe3Gm3UtEf4vjiFPFXizGh512DygvqQgSUoPQZ9M/edit',
    audienceHeadline: 'Mães, Pais e Responsáveis cujo filho(a) frequenta AEE',
    audienceDescription: 'Para famílias de crianças neurodivergentes que contam com suporte de Sala de Recursos Multifuncionais / Atendimento Especializado.',
    keyTopics: [
      'Percepção da evolução e conexão com a equipe do AEE',
      'Aproveitamento dos interesses da criança nas atividades de contraturno',
      'Continuidade das estratégias de aprendizagem em casa'
    ]
  },
  {
    id: 'familia-sem-aee',
    title: 'Roteiro E — Família sem AEE',
    codeName: 'Roteiro E — Família sem AEE (H6)',
    category: 'familia',
    badge: 'Família • Sem Atendimento AEE',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
    estimatedMinutes: 4,
    sendUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfJubH6LmG-PLZqenwNoxs6dw5BiGiiJEMus2FzD-MFjTh7wQ/viewform',
    editUrl: 'https://docs.google.com/forms/d/11z8YDpfCbJOAGeVKuo0AT9MKhuSjUJe9zBSE4DEcgDQ/edit',
    hypothesisCode: 'H6',
    hypothesisNote: 'Validação da hipótese de lacuna de suporte pedagógico especializado e sobrecarga familiar.',
    audienceHeadline: 'Mães, Pais e Responsáveis SEM suporte de AEE na escola',
    audienceDescription: 'Para famílias de crianças neurodivergentes cuja escola ainda NÃO disponibiliza AEE, sala de recursos ou vaga especializada.',
    keyTopics: [
      'Barreiras de acesso ao atendimento especializado',
      'Estratégias autônomas criadas pela família no dia a dia',
      'Necessidade de ferramentas acessíveis para guiar o aprendizado'
    ]
  }
];

export const DRIVE_FOLDER_URL = 'https://drive.google.com/drive/folders/1WXnygC9_oHrRTT5DK0d5ab6SD5mGRwh8';

export type UserRole = 'gestor' | 'professor' | 'familia';

export interface FormMatchCriteria {
  role: UserRole;
  hasAEE?: boolean;
}

export function matchForm(criteria: FormMatchCriteria): ValidationForm {
  if (criteria.role === 'gestor') {
    return VALIDATION_FORMS[0];
  }
  if (criteria.role === 'professor') {
    return VALIDATION_FORMS[1];
  }
  if (criteria.role === 'familia') {
    return criteria.hasAEE ? VALIDATION_FORMS[2] : VALIDATION_FORMS[3];
  }
  return VALIDATION_FORMS[0];
}
