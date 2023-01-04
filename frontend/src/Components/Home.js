import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';


const mainFeaturedPost = {
  title: 'The Cork',
  description:
    "Search for restaurants, bars, and more in your area. Book a table, order food, or browse the menu. It's all here.",
    image: 'https://images.unsplash.com/photo-1447078806655-40579c2520d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  imageText: 'main image description',
};

const featuredPosts = [
  {
    title: 'Gift a Card!',
    date: 'Your friends will be happy...',
    description:
      'Give the gift of choice with a Cork Gift Card. Choose from a variety of amounts so you can give the perfect gift to that special someone.',
    image: 'https://images.unsplash.com/photo-1635166304779-8ebcfe8e57bd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    imageLabel: 'Image Text',
    link: "/gift_cards",
  },
  {
    title: 'Do you have a Gift Card?',
    date: 'Redeem it here!',
    description:
      'Someone thought of you and gave you a Cork Gift Card? Well, now is the time to redeem it! You dont want to leave them hanging, do you?',
    image: 'https://media.istockphoto.com/id/183764681/photo/3d-gift-card.jpg?b=1&s=170667a&w=0&k=20&c=cwQcCegtVu9kfjrm9adhQvLHhV8vbZQjA-yjbzr1q8E=',
    imageLabel: 'Image Text',
    link: "/redeem_cards"
  },
  {
    title: 'My Profile!',
    date: 'Check it out!',
    description:
      'Want to see your wallet amount? Or maybe you want to see your gift card purchases? Well, you\'re in the right place!',
    image: 'https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE=',
    imageLabel: 'Image Text',
    link: "/profile"
  },
  {
    title: 'Wanna book a restaurant?',
    date: 'Now\'s the chance!',
    description:
      'We offer a wide variery of restaurants for you to choose from. No matter what you\'re craving, we\'ve got you covered!',
    image: 'https://preview.redd.it/k6bomo62obs71.jpg?width=819&format=pjpg&auto=webp&s=40713e7cf5d041781f3a5ebb1b22561e9ed01961',
    imageLabel: 'Image Text',
    link: "/book"
  },
];

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        The Cork
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="The Cork"/>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      {/*Redeem points*/}
      <Box
        paddingTop={4}
      >
      <Button size="large" variant="contained" color="primary" href="/redeem_points">
        Redeem Your Points Here!
      </Button>
      </Box>
      <Box
        paddingTop={4}
        paddingBottom={3}
      >
      <Copyright />
      </Box>
    </ThemeProvider>
  );
}