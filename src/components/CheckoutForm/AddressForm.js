import * as React from 'react';
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { commerce } from '../lib/eCommerce.js/commerce';
import { Button, InputLabel, MenuItem, Select } from '@mui/material';
import { FormInput } from './FormInput';
import { useForm, FormProvider, Controller }from 'react-hook-form'
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

export default function AddressForm({token, handle}) {
  //Selects variables
  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState("")
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState("")
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState(null)

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}))
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}))
  const options = shippingOptions.map((sO) => ({id: sO.id, label: `${sO.description} -(${sO.price.formatted_with_symbol})`}))

  const fetchShippingCountries = async(token) => {
    const {countries} = await commerce.services.localeListShippingCountries(token)
    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0])
  }

  const fetchShippingSubdivisions = async(shippingCountry) => {
    const {subdivisions} = await commerce.services.localeListShippingSubdivisions(token.id,shippingCountry)
    setShippingSubdivisions(subdivisions)
    setShippingSubdivision(Object.keys(subdivisions)[0])
  }

  const fetchShippingOptions = async(tokenId, country, region=null) => {
    const options = await commerce.checkout.getShippingOptions(tokenId, {country, region})
    setShippingOptions(options)
    setShippingOption(options[0].id)
  }

  React.useEffect(() => {
    fetchShippingCountries(token.id)
  }, [])

  React.useEffect(() => {
    if(shippingCountry) fetchShippingSubdivisions(shippingCountry)
  }, [shippingCountry])

  React.useEffect(() => {
    if(shippingSubdivision) fetchShippingOptions(token.id, shippingCountry, shippingSubdivision)
  }, [shippingSubdivision])

  //React-hook-
  const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    address1: yup.string().required("Address1 name is required"),
    address2: yup.string().required("Address2 is required"),
    city: yup.string().required("City is required"),
    zip: yup.string().required("Zip name is required"),
  })
  const methods = useForm({
    resolver: yupResolver(schema),
  })
  const {handleSubmit, formState: {errors}} = methods

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit((data) => handle({...data, setShippingCountry, shippingSubdivision, shippingOption}))}>
          <Grid container spacing={3}>
            <FormInput name="firstName" label="First name" autoComplete="given-name"/>
            <FormInput name="lastName" label="Last name" autoComplete="family-name"/>
            <FormInput name="address1" label="Address line 1" autoComplete="shipping address-line1"/>
            <FormInput name="address2" label="Address line 2" autoComplete="shipping address-line2"/>
            <FormInput name="city" label="City" autoComplete="shipping address-level2"/>
            <FormInput name="zip" label="Zip / Postal code" autoComplete="shipping postal-code"/>
            {console.log(errors,"errors")}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivisions</InputLabel>
              <Select variant="standard" fullWidth value={shippingSubdivision} onChange={(e) => setShippingSubdivision(e.target.value)}>
                {
                    subdivisions.map((sub) =>(
                      <MenuItem id={sub.id} value={sub.id}>
                      {sub.label}
                      </MenuItem>
                    ))
                }
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Countries</InputLabel>
              <Select variant="standard" fullWidth value={shippingCountry} onChange={(e) => setShippingCountry(e.target.value)}>
                {
                  countries.map((country) =>(
                    <MenuItem id={country.id} value={country.id}>
                      {country.label}
                    </MenuItem>
                  ))
                }
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select variant="standard" fullWidth value={shippingOption} onChange={(e) => setShippingOption(e.target.value)}>
                {
                  options.map((option) =>(
                    <MenuItem id={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))
                }
              </Select>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" component={Link} to="/checkout-page" sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                  >
                  Next
                  </Button>
                </Box>
        </form>
      </FormProvider>
    </React.Fragment>
  );
}