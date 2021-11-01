import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {Controller, useForm, FormProvider} from "react-hook-form"
import {Link as RouteLink, useHistory} from "react-router-dom"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth } from './../firebase';


const theme = createTheme();

export default function SignUp() {
    const history = useHistory()

    //react-hook-form
    const schema = yup.object().shape({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      email: yup.string().email("Email must be a valid email").required("Email address is required"),
      password: yup.string().required("Password is required"),
    })
    const {handleSubmit, control, formState: {errors}} = useForm({
      resolver: yupResolver(schema),
    })

  const handleDataSubmit = async(data) => {    
    auth.createUserWithEmailAndPassword(data.email, data.password).then((user) =>{
      user.user.updateProfile({
        displayName: data.firstName,
      }).then(() => {
        if(auth){
          history.push("/")
        }
      }).catch(
        err=>alert(err.message)
      )
    }).catch(
      err=>alert(err.message)
    )
    console.log(data, "data")
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit(handleDataSubmit)}>
            {console.log(errors,"Errors")}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                      render={({field}) => (
                        <TextField
                          {...field}
                          autoComplete="given-name"
                          name="firstName"
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                          error={!!errors["firstName"]}
                          helperText={errors["firstName"]?.message ?? ''}
                        />
                      )}
                      control={control}
                      defaultValue=""
                      name="firstName"      
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                        render={({field}) => (
                          <TextField
                            {...field}
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            error={!!errors["lastName"]}
                            helperText={errors["lastName"]?.message ?? ''}
                          />
                        )}
                        control={control}
                        defaultValue=""
                        name="lastName"       
                    />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                          render={({field}) => (
                            <TextField
                              {...field}
                              fullWidth
                              id="email"
                              label="Email Address"
                              autoComplete="email"
                              error={!!errors["email"]}
                              helperText={errors["email"]?.message ?? ''}
                            />
                          )}
                          control={control}
                          defaultValue=""
                          name="email"       
                      />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                          render={({field}) => (
                            <TextField
                              {...field}
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              autoComplete="new-password"
                              error={!!errors["password"]}
                              helperText={errors["password"]?.message ?? ''}
                            />
                          )}
                          control={control}
                          defaultValue=""
                          name="password"      
                      />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={signup}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RouteLink to="signin">
                    Already have an account? Sign in
                  </RouteLink>
                </Grid>
              </Grid>
            </form>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}