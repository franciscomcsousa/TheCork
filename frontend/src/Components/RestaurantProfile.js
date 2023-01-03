import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Popover from '@mui/material/Popover';


const theme = createTheme();

export default function RestaurantProfile({ userData }) {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="The Cork"/>
      <CssBaseline />

      <Container component="main" maxWidth="xs">
      <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            m={1} //margin
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            paddingTop={3}
          ></Box>
        </Box>
        <CssBaseline />
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography sx={{ p: 10 }}>Name:{userData.name}</Typography>
              <Typography sx={{ p: 10 }}>adress:{userData.adress} </Typography>
              <Typography sx={{ p: 10 }}>phone:{userData.phone} </Typography>
              <Typography sx={{ p: 10 }}>email:{userData.email} </Typography>
              <Typography sx={{ p: 10 }}>tables:{userData.tables} </Typography>
              <Typography sx={{ p: 10 }}>disponibility:{userData.disponibility} </Typography>

            </Grid>
        </Grid>
    </Container>
    </Container>
      {/* <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      /> */}
    </ThemeProvider>
  );
}