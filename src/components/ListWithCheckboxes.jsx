import PropTypes from 'prop-types';

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from '@mui/material';

export default function ListWithCheckboxes({
  items,
  checkedItems,
  handleToggle,
}) {
  return (
    <List sx={{ maxHeight: 300, overflow: 'auto' }}>
      {items.map((item) => {
        const labelId = `currencies-list-label-${item}`;

        return (
          <ListItem key={item} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={() => handleToggle(item)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checkedItems.indexOf(item) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-label': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

ListWithCheckboxes.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  checkedItems: PropTypes.arrayOf(PropTypes.string),
  handleToggle: PropTypes.func,
};
