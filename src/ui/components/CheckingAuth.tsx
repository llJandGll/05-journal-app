import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

export const CheckingAuth : React.FC = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid item>
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  )
}