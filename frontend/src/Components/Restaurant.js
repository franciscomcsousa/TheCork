import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import {useLocation} from 'react-router-dom';
import Button from '@mui/material/Button';

const theme = createTheme();

export default function Restaurant(onFormChangeAvailability) {

const location = useLocation();

if (!location.state) {
    return (
        <div>
            <h1>405</h1>
            <h2>Not allowed</h2>
        </div>
    )
}

const adminData = location.state.data
//console.log(userData)
//availability = adminData.availability

const handleAvailability = (event) => {
  event.preventDefault()
  console.log("Availability changed")
  onFormChangeAvailability()
}

return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="The Cork"/>
      <CssBaseline />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
          >
          <Avatar sx={{ m: 2, bgcolor: 'blueviolet', width: 50, height: 50}}>
            <AccountCircleIcon />
          </Avatar>
          </Box>
          <Box
            paddingBottom={1}
          >
          <Typography component="h1" variant="h5">
            Welcome Restaurant {adminData.name}!
          </Typography>
          </Box>
        </Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* TODO: beautify, or just make it more readable */}
                    <Typography sx={{ p: 2 }}>Name:{adminData.name}</Typography>
                    <Typography sx={{ p: 2 }}>Address:{adminData.address} </Typography>
                    <Typography sx={{ p: 2 }}>Phone:{adminData.phone} </Typography>
                    <Typography sx={{ p: 2 }}>Email:{adminData.email} </Typography>
                    <Typography sx={{ p: 2 }}>Available Seats:{adminData.available_seats} </Typography>
                    <Typography sx={{ p: 2 }}>Availability: {adminData.availability === 1 ? 'Open' : 'Closed'} </Typography>
                    <Typography sx={{ p: 2 }} component={'div'}>Current Reservations:{adminData.reservations.map( (reservation) =>
                      <li key={reservation}> UserEmail: {reservation[0]}, How many people: {reservation[1]}</li>
                      )}
                    </Typography>                       
                    <Button
                      type="submit"
                      onClick={handleAvailability}
                      //value={availability}
                      fullWidth
                      variant="contained"
                      sx={{ height: 40, width: 200, ml:60}}
                      >
                      Change availability
                    </Button>
                </Grid>
            </Grid>
        </Container>
    </Container>
</ThemeProvider>
    );
}