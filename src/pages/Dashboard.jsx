import { useState } from 'react';

import ExchangeRatesSection from '../components/ExchangeRatesSection';
import NewsSection from '../components/NewsSection';

export default function Dashboard() {
  const [baseCurrency, setBaseCurrency] = useState('EUR');
  const [checkedCurrencies, setCheckedCurrencies] = useState(['USD', 'PLN']);

  return (
    <>
      <ExchangeRatesSection
        baseCurrency={baseCurrency}
        setBaseCurrency={setBaseCurrency}
        checkedCurrencies={checkedCurrencies}
        setCheckedCurrencies={setCheckedCurrencies}
      />
      <NewsSection
        baseCurrency={baseCurrency}
        checkedCurrencies={checkedCurrencies}
      />
    </>
  );
}
