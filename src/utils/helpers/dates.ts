import { intervalToDuration, parse } from 'date-fns';

export function calculateFullAge(dob?: string) {
  if (!dob) return { years: 0, months: 0, days: 0 };
  const birthDate = parse(dob, 'yyyy-MM-dd', new Date());
  const { years, months, days } = intervalToDuration({
    start: birthDate,
    end: new Date(),
  });
  return { years: years || 0, months: months || 0, days: days || 0 };
}
