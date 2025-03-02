import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { StarOutline } from '@mui/icons-material';

export const NothingSelectedView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ 
        minHeight: 'calc(100vh - 110px)', 
        backgroundColor: 'primary.main', 
        borderRadius: 3,
        p: isMobile ? 2 : 0
      }}
    >
      <Grid item xs={12}>
        <StarOutline sx={{ 
          fontSize: isMobile ? 60 : 100, 
          color: 'white' 
        }} />
      </Grid>
      <Grid item xs={12}>
        <Typography 
          color="white" 
          variant={isMobile ? 'h6' : 'h5'}
          align="center"
          sx={{
            px: 2,
            wordBreak: 'break-word'
          }}
        >
          Selecciona o crea un Recuerdo
        </Typography>
      </Grid>
    </Grid>
  );
};
