import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Typography, Paper, CircularProgress } from '@mui/material';

import DropdownWithSearch from './DropdownWithSearch';
import Chart from './Chart';
import SearchableList from './SearchableList';
import OpenModal from './OpenModal';
import { timeSpanDropdownOptions } from '../constants/timeSpanDropdownOptions';
import { currencies } from '../constants/currencies';
import { parseRatesForChart } from '../utils/parseRatesForChart';
import TimeSpanSelect from './TimeSpanSelect';
import DownloadMenu from './DownloadMenu';

export default function ExchangeRatesSection({
  timeSeries,
  baseCurrency,
  setBaseCurrency,
  setEarliestDate,
  checkedCurrencies,
  setCheckedCurrencies,
  isLoadingCurrencies,
}) {
  const [timeSpan, setTimeSpan] = useState(timeSpanDropdownOptions[0].value);

  function toggleCurrencyCheck(currency) {
    const currentIndex = checkedCurrencies.indexOf(currency);
    const newCheckedCurrencies = [...checkedCurrencies];

    if (currentIndex === -1) {
      newCheckedCurrencies.push(currency);
    } else {
      newCheckedCurrencies.splice(currentIndex, 1);
    }

    setCheckedCurrencies(newCheckedCurrencies);
  }

  return (
    <section>
      <Box sx={{ marginBottom: 6 }}>
        <Typography variant="h2" component="h3" marginBottom={4}>
          Currency Exchange Rates
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 3fr',
            gridTemplateRows: 'min-content min-content 1fr',
            gap: 2,
          }}
        >
          <Paper elevation={4} sx={{ padding: 2 }}>
            <TimeSpanSelect
              label="Time Span"
              items={timeSpanDropdownOptions}
              value={timeSpan}
              setValue={setTimeSpan}
              setEarliestDate={setEarliestDate}
            />
          </Paper>

          <Paper elevation={4} sx={{ padding: 2 }}>
            <DropdownWithSearch
              label="Base Currency"
              items={currencies}
              value={baseCurrency}
              setValue={setBaseCurrency}
            />
          </Paper>

          <Paper elevation={4} sx={{ padding: 2 }}>
            <Typography variant="subtitle1" component="h3" marginBottom={1}>
              Filter Currencies
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <SearchableList
                items={currencies.filter(
                  (currency) => currency !== baseCurrency
                )}
                checkedItems={checkedCurrencies}
                handleToggle={toggleCurrencyCheck}
              />
            </Box>
          </Paper>

          <Paper
            elevation={4}
            sx={{
              gridRow: '1 / -1',
              gridColumn: '2 / 3',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 6,
              paddingBottom: 2,
            }}
          >
            {isLoadingCurrencies ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Chart
                rates={parseRatesForChart(timeSeries?.rates)}
                checkedCurrencies={checkedCurrencies}
              />
            )}
          </Paper>
        </Box>

        <Box marginTop={1} sx={{ float: 'right' }}>
          <OpenModal buttonText="Download Data">
            <DownloadMenu downloadData={timeSeries} />
          </OpenModal>
        </Box>
      </Box>
    </section>
  );
}

ExchangeRatesSection.propTypes = {
  timeSeries: PropTypes.object,
  baseCurrency: PropTypes.string,
  setBaseCurrency: PropTypes.func,
  setEarliestDate: PropTypes.func,
  checkedCurrencies: PropTypes.arrayOf(PropTypes.string),
  setCheckedCurrencies: PropTypes.func,
  isLoadingCurrencies: PropTypes.bool,
};
