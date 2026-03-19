export const dateToLocaleStr = (value: string, locale: string = 'uk-UA'): string => {
  if (!value) return '-';
  return new Date(value).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'numeric',
    day: '2-digit'
  });
};
