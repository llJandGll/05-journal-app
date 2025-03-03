import { Box, Divider, List, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useAppSelector } from '../../hooks/useAppStore';
import { SideBarItem } from './SideBarItem';

interface Props {
  drawerWidth: number;
  onCloseDrawer?: () => void;
}

export const SideBar = ({ drawerWidth, onCloseDrawer }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const { name: displayName } = useAppSelector(state => state.auth.user!);
  const { notes } = useAppSelector(state => state.journal);

  const handleItemClick = () => {
    if (isMobile && onCloseDrawer) {
      onCloseDrawer();
    }
  };

  return (
    <Box
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Toolbar>
        <Typography 
          variant={isMobile ? 'subtitle1' : 'h6'} 
          noWrap 
          component='div'
          color="white"
          sx={{ 
            fontSize: isMobile ? '0.9rem' : '1.2rem',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            width: '100%'
          }}
        >
          {displayName}
        </Typography>
      </Toolbar>
      
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }}/>

      <List sx={{ 
        padding: isMobile ? 1 : 2,
        maxHeight: 'calc(100vh - 128px)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255,255,255,0.1)',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(255,255,255,0.3)',
        }
      }}>
        {
          notes.map(note => (
            <SideBarItem 
              key={note.id} 
              {...note} 
              onClick={handleItemClick}
            />
          ))
        }
      </List>
    </Box>
  )
}
