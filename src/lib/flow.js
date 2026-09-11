export const SESSION_KEY = 'fia.session.mark-1-1-13.v1';
export const VERSIONS = ['BereanStandardBible', 'unfoldingWordLiteral', 'unfoldingWordSimplified'];
export function hiddenUnit(id, cues) {
  return id >= cues.hidden_example_region.start && id <= cues.hidden_example_region.end;
}
export function activeUnits(step, cues) { return step.units.filter(unit => !hiddenUnit(unit.id, cues)); }
export function initialSession(guide) {
  return { schemaVersion: 1, passage: 'mark-1-1-13', stepId: guide.steps[0].id, unitId: guide.steps[0].units[0].id, version: VERSIONS[0], visited: [guide.steps[0].id], finished: false };
}
export function validateSession(value, guide, cues) {
  const fallback = initialSession(guide);
  if (!value || value.schemaVersion !== 1 || value.passage !== fallback.passage) return fallback;
  const step = guide.steps.find(x => x.id === value.stepId);
  if (!step || !activeUnits(step, cues).some(x => x.id === value.unitId) || !VERSIONS.includes(value.version)) return fallback;
  const visited = [...new Set((Array.isArray(value.visited) ? value.visited : []).filter(id => guide.steps.some(s => s.id === id)))];
  if (!visited.includes(step.id)) visited.push(step.id);
  return { schemaVersion: 1, passage: fallback.passage, stepId: step.id, unitId: value.unitId, version: value.version, visited, finished: value.finished === true && visited.length === guide.steps.length };
}
export function currentPosition(session, guide, cues) {
  const step = guide.steps.find(x => x.id === session.stepId);
  const units = activeUnits(step, cues);
  const unit = units.find(x => x.id === session.unitId);
  return { step, units, unit, index: units.indexOf(unit), isStop: cues.pause_after.some(x => x.id === unit.id) };
}
export function selectStep(session, id, guide, cues) {
  const step = guide.steps.find(x => x.id === id);
  if (!step) return session;
  return { ...session, stepId: id, unitId: activeUnits(step, cues)[0].id, visited: [...new Set([...session.visited, id])], finished: false };
}
export function moveUnit(session, direction, guide, cues) {
  const { step, units, index } = currentPosition(session, guide, cues);
  const next = units[index + direction];
  if (next) return { ...session, unitId: next.id, finished: false };
  const nextStep = guide.steps[guide.steps.indexOf(step) + direction];
  if (!nextStep) return session;
  const selected = selectStep(session, nextStep.id, guide, cues);
  return direction < 0 ? { ...selected, unitId: activeUnits(nextStep, cues).at(-1).id } : selected;
}
// B3 can consume this contract. A speech completion cannot cross a discussion stop.
export function afterNarration(session, guide, cues) {
  return currentPosition(session, guide, cues).isStop ? session : moveUnit(session, 1, guide, cues);
}
export function canFinish(session, guide) { return session.visited.length === guide.steps.length && session.stepId === guide.steps.at(-1).id; }
