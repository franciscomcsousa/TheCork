import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Header from './Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom'


const theme = createTheme();

export default function RedeemPointsForm({ pointsInput, emailInput, onFormChangePoints, onFormChangeEmail, onFormSubmit, userData }) {
    const navigate = useNavigate();

    const handleChangePoints = (event) => {
       onFormChangePoints(event.target.value)
    }

    const handleChangeEmail = (event) => {
        onFormChangeEmail(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
    }

    if (userData) {
      //console.log(userData) For some reason only alerts when its submitted twice ## 
      //problem when redirecting  TODO, fix the user interface 
      if (userData.status === 200) {
        //navigate("/", {replace: true})
        alert("Redeem Successful")
        navigate(0)
      }
      else if (userData.status !== 200) {
            alert("User and/or Points is incorrect")//TODO: also add the predefined messages 
            navigate(0)
      }  
    }

    let re = /\S+@\S+\.\S+/;

    const validate = () => {
      return re.test(emailInput) && pointsInput.length > 0 && pointsInput > 0 && pointsInput % 1 === 0;
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
          >
            <Box
              m={1} //margin
              paddingTop={1}
            >
            <Avatar sx={{ m: 3, bgcolor: 'blueviolet', width: 60, height: 60}}>
              <CreditCardIcon />
            </Avatar>
            </Box>
            <Typography component="h1" variant="h5">
              Redeem your points in exchange for restaurant credit (100 points = $5)
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="points"
                    name="points"
                    type="number"
                    required
                    fullWidth
                    id="points"
                    label="Points"
                    autoFocus
                    value={pointsInput}
                    onChange={handleChangePoints}
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
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: 200, padding: 1, margin: 2}}
                onClick={() => window.location.href = '/redeem_points'}
                disabled={!validate()}
              >
                Redeem
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
}