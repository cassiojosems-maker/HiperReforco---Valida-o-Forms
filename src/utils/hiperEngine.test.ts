import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DIAGNOSTIC_QUESTIONS,
  generateExpansionReport,
  parseNameAndAge,
  HIPER_PROACTIVE_OPENING
} from './hiperEngine.ts';

test('diagnostic questions are 10 questions in exact order', () => {
  assert.equal(DIAGNOSTIC_QUESTIONS.length, 10);
  assert.equal(DIAGNOSTIC_QUESTIONS[0].id, 'p1');
  assert.equal(DIAGNOSTIC_QUESTIONS[9].id, 'p10');
  assert.ok(DIAGNOSTIC_QUESTIONS[6].options && DIAGNOSTIC_QUESTIONS[6].options.length >= 7);
});

test('parseNameAndAge splits correctly', () => {
  const res1 = parseNameAndAge('Lucas, 8 anos');
  assert.equal(res1.name, 'Lucas');
  assert.equal(res1.age, '8 anos');

  const res2 = parseNameAndAge('Beatriz');
  assert.equal(res2.name, 'Beatriz');
});

test('generateExpansionReport builds all required sections and bridges', () => {
  const report = generateExpansionReport({
    p1_childNameAge: 'Guilherme, 9 anos',
    p2_currentHyperfocus: 'Sistemas Ferroviários e Metrô',
    p3_durationIntensity: 'Mais de 2 anos, consome quase todo tempo livre',
    p4_pastHyperfocus: 'Dinossauros do período Cretáceo',
    p5_secondaryInterest: 'Mapas e rotas de GPS',
    p6_rejections: 'Textos longos sem imagens e atividades barulhentas',
    p7_learningStyles: ['videos_imagens', 'experimentos_construcoes'],
    p8_schoolContext: '4º ano do EF, escola municipal com sala de recursos 1x na semana',
    p9_diagnosisOptional: 'TEA nível 1 e AH/SD',
    p10_dailyChallenge: 'Dificuldade para guardar o material e trocar para a aula de português'
  });

  assert.equal(report.childName, 'Guilherme');
  assert.equal(report.childAge, '9 anos');
  assert.ok(report.profileAnalysis.length > 50);
  assert.ok(report.bridges.length >= 4);
  assert.ok(report.bridges.some(b => b.level.includes('🟢')));
  assert.ok(report.bridges.some(b => b.level.includes('🔴')));
  assert.ok(report.transitionStrategy.includes('Regra 80/20'));
  assert.ok(report.whatToAvoid.length >= 3);
  assert.ok(report.markdown.includes('# 🧩 Relatório de Expansão de Hiperfoco'));
  assert.ok(report.markdown.includes('## 📋 Tabela Resumo'));
});

test('proactive opening text is present and matches the script', () => {
  assert.ok(HIPER_PROACTIVE_OPENING.includes('E aí — que tal a gente tentar algo diferente hoje?'));
  assert.ok(HIPER_PROACTIVE_OPENING.includes('Posso começar?'));
});
