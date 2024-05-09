export const dateToLocaleStr = (value: string, locale: string = 'uk-UA') => {
  return value
    ? new Date(value).toLocaleDateString(locale, {
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '-';
};
