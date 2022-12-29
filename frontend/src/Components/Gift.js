//import * as React from 'react';
import React, { useState, useEffect } from 'react';
//import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Checkbox from '@mui/material/Checkbox';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
//import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
//import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
//import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
//import Popover from '@mui/material/Popover'
import {useNavigate} from 'react-router-dom'


//TODO
const sections = [
    { title: 'Chinese', url: '#' },
    { title: 'Indian', url: '#' },
    { title: 'Italian', url: '#' },
    { title: 'Portuguese', url: '#' },
    { title: 'Greek', url: '#' },
    { title: 'Spanish', url: '#' },
    { title: 'Moroccan', url: '#' },
    { title: 'Turkish', url: '#' },
    { title: 'Thai', url: '#' },
    { title: 'French', url: '#' },
  ];


const tiers = [
  {
    title: '',
    price: '15',
    description: [],
    buttonText: 'Choose this one',
    currentButtonVariant: 'outlined',
  },
  {
    title: '',
    subheader: 'Most Popular',
    price: '25',
    description: [],
    buttonText: 'Choose this one',
    currentButtonVariant: 'outlined',
  },
  {
    title: '',
    price: '50',
    description: [],
    buttonText: 'Choose this one',
    currentButtonVariant: 'outlined',
  },
];
  
  /*
  const footers = [
    {
      title: 'Company',
      description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
      title: 'Features',
      description: [
        'Cool stuff',
        'Random feature',
        'Team feature',
        'Developer stuff',
        'Another one',
      ],
    },
    {
      title: 'Resources',
      description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
      title: 'Legal',
      description: ['Privacy policy', 'Terms of use'],
    },
  ];*/
  
// function PricingContent() {
//   return (
    
//   );
// }

// export default function Pricing() {
//   return <PricingContent />;
// }


const theme = createTheme();

export default function Gift({ emailInput, passwordInput, onFormChangeEmail, onFormChangePassword, onFormSubmit, onFormChangeCard }) {
  //const navigate = useNavigate();

  
  const handleChangeEmail = (event) => {
    onFormChangeEmail(event.target.value)
  }

  const handleChangePassword = (event) => {
    onFormChangePassword(event.target.value)
  }

  const handleChangeCard = (event) => {
    onFormChangeCard(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onFormSubmit()
  }


  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="The Cork" sections={sections}/>
        <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      {/* <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Company name
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Features
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Enterprise
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Support
            </Link>
          </nav>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar> */}
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 1, pb: 5 }}>
        <Box
          paddingTop={2}
        ></Box>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Gift Cards
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          {/* Quickly build an effective pricing table for your potential customers with
          this layout. It&apos;s built with default MUI components with little
          customization. */}
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.price}
              xs={12}
              //sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.subheader === 'Most Popular' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[300]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      {tier.price}€
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.currentButtonVariant} value={tier.price} onClick={handleChangeCard}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
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
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            paddingTop={1}
          ></Box>
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
          // onClick={() => window.location.href = '/'}
          /* PoP over */
        >
          Buy!
        </Button>
      </Box>
    </Container>

      
      {/* Footer */}
      {/* <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container> */}
      {/* End footer */}
    </React.Fragment>
    </Container>
    </ThemeProvider>
  );
}