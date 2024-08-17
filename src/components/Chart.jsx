import PropTypes from 'prop-types';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from 'recharts';

export default function Chart({ rates, checkedCurrencies }) {
  return (
    <LineChart
      width={800}
      height={450}
      data={rates}
      margin={{
        right: 30,
      }}
    >
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="date" minTickGap={13} />
      <YAxis />
      <Legend />
      {checkedCurrencies.map((currency) => (
        <Line key={currency} dataKey={currency} dot={null} />
      ))}
      <Tooltip />
    </LineChart>
  );
}

Chart.propTypes = {
  rates: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
    })
  ),
  checkedCurrencies: PropTypes.arrayOf(PropTypes.string),
};
