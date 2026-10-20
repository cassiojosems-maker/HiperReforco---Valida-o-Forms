import test from 'node:test';
import assert from 'node:assert/strict';
import { matchForm, VALIDATION_FORMS } from './formMatcher.ts';

test('matchForm returns Gestores públicos for gestor role', () => {
  const result = matchForm({ role: 'gestor' });
  assert.equal(result.id, 'gestores');
  assert.ok(result.sendUrl.includes('docs.google.com/forms'));
});

test('matchForm returns Professora regente for professor role', () => {
  const result = matchForm({ role: 'professor' });
  assert.equal(result.id, 'professora-regente');
  assert.equal(result.codeName, 'Roteiro A — Professora regente');
});

test('matchForm returns Família com AEE when hasAEE is true', () => {
  const result = matchForm({ role: 'familia', hasAEE: true });
  assert.equal(result.id, 'familia-com-aee');
  assert.equal(result.codeName, 'Roteiro D — Família com AEE');
});

test('matchForm returns Família sem AEE when hasAEE is false', () => {
  const result = matchForm({ role: 'familia', hasAEE: false });
  assert.equal(result.id, 'familia-sem-aee');
  assert.equal(result.hypothesisCode, 'H6');
});

test('all 4 forms have valid Google Forms sendUrl and editUrl', () => {
  assert.equal(VALIDATION_FORMS.length, 4);
  for (const form of VALIDATION_FORMS) {
    assert.ok(form.sendUrl.startsWith('https://docs.google.com/forms/d/e/'));
    assert.ok(form.editUrl.startsWith('https://docs.google.com/forms/d/'));
    assert.ok(form.estimatedMinutes > 0);
  }
});
