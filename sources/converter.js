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

function formatDateToUSFromDays(days) {
  const date = days2date(days);
  return date.toLocaleDateString("en-us");
}

const days2date = days => new Date(Date.UTC(0, 0, days - 1));

module.exports = {formatDate, formatDateFromDays, formatDateToUSFromDays}