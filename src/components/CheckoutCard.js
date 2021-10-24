import * as React from 'react';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Delete } from '@mui/icons-material';
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  card: {
    margin: 25,
  },
  grow: {
      flexGrow: 1,
  },
  cardActions: {
      display: "flex",
      justifyContent: "flex-end",
      textAlign:"center",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
}))

export default function CheckoutPage({ product }) {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles()
  const [{basket}, dispatch] = useStateValue()


  React.useEffect(() => {
    console.log(product)
  }, [])

  const removeItem= () => {
    dispatch({
      type: actionTypes.REMOVE_ITEM_FROM_BASKET,
      id: product.id,
    })
  }
  return (
    <Card sx={{ maxWidth: 345 }} className={classes.card}>
      <CardMedia
        className={classes.media}
        image={product.image.url}
        alt={product.name}
      />
      <CardContent >
        <div className={classes.cardContent}>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="h5">
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>    
        <IconButton aria-label="add to cart">
          <Delete fontSize="medium" onClick={removeItem}/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
