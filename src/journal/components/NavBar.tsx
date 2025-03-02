import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { useAppDispatch } from '../../hooks/useAppStore';
import { startLogout } from '../../store/auth/thunks';
import { startLogoutJournal } from '../../store/journal/thunks';

export const NavBar = ({ drawerWidth = 240 }) => {

    const dispatch = useAppDispatch();

  const onLogoutAccount = () => {
    dispatch( startLogout() )
    dispatch( startLogoutJournal() )
  }
  return (
    <AppBar 
        position='fixed'
        sx={{ 
            width: { sm: `calc(100% - ${ drawerWidth }px)` },
            ml: { sm: `${ drawerWidth }px` }
         }}
    >
        <Toolbar>
            <IconButton
                color='inherit'
                edge="start"
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'> JournalApp </Typography>

                <IconButton  
                  color='error'
                  onClick={ onLogoutAccount }
                >
                    <LogoutOutlined 
                    
                    />
                </IconButton>
            </Grid>

        </Toolbar>
    </AppBar>
  )
}
