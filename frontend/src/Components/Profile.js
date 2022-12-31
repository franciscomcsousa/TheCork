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

export default function Profile({ emailInput, passwordInput, onFormChangeEmail, onFormChangePassword, onFormSubmit, userData }) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChangeEmail = (event) => {
        onFormChangeEmail(event.target.value)
    }

    const handleChangePassword = (event) => {
        onFormChangePassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit()
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
      };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
          //onClick={() => window.location.href = '/profile'}
          /* PoP over */
        >
          See my profile
        </Button>
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Grid container spacing={2}>
            <Grid item xs={12}>
        <Typography sx={{ p: 10 }}> Name:{userData.name}</Typography>
        <Typography sx={{ p: 10 }}>Email:{userData.email} </Typography>
        <Typography sx={{ p: 10 }}>Wallet:{userData.wallet} </Typography>
        <Typography sx={{ p: 10 }}>Cards:{userData.card} </Typography>
            
            </Grid>
        </Grid>
      </Popover>
        <Box
          padding={3}
        ></Box>
      </Box>
    </Container>
    </Container>
      {/* <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      /> */}
    </ThemeProvider>
  );
}