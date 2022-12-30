import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
//import Main from './Main';
//import Sidebar from './Sidebar';
//import Footer from './Footer';
//import post1 from './blog-post.1.md';
//import post2 from './blog-post.2.md';
//import post3 from './blog-post.3.md';

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

//TODO
const mainFeaturedPost = {
  title: 'The Cork',
  description:
    "Search for restaurants, bars, cafes, and more in your area. Book a table, order food, or just browse the menu. It's all here.",
    image: 'https://images.unsplash.com/photo-1447078806655-40579c2520d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  imageText: 'main image description',
};

//TODO
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
    date: 'Check it here!',
    description:
      'wallet text :D',
    image: 'https://cdn.discordapp.com/attachments/434458510408024090/1057674178280566784/20221227_185903.jpg',
    imageLabel: 'Image Text',
    link: "/profile"
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
];

//const posts = [post1, post2, post3];

// const sidebar = {
//   title: 'About',
//   description:
//     'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
//   archives: [
//     { title: 'March 2020', url: '#' },
//     { title: 'February 2020', url: '#' },
//     { title: 'January 2020', url: '#' },
//     { title: 'November 1999', url: '#' },
//     { title: 'October 1999', url: '#' },
//     { title: 'September 1999', url: '#' },
//     { title: 'August 1999', url: '#' },
//     { title: 'July 1999', url: '#' },
//     { title: 'June 1999', url: '#' },
//     { title: 'May 1999', url: '#' },
//     { title: 'April 1999', url: '#' },
//   ],
//   social: [
//     { name: 'GitHub', icon: GitHubIcon },
//     { name: 'Twitter', icon: TwitterIcon },
//     { name: 'Facebook', icon: FacebookIcon },
//   ],
// };

const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="The Cork" sections={sections}/>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          {/* <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="From the firehose" posts={posts}/>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid> */}
        </main>
      </Container>
      {/* <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      /> */}
    </ThemeProvider>
  );
}