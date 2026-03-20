const ALLOWED_OPERATORS = new Set([
  '$and',
  '$or',
  '$in',
  '$nin',
  '$eq',
  '$ne',
  '$gt',
  '$gte',
  '$lt',
  '$lte',
  '$regex',
  '$options',
  '$exists',
  '$type',
  '$not'
]);

type FilterValue = string | number | boolean | null | Record<string, unknown> | FilterValue[];

export function sanitizeMongoFilters(filters: Record<string, unknown>): Record<string, unknown> {
  const sanitize = (obj: FilterValue): FilterValue => {
    if (Array.isArray(obj)) return obj.map(sanitize);
    if (typeof obj === 'object' && obj !== null) {
      return Object.fromEntries(
        Object.entries(obj as Record<string, FilterValue>)
          .filter(([k]) => !k.startsWith('$') || ALLOWED_OPERATORS.has(k))
          .map(([k, v]) => [k, sanitize(v)])
      );
    }
    return obj;
  };
  return sanitize(filters as FilterValue) as Record<string, unknown>;
}

export const dateToLocaleStr = (value: string, locale: string = 'uk-UA'): string => {
  if (!value) return '-';
  return new Date(value).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'numeric',
    day: '2-digit'
  });
};
