export const dateToLocaleStr = (value: string, locale: string = 'uk-UA') => {
  return value
    ? new Date(value).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit'
      })
    : '-';
};

export const generatePassword = (length: number = 10, options: Record<string, any> = {}) => {
  const {
    numbers = true,
    symbols = true,
    uppercase = true,
    excludeSimilarCharacters = true
  } = options;

  let characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';

  if (numbers) characters += '0123456789';
  if (symbols) characters += '!@#$%^&*()-_+=<>?';
  if (uppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  if (excludeSimilarCharacters) {
    characters = characters.replace(/[ilLI|`oO0]/g, '');
  }

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};
