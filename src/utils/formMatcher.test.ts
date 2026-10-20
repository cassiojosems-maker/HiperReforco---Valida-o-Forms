import test from 'node:test';
import assert from 'node:assert/strict';
import { matchForm, VALIDATION_FORMS } from './formMatcher.ts';

test('matchForm returns Triagem — Gestores públicos for gestor role', () => {
  const result = matchForm({ role: 'gestor' });
  assert.equal(result.id, 'gestores');
  assert.equal(result.codeName, 'Triagem — Gestores públicos');
  assert.ok(result.sendUrl.includes('docs.google.com/forms'));
  assert.equal(result.estimatedMinutes, 3);
});

test('matchForm returns Professora regente for professor role', () => {
  const result = matchForm({ role: 'professor' });
  assert.equal(result.id, 'professora-regente');
  assert.equal(result.codeName, 'Roteiro A — Professora regente');
  assert.equal(result.estimatedMinutes, 10);
});

test('matchForm returns Família com Apoio na Escola when hasAEE is true', () => {
  const result = matchForm({ role: 'familia', hasAEE: true });
  assert.equal(result.id, 'familia-com-aee');
  assert.equal(result.codeName, 'Roteiro D — Família com Apoio na Escola');
  assert.equal(result.estimatedMinutes, 10);
});

test('matchForm returns Família sem Apoio na Escola when hasAEE is false', () => {
  const result = matchForm({ role: 'familia', hasAEE: false });
  assert.equal(result.id, 'familia-sem-aee');
  assert.equal(result.codeName, 'Roteiro E — Família sem Apoio na Escola');
  assert.equal(result.estimatedMinutes, 8);
});

test('matchForm returns Roteiro G — Atendimento Clínico for clinico role', () => {
  const result = matchForm({ role: 'clinico' });
  assert.equal(result.id, 'roteiro-g-clinico');
  assert.equal(result.title, 'Roteiro G — Atendimento Clínico');
  assert.ok(result.sendUrl.includes('1FAIpQLScsfRM_33ZV9DDDSBEmOoOqtrQiV2lTo3AGS-eH4RSvdyFtgw'));
  assert.equal(result.estimatedMinutes, 10);
});

test('all 5 forms have valid public sendUrl and clean topics', () => {
  assert.equal(VALIDATION_FORMS.length, 5);
  for (const form of VALIDATION_FORMS) {
    assert.ok(form.sendUrl.startsWith('https://docs.google.com/forms/d/e/'));
    assert.ok(form.estimatedMinutes > 0);
    assert.equal(form.keyTopics.length, 3);
  }
});
