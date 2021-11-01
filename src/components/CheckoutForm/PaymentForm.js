import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Divider, List, ListItem, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { commerce } from '../lib/eCommerce.js/commerce';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

const stripePromise = loadStripe("pk_test_51JplGrKSjZWNRAJLU2OKEcGa8AuxvqI0UGSlw46RC534qWiHxqTlQFQKqFFAYIEZsKzUx0w3HF2HG50nH0gYHSLt0027PqLpnM")

export default function PaymentForm({token, shippingData, handleBack, nextStep}) {
  const [{basket, user, orderNumber}, dispatch] = useStateValue()
  console.log(shippingData, "shippingData")
  console.log(token, "checkout_token")
  const cardOptions = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
      base: {
        iconColor: "rgb(240, 57 ,122)",
        color: "#333",
        fontSize: "18px",
        "::placeholder": {
          color: "#ccc",
        },
      },
    invalid: {
      color: "#e5424d",
      ":focus": {
        color: "#303238"
      },
    }
    }
  }

  const sanitizedLineItems = (lineItems) => {
    return lineItems.reduce((data, lineItem) => {
      const item = data;
      let variantData = null;
      if (lineItem.selected_options.length) {
        variantData = {
          [lineItem.selected_options[0].group_id]: lineItem.selected_options[0].option_id,
        };
      }
      item[lineItem.id] = {
        quantity: lineItem.quantity,
        variants: variantData,
      };
    return item;
    }, {});
  };

  const handlingDispatch = async(order) => {
    dispatch({
      type: actionTypes.SET_ORDER_NUMBER,
      orderNumber: order.customer_reference
    })
    dispatch({
      type: actionTypes.SET_BASKET,
      basket: await commerce.cart.refresh(),
    })
    console.log(order.customer_reference,"id_customer")
    nextStep()
  }

  const onCaptureCheckout = async(tokenid, newOrder) => {
      await commerce.checkout.capture(tokenid, newOrder).then((order) =>(
        handlingDispatch(order)
      )).catch(
        // error => alert(error.data.error.message, "error in capture checkout")
        error => alert("Your data is invalid, review the payment and address data")
      )      
  }

  const handleSubmit = async(e, elements, stripe) => {
    e.preventDefault()

    if(!stripe || ! elements) return 

    const cardElement = elements.getElement(CardElement)
    console.log(cardElement, 'card')

    const {error, paymentMethod} = await stripe.createPaymentMethod({type: "card", card: cardElement})

    if(error){
      alert(error.message)
    } 
    else{
      const orderData = {
        line_items: sanitizedLineItems(token.live.line_items),
        customer: { 
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: user.email },
        shipping: { 
          name: 'Domestic',
          street: shippingData.address1, 
          town_city: shippingData.city, 
          county_state: shippingData.shippingSubdivision, 
          postal_zip_code: shippingData.zip, 
          country: shippingData.shippingCountry },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'test_gateway',
          card: {
            number: '4242 4242 4242 4242',
            expiry_month: '01',
            expiry_year: '23',
            cvc: '123',
            postal_zip_code: shippingData.zip,
          },
          // gateway: 'stripe',
          // stripe: {
          //   payment_method_id: paymentMethod.id,
          // },
        },
      };
      console.log(orderData)
      onCaptureCheckout(token.id, orderData)
    }
  }

  return (
    <>
      <Review token={token}/>
      <Divider sx={{mb: "1rem"}}/>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({elements, stripe}) => (
              <>
                <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                <div sx={{ display: 'flex', justifyContent: 'space-between'}}>
                  <CardElement options={cardOptions} />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="outlined" sx={{ mt: 3, ml: 1 }} onClick={handleBack}>Back</Button>
                    <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }} disabled={!stripe}>
                      {`Pay ${token.live.subtotal.formatted_with_symbol}`}
                    </Button>
                  </Box>
                </div>
              </form>
            </>
          )
          }
        </ElementsConsumer>
      </Elements>
    </>
  );
}