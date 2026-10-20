export interface ValidationForm {
  id: string;
  title: string;
  codeName: string;
  category: 'gestao' | 'docente' | 'familia' | 'clinico';
  badge: string;
  badgeColor: string;
  estimatedMinutes: number;
  sendUrl: string;
  audienceHeadline: string;
  audienceDescription: string;
  keyTopics: string[];
}

export const VALIDATION_FORMS: ValidationForm[] = [
  {
    id: 'gestores',
    title: 'Triagem — Gestores Públicos',
    codeName: 'Triagem — Gestores públicos',
    category: 'gestao',
    badge: 'Gestão Educacional',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    estimatedMinutes: 3,
    sendUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScbWQeO9FfnWTOU4PUgzrSe9iPT2iZTo-y7J-vMU_F6QyAoIQ/viewform',
    audienceHeadline: 'Secretários, coordenações de rede e equipes técnicas de educação municipal ou estadual.',
    audienceDescription: 'Secretários, coordenações de rede e equipes técnicas de educação municipal ou estadual.',
    keyTopics: [
      'O que a rede contratou nos últimos 24 meses, e o que segue em uso',
      'Quem participa da decisão de contratar, e de qual rubrica sai',
      'Qual o maior obstáculo hoje para atender às exigências da política de educação especial'
    ]
  },
  {
    id: 'professora-regente',
    title: 'Roteiro A — Professora Regente',
    codeName: 'Roteiro A — Professora regente',
    category: 'docente',
    badge: 'Sala de Aula Regular',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    estimatedMinutes: 10,
    sendUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeoeCA79prPpFm5iE5fAhZ8OF5rifM4KGFhC8DoEKPm6xBLNQ/viewform',
    audienceHeadline: 'Professoras e professores da sala regular que têm estudantes com atendimento educacional especializado.',
    audienceDescription: 'Professoras e professores da sala regular que têm estudantes com atendimento educacional especializado.',
    keyTopics: [
      'Como foi a última vez que você adaptou uma atividade, do começo ao fim',
      'Quanto tempo levou e em que momento do dia',
      'O que você já tentou, e quem te ajuda nisso hoje'
    ]
  },
  {
    id: 'familia-com-aee',
    title: 'Roteiro D — Família com Apoio na Escola',
    codeName: 'Roteiro D — Família com Apoio na Escola',
    category: 'familia',
    badge: 'Família • Com Apoio Especializado',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
    estimatedMinutes: 10,
    sendUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScP_YDK8NDI6D2Ylypj-DFAJQ78yRrKiYCWm4OXsfrXVOUwwg/viewform',
    audienceHeadline: 'Família com apoio especializado na escola',
    audienceDescription: 'Escolha este se seu filho já recebe atendimento especializado na escola — sala de recursos, contraturno ou professora de apoio.',
    keyTopics: [
      'Como foi a última vez que vocês sentaram para estudar em casa',
      'O que foi mais difícil nessa vez',
      'O que vocês já tentaram fora da escola'
    ]
  },
  {
    id: 'familia-sem-aee',
    title: 'Roteiro E — Família sem Apoio na Escola',
    codeName: 'Roteiro E — Família sem Apoio na Escola',
    category: 'familia',
    badge: 'Família • Sem Apoio Especializado',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
    estimatedMinutes: 8,
    sendUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfJubH6LmG-PLZqenwNoxs6dw5BiGiiJEMus2FzD-MFjTh7wQ/viewform',
    audienceHeadline: 'Família sem apoio especializado na escola',
    audienceDescription: 'Escolha este se seu filho ainda não tem atendimento especializado na escola.',
    keyTopics: [
      'Como foi a última vez que vocês sentaram para estudar em casa',
      'O que você faz quando ele trava numa atividade',
      'O que vocês já tentaram fora da escola'
    ]
  },
  {
    id: 'roteiro-g-clinico',
    title: 'Roteiro G — Atendimento Clínico',
    codeName: 'Roteiro G — Atendimento Clínico',
    category: 'clinico',
    badge: 'Clínica & Terapia',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
    estimatedMinutes: 10,
    sendUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScsfRM_33ZV9DDDSBEmOoOqtrQiV2lTo3AGS-eH4RSvdyFtgw/viewform?usp=sharing&ouid=111041022314259236485',
    audienceHeadline: 'Psicopedagogos, psicólogos e demais profissionais que atendem crianças com demandas de aprendizagem.',
    audienceDescription: 'Psicopedagogos, psicólogos e demais profissionais que atendem crianças com demandas de aprendizagem.',
    keyTopics: [
      'Como foi a última vez que você preparou material para um atendimento',
      'O que você indicou a famílias e escolas nos últimos 12 meses',
      'O que você comprou para a sua própria prática'
    ]
  }
];

export type UserRole = 'gestor' | 'professor' | 'familia' | 'clinico';

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
  if (criteria.role === 'clinico') {
    return VALIDATION_FORMS[4];
  }
  if (criteria.role === 'familia') {
    return criteria.hasAEE ? VALIDATION_FORMS[2] : VALIDATION_FORMS[3];
  }
  return VALIDATION_FORMS[0];
}
