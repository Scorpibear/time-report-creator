function formatDate(date) {
  try{
    console.log(date, date.toISOString(), date.toLocaleString());
    return date.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0];
  } catch (e) {
    console.error(`Could not parse date '${date}'`)
    return date;
  }
}

function formatDateFromDays(days) {
  return formatDate(new Date(0, 0, days));
}

module.exports = {formatDate, formatDateFromDays}