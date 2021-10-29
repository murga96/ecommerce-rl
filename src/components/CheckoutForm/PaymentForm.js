import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import Checkout from './Checkout';

export default function PaymentForm({token, shippinData, handleBack}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {console.log(token)}
      <List disablePadding>
        {token.live.line_items.map((product) => (
          <ListItem key={product.name } sx={{ py: "10px", px: 0 }}>
            <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`}  />
            <Typography variant="body">{product.line_total.formatted_with_symbol}</Typography>
          </ListItem> 
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {token.live.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" sx={{ mt: 3, ml: 1 }} onClick={handleBack}>
            Back
          </Button>
          <Button 
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
          >
            Pay
          </Button>
        </Box>
    </React.Fragment>
  );
}