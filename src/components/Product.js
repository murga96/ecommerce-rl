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
import accounting from "accounting";
import { actionTypes } from '../reducer';
import {useStateValue} from "../StateProvider"


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

export default function Product({ product : {id, name, productType, image, price, rating, description} }) {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles()
  const [{basket}, dispatch] = useStateValue()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToBasket = () => {
    dispatch ({
      type: actionTypes.ADD_TO_BASKET,
      item: {
        id,
        name,
        productType,
        image,
        price,
        rating,
        description,
      }
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
            {accounting.formatMoney(price)}
          </Typography>
        }
        title={name}
        subheader="in Stock"
      />
      <CardMedia
        className={classes.media}
        image={image}
        alt={image}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {productType}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to cart">
          <AddShoppingCart fontSize="large" onClick= { addToBasket }/>
        </IconButton>
        {Array(rating).fill().map((_,i) => (
            <p>&#11088;</p>
        )
        )}
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
          <Typography paragraph>{description}</Typography>          
        </CardContent>
      </Collapse>
    </Card>
  );
}
