import React from 'react';
import { Container, Grid, Typography, Link } from '@mui/material';
import '../Footer/Footer.module.css'; // Import the CSS file for styling

export default function Footer() {
  return (
    <footer className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4} justify="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              TW Elements
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Products
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Link href="#" color="inherit">Angular</Link>
              <br />
              <Link href="#" color="inherit">React</Link>
              <br />
              <Link href="#" color="inherit">Vue</Link>
              <br />
              <Link href="#" color="inherit">Laravel</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Useful links
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Link href="#" color="inherit">Pricing</Link>
              <br />
              <Link href="#" color="inherit">Settings</Link>
              <br />
              <Link href="#" color="inherit">Orders</Link>
              <br />
              <Link href="#" color="inherit">Help</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="textSecondary">
              New York, NY 10012, US
              <br />
              info@example.com
              <br />
              + 01 234 567 88
              <br />
              + 01 234 567 89
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
