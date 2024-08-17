import PropTypes from 'prop-types';

import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function Search({ value, onChange }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
      <SearchIcon sx={{ mr: 1, my: 0.5 }} />
      <TextField
        id="search"
        label="Search"
        variant="standard"
        value={value}
        onChange={onChange}
      />
    </Box>
  );
}

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
