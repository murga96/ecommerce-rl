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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AddShoppingCart } from '@mui/icons-material';
import { actionTypes } from '../reducer';
import {useStateValue} from "../StateProvider"
import { commerce } from './lib/eCommerce.js/commerce';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  card: {
    margin: 25,
  }
}))

export default function Product({ product,onAddToCart}) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false);
  const [{basket}, dispatch] = useStateValue();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddToCart = async(productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity)
    dispatch({
      type: actionTypes.SET_BASKET,
      basket: item.cart,
    })
  }

  return (
    <Card sx={{ maxWidth: 345 }} className={classes.card}>
      <CardHeader
        action={
          <Typography sx={{marginTop:"1rem"}}
           variant="h5"
           color="textSecondary" 
          >
            {product.price.formatted_with_symbol}
          </Typography>
        }
        title={product.name}
        subheader="in Stock"
      />
      <CardMedia
        className={classes.media}
        image={product.image.url}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Sports Shoes
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to cart">
          <AddShoppingCart fontSize="large" onClick={ () => handleAddToCart(product.id, 1)}/>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography dangerouslySetInnerHTML={{__html: product.description}} paragraph></Typography>          
        </CardContent>
      </Collapse>
    </Card>
  );
}
