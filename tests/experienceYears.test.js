import test from 'node:test';
import assert from 'node:assert/strict';
import { getExperienceYears } from '../src/components/resume/experienceYears.js';

test('experience increases at the calendar year boundary from the 2022 start', () => {
  assert.equal(
    getExperienceYears(2022, new Date(2026, 11, 31).getFullYear()),
    4
  );
  assert.equal(getExperienceYears(2022, new Date(2027, 0, 1).getFullYear()), 5);
  assert.equal(getExperienceYears(2022, 2028), 6);
});

test('experience handles its starting year and rejects invalid or future starts', () => {
  assert.equal(getExperienceYears(2022, 2022), 0);
  for (const start of [undefined, null, '2022', 2022.5, 0, 2027]) {
    assert.equal(getExperienceYears(start, 2026), null);
  }
});
