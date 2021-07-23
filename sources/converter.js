function formatDate(date) {
  try{
    return date.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0];
  } catch (e) {
    console.error(`Could not parse date '${date}'`)
    return date;
  }
}

function formatDateFromDays(days) {
  return formatDate(days2date(days));
}

const addZeros = num => String(num).padStart(2, '0');

function formatDateToUSFromDays(days) {
  const date = days2date(days);
  return `${addZeros(date.getUTCMonth() + 1)}/${addZeros(date.getUTCDate())}/${date.getUTCFullYear()}`;
}

const days2date = days => new Date(Date.UTC(0, 0, days - 1));

module.exports = {formatDate, formatDateFromDays, formatDateToUSFromDays}