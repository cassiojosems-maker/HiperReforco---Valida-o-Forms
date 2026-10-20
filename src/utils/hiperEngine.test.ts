import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DIAGNOSTIC_QUESTIONS,
  generateExpansionReport,
  HIPER_PROACTIVE_OPENING
} from './hiperEngine.ts';

test('diagnostic questions are 7 questions in exact order with p3, p8, p9 removed', () => {
  assert.equal(DIAGNOSTIC_QUESTIONS.length, 7);
  assert.equal(DIAGNOSTIC_QUESTIONS[0].id, 'p1');
  assert.equal(DIAGNOSTIC_QUESTIONS[0].type, 'nickname_age');
  assert.equal(DIAGNOSTIC_QUESTIONS[1].id, 'p2');
  assert.equal(DIAGNOSTIC_QUESTIONS[2].id, 'p4');
  assert.equal(DIAGNOSTIC_QUESTIONS[3].id, 'p5');
  assert.equal(DIAGNOSTIC_QUESTIONS[4].id, 'p6');
  assert.equal(DIAGNOSTIC_QUESTIONS[5].id, 'p7');
  assert.equal(DIAGNOSTIC_QUESTIONS[6].id, 'p10');
  
  // Verify that p3, p8, p9 do not exist
  assert.ok(!DIAGNOSTIC_QUESTIONS.some(q => q.id === 'p3'));
  assert.ok(!DIAGNOSTIC_QUESTIONS.some(q => q.id === 'p8'));
  assert.ok(!DIAGNOSTIC_QUESTIONS.some(q => q.id === 'p9'));
  
  // Verify learning styles options exist
  assert.ok(DIAGNOSTIC_QUESTIONS[5].options && DIAGNOSTIC_QUESTIONS[5].options.length >= 7);
});

test('generateExpansionReport builds report with nickname and age bracket', () => {
  const report = generateExpansionReport({
    childNickname: 'G.',
    ageBracket: '7 a 10',
    currentHyperfocus: 'Sistemas Ferroviários e Metrô',
    pastHyperfocus: 'Dinossauros do período Cretáceo',
    secondaryInterest: 'Mapas e rotas de GPS',
    rejections: 'Textos longos sem imagens e atividades barulhentas',
    learningStyles: ['videos_imagens', 'experimentos_construcoes'],
    dailyChallenge: 'Dificuldade para guardar o material e trocar para a aula de português'
  });

  assert.equal(report.childName, 'G.');
  assert.equal(report.childAge, '7 a 10 anos');
  assert.ok(report.profileAnalysis.length > 50);
  assert.ok(report.bridges.length >= 4);
  assert.ok(report.bridges.some(b => b.level.includes('🟢')));
  assert.ok(report.bridges.some(b => b.level.includes('🔴')));
  assert.ok(report.transitionStrategy.includes('Regra 80/20'));
  assert.ok(report.whatToAvoid.length >= 3);
  assert.ok(report.markdown.includes('# 🧩 Relatório de Expansão de Hiperfoco'));
  assert.ok(report.markdown.includes('**Criança:** G. | **Faixa etária:** 7 a 10 anos'));
  assert.ok(report.markdown.includes('## 📋 Tabela Resumo'));
});

test('generateExpansionReport defaults to "a criança" when childNickname is empty', () => {
  const report = generateExpansionReport({
    childNickname: '',
    ageBracket: '11 a 14',
    currentHyperfocus: 'Robótica e circuitos',
    learningStyles: ['experimentos_construcoes']
  });

  assert.equal(report.childName, 'a criança');
  assert.equal(report.childAge, '11 a 14 anos');
  assert.ok(report.markdown.includes('**Criança:** a criança | **Faixa etária:** 11 a 14 anos'));
  assert.ok(report.profileAnalysis.startsWith('A criança apresenta um perfil'));
});

test('proactive opening text is present and matches the script', () => {
  assert.ok(HIPER_PROACTIVE_OPENING.includes('E aí — que tal a gente tentar algo diferente hoje?'));
  assert.ok(HIPER_PROACTIVE_OPENING.includes('Posso começar?'));
});
