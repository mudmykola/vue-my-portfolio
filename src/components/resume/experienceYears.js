export function getExperienceYears(startYear, currentYear) {
  if (!Number.isInteger(startYear) || !Number.isInteger(currentYear))
    return null;
  if (startYear < 1 || currentYear < startYear) return null;

  return currentYear - startYear;
}
