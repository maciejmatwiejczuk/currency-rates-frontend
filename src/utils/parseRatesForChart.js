export function parseRatesForChart(ratesObj) {
  const ratesArray = [];

  for (const date in ratesObj) {
    ratesArray.push({ date, ...ratesObj[date] });
  }

  return ratesArray;
}
