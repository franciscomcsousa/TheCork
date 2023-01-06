import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom'


const sections = [
  { title: 'Chinese', url: '/book' },
  { title: 'Indian', url: '/book' },
  { title: 'Italian', url: '/book' },
  { title: 'Portuguese', url: '/book' },
  { title: 'Greek', url: '/book' },
  { title: 'Spanish', url: '/book' },
  { title: 'Moroccan', url: '/book' },
  { title: 'Turkish', url: '/book' },
  { title: 'Thai', url: '/book' },
  { title: 'French', url: '/book' },
];

const usefulKeywords = [
  { label: 'The Cork', url: '/' },
  { label: 'Cork', url: '/' },
  { label: 'Restaurant', url: '/book' },
  { label: 'Register', url: '/register' },
  { label: 'Book', url: '/book' },
  { label: 'User', url: '/profile' },
  { label: 'Owner', url: '/restaurant' },
  { label: 'Redeem Voucher', url: '/redeem_points' },
  { label: 'Voucher', url: '/redeem_points' },
  { label: 'Reedem Gift Card', url: '/redeem_cards' },
  { label: 'Gift Card', url: '/redeem_cards' },
  { label: 'Points', url: '/redeem_points' },
  { label: 'Redeem Points', url: '/redeem_points' },
  { label: 'Profile', url: '/profile' },
  { label: 'Table', url: '/book' },
  { label: 'Chinese', url: '/book' },
  { label: 'Indian', url: '/book' },
  { label: 'Italian', url: '/book' },
  { label: 'Portuguese', url: '/book' },
  { label: 'Greek', url: '/book' },
  { label: 'Spanish', url: '/book' },
  { label: 'Moroccan', url: '/book' },
  { label: 'Turkish', url: '/book' },
  { label: 'Thai', url: '/book'},
  { label: 'French', url: '/book' },
];


function Header(props) {
  const { title } = props;
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small" onClick={() => window.location.href = '/restaurant'}>Restaurant Owner </Button>
        <Box
        m={1} //margin
        display="flex"
        justifyContent="center"
        alignItems="center"
        paddingLeft={42.5}
        paddingRight={19}
        >
        <Button size="large" variant="text" color="inherit" onClick={() => navigate('/', {replace: true})}>{title}</Button>
        </Box>
        <Box
          paddingRight={4}
          paddingBottom={0.5}
        > <Autocomplete
            disablePortal
            size='small'
            id="keywords"
            options={usefulKeywords}
            sx={{ width: 215, height: 37 }}
            renderInput={(params) => <TextField {...params} label="Search" />}
            onChange={(event, option) => {
              window.location.href=option.url;
            }}
          />
        </Box>
        <Button variant="outlined" size="small" onClick={() => window.location.href = '/register'}>
          Register
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;