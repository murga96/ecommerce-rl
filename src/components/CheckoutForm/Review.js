import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export default function Review({token}) {
  return (
    <React.Fragment>
      <Typography variant="h6">
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
    </React.Fragment>
  );
}