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


const theme = createTheme();

export default function Profile({ emailInput, passwordInput, onFormChangeEmail, onFormChangePassword, onFormSubmit, data }) {

  const handleChangeEmail = (event) => {
    onFormChangeEmail(event.target.value)
  }

  const handleChangePassword = (event) => {
    onFormChangePassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onFormSubmit()
  }

  let re = /\S+@\S+\.\S+/;

  const validate = () => {
    return re.test(emailInput) && passwordInput.length > 0;
  };

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
              Sign in
            </Typography>
          </Box>
        </Box>
        {/*data && (
          <div className='form-group'>
              <div
                className={data ? 'alert alert-success' : 'alert alert-danger'}
                role='alert'
              >
                {data.message}
              </div>
          </div>
        )*/}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={passwordInput}
                onChange={handleChangePassword}
              />
            </Grid>
          </Grid>
          <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ height: 40, width: 200 }}
          disabled={!validate()}
          >
          See my profile
          </Button>
          <Box padding={3}>
          </Box>
        </Box>
      </Container>
      </Container>
    </ThemeProvider>
  );
}