import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';

import Search from './Search';
import ListWithCheckboxes from './ListWithCheckboxes';

export default function SearchableList({ items, checkedItems, handleToggle }) {
  const [value, setValue] = useState('');
  const shownItems =
    value !== ''
      ? items.filter((item) => item.toLowerCase().includes(value))
      : items;

  function onChange(event) {
    setValue(event.target.value);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Search value={value} setValue={setValue} onChange={onChange} />
      <ListWithCheckboxes
        items={shownItems}
        checkedItems={checkedItems}
        handleToggle={handleToggle}
      />
    </Box>
  );
}

SearchableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  checkedItems: PropTypes.arrayOf(PropTypes.string),
  handleToggle: PropTypes.func,
};
