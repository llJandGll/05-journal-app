import { Box, Drawer, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import { NavBar, SideBar } from '../components';
import { JSX, useState } from 'react';

import 'animate.css';

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const JournalLayout = ({ children } : Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 280;

  return (
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>
      <NavBar 
        drawerWidth={drawerWidth}
        onMenuClick={handleDrawerToggle}
        showMenuIcon={isMobile}
      />

      <Box
        component="nav"
        sx={{ 
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 }
        }}
      >
        {/* Mobile drawer */}
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundColor: 'primary.main'
              },
            }}
          >
            <SideBar drawerWidth={drawerWidth} onCloseDrawer={handleDrawerToggle} />
          </Drawer>
        ) : (
          // Desktop drawer
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundColor: 'primary.main'
              },
            }}
            open
          >
            <SideBar drawerWidth={drawerWidth} />
          </Drawer>
        )}
      </Box>

      <Box 
        component='main'
        sx={{ 
          flexGrow: 1,
          p: isMobile ? 0 : 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh'
        }}
      >
        <Toolbar />
        { children }
      </Box>
    </Box>
  )
}
