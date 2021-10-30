import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import { useStateValue } from '../../StateProvider';
import { commerce } from '../lib/eCommerce.js/commerce';

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [shippingData, setShippingData] = React.useState(0);
  const [{basket, orderNumber}, dispatch] = useStateValue();
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
      const generateToken = async() => {
        const token = await commerce.checkout.generateToken(basket?.id, {type: "cart"})
        setToken(token)
      }
      generateToken()
  }, [])

  const steps = ['Shipping address', 'Payment details']

  function getStepContent(step) {
    switch (step) {
      case 0:
        return token && <AddressForm token={token} handle={handleNext}/>;
      case 1:
        return <PaymentForm token={token} shippingData={shippingData} handleBack={handleBack} nextStep={handleNext}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = (data) => {
    if(activeStep === 0){
      setShippingData(data)
    }
    setActiveStep(activeStep + 1);  
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h4" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 2, pb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {(activeStep === steps.length) ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is {orderNumber}. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}