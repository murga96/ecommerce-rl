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
import { AddShoppingCart, Delete } from '@mui/icons-material';
import accounting from "accounting";
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';


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
  action: {
    margintop: "5",
  },
  card: {
    margin: 25,
  },
  grow: {
      flexGrow: 1,
  },
  cardActions: {
      display: "flex",
      justifyContent: "space-between",
      textAlign:"center",
  },
  cardRating: {
    display: "flex",
  },
}))

export default function CheckoutPage({ product : {id, name, productType, image, price, rating, description} }) {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles()
  const [{basket}, dispatch] = useStateValue()


  const removeItem= () => {
    dispatch({
      type: actionTypes.REMOVE_ITEM_FROM_BASKET,
      id: id,
    })
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }} className={classes.card}>
      <CardHeader 
        action={
          <Typography sx={{marginTop:"1rem"}}
           //sclassName={classes.action}
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
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <div className={classes.cardRating}>
        {Array(rating).fill().map((_,i) => (
            <p>&#11088;</p>
        )
        )}
        </div>
        <IconButton aria-label="add to cart">
          <Delete fontSize="large" onClick={removeItem}/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
