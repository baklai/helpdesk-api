export const ipaddressHTMLTable = (data: Record<string, any>) => {
  return (
    '<table border="1">' +
    `<tr><td>IP АДРЕСА</td><td>${data?.ipaddress || '-'}</td></tr>` +
    `<tr><td>МАСКА</td><td>${data?.mask || '-'}</td></tr>` +
    `<tr><td>ШЛЮЗ</td><td>${data?.gateway || '-'}</td></tr>` +
    `<tr><td>НОМЕР ЛИСТА</td><td>${data?.reqnum || '-'}</td></tr>` +
    `<tr><td>ДАТА ВІДКРИТТЯ</td><td>${dateToLocaleStr(data?.date || '-')}</td></tr>` +
    `<tr><td>ПОВНЕ ІМ'Я</td><td>${data?.fullname || '-'}</td></tr>` +
    `<tr><td>НОМЕР ТЕЛЕФОНУ</td><td>${data?.phone || '-'}</td></tr>` +
    `<tr><td>ОРГАНІЗАЦІЯ</td><td>${data?.organization?.name || '-'}</td></tr>` +
    `<tr><td>ПІДРОЗДІЛ</td><td>${data?.subdivision?.name || '-'}</td></tr>` +
    `<tr><td>ВІДДІЛ</td><td>${data?.department?.name || '-'}</td></tr>` +
    `<tr><td>ПОСАДА</td><td>${data?.position?.name || '-'}</td></tr>` +
    `<tr><td>КОМЕНТАР</td><td>${data?.comment || '-'}</td></tr>` +
    `<tr><td>ІНТЕРНЕТ</td><td></td></tr>` +
    `<tr><td>&nbsp;&nbsp;ЛИСТ</td><td>${data?.internet?.reqnum || '-'}</td></tr>` +
    `<tr><td>&nbsp;&nbsp;ДАТА ВІДКРИТТЯ</td><td>${dateToLocaleStr(
      data?.internet?.dateOpen
    )}</td></tr>` +
    `<tr><td>&nbsp;&nbsp;ДАТА ЗАКРИТТЯ</td><td>${dateToLocaleStr(
      data?.internet?.dateClose
    )}</td></tr>` +
    `<tr><td>&nbsp;&nbsp;КОМЕНТАР</td><td>${dateToLocaleStr(data?.internet?.comment)}</td></tr>` +
    '</table>'
  );
};

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
