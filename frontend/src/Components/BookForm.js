import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Header from './Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export default function BookForm({ emailInput, passwordInput, restaurantInput, onFormChangeEmail, onFormChangePassword, onFormChangeRestaurant, onFormSubmit }) {
  
    const handleChangeEmail = (event) => {
       onFormChangeEmail(event.target.value)
    }

    const handleChangePassword = (event) => {
        onFormChangePassword(event.target.value)
    }

    const handleChangeRestaurant = (event) => {
        onFormChangeRestaurant(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
    }


    return(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="The Cork"/>
        <CssBaseline />
        </Container>
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
              paddingTop={8}
            >
            </Box>
            <Typography component="h1" variant="h5">
              Book a Restaurant
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="restaurant-name"
                    name="restaurant-name"
                    type="text"
                    required
                    fullWidth
                    id="restaurant-name"
                    label="Restaurant Name"
                    autoFocus
                    value={restaurantInput}
                    onChange={handleChangeRestaurant}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    type="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={emailInput}
                    onChange={handleChangeEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="password"
                    type="password"
                    label="Password"
                    name="password"
                    autoComplete="new-password"
                    value={passwordInput}
                    onChange={handleChangePassword}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: 200, padding: 1, margin: 2}}
                onClick={() => window.location.href = '/book'}
              >
                Book
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
}