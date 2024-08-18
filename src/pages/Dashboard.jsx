import { useState } from 'react';

import ExchangeRatesSection from '../components/ExchangeRatesSection';
import NewsSection from '../components/NewsSection';
import { useFetch } from '../hooks/useFetch';
import { formatDate } from '../utils/formatDate';
import { subtractYears } from '../utils/subtractYears';
import { timeSpanDropdownOptions } from '../constants/timeSpanDropdownOptions';

export default function Dashboard() {
  const [baseCurrency, setBaseCurrency] = useState('EUR');
  const [checkedCurrencies, setCheckedCurrencies] = useState(['USD', 'PLN']);
  const [earliestDate, setEarliestDate] = useState(
    formatDate(subtractYears(new Date(), timeSpanDropdownOptions[0].value))
  );
  const [newsPage, setNewsPage] = useState(1);

  function handleNewsPageChange(event, value) {
    setNewsPage(value);
  }

  function createSearchString() {
    let str = `${baseCurrency}|`;

    for (const currency of checkedCurrencies) {
      str += `${currency}|`;
    }
    str = str.slice(0, -1).toLowerCase();

    return str;
  }

  const {
    data: timeSeries,
    isLoading: isLoadingCurrencies,
    error: errorCurrencies,
  } = useFetch({
    url: `https://api.frankfurter.app/${earliestDate}..`,
    params: { from: baseCurrency },
  });

  const {
    data: news,
    isLoading: isLoadingNews,
    error: errorNews,
  } = useFetch({
    url: 'https://api.thenewsapi.com/v1/news/top',
    params: {
      api_token: 'DVbGsPtLbo78XcveQ6cPCkKUnHpNA3wOp1DC3Tka',
      search: createSearchString(),
      search_fields: 'title,description,keywords',
      language: 'en',
      page: newsPage,
    },
  });

  if (errorCurrencies) {
    return <p>{errorCurrencies.message}</p>;
  }

  if (errorNews) {
    return <p>{errorNews.message}</p>;
  }

  return (
    <>
      <ExchangeRatesSection
        timeSeries={timeSeries}
        baseCurrency={baseCurrency}
        setBaseCurrency={setBaseCurrency}
        setEarliestDate={setEarliestDate}
        checkedCurrencies={checkedCurrencies}
        setCheckedCurrencies={setCheckedCurrencies}
        isLoadingCurrencies={isLoadingCurrencies}
      />
      <NewsSection
        news={news}
        page={newsPage}
        handlePageChange={handleNewsPageChange}
        isLoadingNews={isLoadingNews}
      />
    </>
  );
}
