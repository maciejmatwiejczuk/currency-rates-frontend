import PropTypes from 'prop-types';

import { Autocomplete, TextField } from '@mui/material';

export default function DropdownWithSearch({ label, items, value, setValue }) {
  function onChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Autocomplete
      value={value}
      disablePortal
      onChange={onChange}
      options={items}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="standard" />
      )}
    />
  );
}

DropdownWithSearch.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  setValue: PropTypes.func,
};
