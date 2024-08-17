import { useRef } from 'react';
import PropTypes from 'prop-types';

import { subtractYears } from '../utils/subtractYears';
import { formatDate } from '../utils/formatDate';
import Dropdown from './Dropdown';

export default function TimeSpanSelect({
  label,
  items,
  value,
  setValue,
  setEarliestDate,
}) {
  const valueRef = useRef(null);

  if (valueRef.current && valueRef.current !== value) {
    setEarliestDate(formatDate(subtractYears(new Date(), value)));
  }

  function onChange(event) {
    valueRef.current = value;
    setValue(event.target.value);
    console.log(event.target.value);
  }

  return (
    <Dropdown label={label} items={items} value={value} onChange={onChange} />
  );
}

TimeSpanSelect.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setValue: PropTypes.func,
  setEarliestDate: PropTypes.func,
};
