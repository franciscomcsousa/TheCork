import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';


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

const theme = createTheme();

export default function Gift({ emailInput, passwordInput, onFormChangeEmail, onFormChangePassword, onFormSubmit, onFormChangeCard }) {
  //const navigate = useNavigate();

  const [newTiers, setTiers] = React.useState(tiers);

  const handleChangeEmail = (event) => {
    onFormChangeEmail(event.target.value)
  }

  const handleChangePassword = (event) => {
    onFormChangePassword(event.target.value)
  }

  const handleChangeCard = (event, price) => {
    onFormChangeCard(event.target.value)
    switch (price) {
      case '15': 
        if(newTiers[0].currentButtonVariant === 'outlined') { 
          newTiers[0].currentButtonVariant = 'contained'; newTiers[1].currentButtonVariant = 'outlined'; newTiers[2].currentButtonVariant = 'outlined'; 
          newTiers[0].buttonText = 'Tier selected'; newTiers[1].buttonText = 'Choose this one'; newTiers[2].buttonText = 'Choose this one'}
        else { newTiers[0].currentButtonVariant = 'outlined'; } break;
      case '25': 
        if(newTiers[1].currentButtonVariant === 'outlined') { 
          newTiers[1].currentButtonVariant = 'contained'; newTiers[0].currentButtonVariant = 'outlined'; newTiers[2].currentButtonVariant = 'outlined'; 
          newTiers[1].buttonText = 'Tier selected'; newTiers[0].buttonText = 'Choose this one'; newTiers[2].buttonText = 'Choose this one'} 
        else { newTiers[1].currentButtonVariant = 'outlined'; } break;
      case '50': 
        if(newTiers[2].currentButtonVariant === 'outlined') { 
          newTiers[2].currentButtonVariant = 'contained'; newTiers[0].currentButtonVariant = 'outlined'; newTiers[1].currentButtonVariant = 'outlined'; 
          newTiers[2].buttonText = 'Tier selected'; newTiers[0].buttonText = 'Choose this one'; newTiers[1].buttonText = 'Choose this one'} 
        else { newTiers[2].currentButtonVariant = 'outlined'; } break;
      default: break;
    }
    setTiers(newTiers)
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
        <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}/>
      <CssBaseline />
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
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {newTiers.map((tier) => (
            <Grid
              item
              key={tier.price}
              xs={12}
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
                  {/* Make button variant change when clicked*/}
                  <Button fullWidth value={tier.price} onClick={(event)=>handleChangeCard(event, tier.price)} variant={tier.currentButtonVariant}>
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
          disabled={!validate()}
        >
          Buy
        </Button>
        <Box
          padding={3}
        ></Box>
      </Box>
    </Container>
    </React.Fragment>
    </Container>
    </ThemeProvider>
  );
}