import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import Box, { BoxPropsType } from '@/components/mui/Box';
import Divider from '@/components/mui/Divider';
import List from '@/components/mui/List';
import ListItem from '@/components/mui/List/ListItem';
import ListItemButton from '@/components/mui/List/ListItemButton';
import ListItemIcon from '@/components/mui/List/ListItemIcon';
import ListItemText from '@/components/mui/List/ListItemText';
import SwipeableDrawer, { SwipeableDrawerPropsType } from '@/components/mui/SwipeableDrawer';

export type AppHeaderDrawerPropsType = Pick<
  SwipeableDrawerPropsType,
  'open' | 'onClose' | 'onOpen'
> & {
  onClickOutSide: BoxPropsType['onClick'];
  onKeyDown: BoxPropsType['onKeyDown'];
};

const AppHeaderDrawer = ({
  open,
  onClose,
  onOpen,
  onClickOutSide,
  onKeyDown,
}: AppHeaderDrawerPropsType) => (
  <SwipeableDrawer
    open={open}
    onClose={onClose}
    onOpen={onOpen}
  >
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={onClickOutSide}
      onKeyDown={onKeyDown}
    >
      <List>
        {['本棚', '設定'].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['ログアウト'].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  </SwipeableDrawer>
);

export default AppHeaderDrawer;
