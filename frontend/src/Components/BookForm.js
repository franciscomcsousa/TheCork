import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Header from './Header';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import BookIcon from '@mui/icons-material/Book';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

const restaurants = [
  { label: 'La Pizzeria' },
  { label: 'La Pasta'},
  { label: 'Taco Bell'},
  { label: 'Pizza Hut'},
];

export default function BookForm({ emailInput, peopleCountInput, restaurantInput, onFormChangeEmail, onFormChangePeopleCount, onFormChangeRestaurant, onFormSubmit, userData }) {

    const handleChangeEmail = (event) => {
       onFormChangeEmail(event.target.value)
    }

    const handleChangePeopleCount = (event) => {
        onFormChangePeopleCount(event.target.value)
    }

    const handleChangeRestaurant = (event) => {
        onFormChangeRestaurant(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
    }

    let re = /\S+@\S+\.\S+/;

    const validate = () => {
      return re.test(emailInput) && restaurantInput.length > 0 && peopleCountInput > 0 && peopleCountInput % 1 === 0;
    };


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
          > <Avatar sx={{ m: 2, bgcolor: 'blueviolet' }}>
              <BookIcon />
            </Avatar>
            <Box
              m={1} //margin
            >
            </Box>
            <Typography component="h1" variant="h5">
              Book a Restaurant
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Autocomplete
                    id='restaurant-names'
                    options={restaurants}
                    renderInput={(params) => (
                      <TextField
                        {...params}
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
                    )}
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
                    id="people-count"
                    type="number"
                    label="For how many people"
                    name="people-count"
                    autoComplete="people-count"
                    value={peopleCountInput}
                    onChange={handleChangePeopleCount}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: 200, padding: 1, margin: 2}}
                disabled={!validate()}
              >
                Book
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
}