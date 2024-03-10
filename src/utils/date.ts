export const timeAgo = (timestamp: Date, locale = 'en') => {
  let value;
  const diff = Math.floor((new Date().getTime() - timestamp.getTime()) / 1000);
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (years > 0) {
    value = rtf.format(0 - years, 'year');
  } else if (months > 0) {
    value = rtf.format(0 - months, 'month');
  } else if (days > 0) {
    value = rtf.format(0 - days, 'day');
  } else if (hours > 0) {
    value = rtf.format(0 - hours, 'hour');
  } else if (minutes > 0) {
    value = rtf.format(0 - minutes, 'minute');
  } else {
    value = rtf.format(0 - diff, 'second');
  }
  return value;
};

export const dateNowFormatted = () => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
  return formattedDate.replace(/\//g, '-');
};
