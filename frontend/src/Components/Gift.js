import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';


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


function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          The Cork
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const theme = createTheme();

export default function Gift({ nameInput, emailInput, passwordInput, onFormChangeName, onFormChangeEmail, onFormChangePassword, onFormSubmit }) {
  
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
        <Header title="Fast and Delicious" sections={sections}/>
        </Container>    
    </ThemeProvider>
  );
}