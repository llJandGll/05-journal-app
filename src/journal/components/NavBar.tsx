import { AppBar, Grid, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { useAppDispatch } from '../../hooks/useAppStore';
import { startLogout } from '../../store/auth/thunks';
import { startLogoutJournal } from '../../store/journal/thunks';

interface Props {
  drawerWidth: number;
  onMenuClick?: () => void;
  showMenuIcon?: boolean;
}

export const NavBar = ({ drawerWidth, onMenuClick, showMenuIcon = false } : Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useAppDispatch();

  const onLogoutAccount = () => {
    dispatch(startLogout());
    dispatch(startLogoutJournal());
  }

  return (
    <AppBar 
      position='fixed'
      sx={{ 
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` }
      }}
    >
      <Toolbar>
        {showMenuIcon && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuOutlined />
          </IconButton>
        )}

        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
          <Typography 
            variant={isMobile ? 'h6' : 'h5'} 
            noWrap 
            component='div'
            sx={{ fontSize: isMobile ? '1.1rem' : '1.5rem' }}
          >
            JournalApp
          </Typography>

          <IconButton 
            color='error' 
            onClick={onLogoutAccount}
          >
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
