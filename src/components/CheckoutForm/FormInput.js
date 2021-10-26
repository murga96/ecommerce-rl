import React from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import {Controller, useFormContext} from 'react-hook-form'

export const FormInput = ({name, label, autoComplete}) => {
    const {control} = useFormContext()

    return (
        <>
           <Grid item xs={12} sm={6}>
               <Controller
                    render={({field}) => (
                        <TextField
                            required
                            id={name}
                            name={name}
                            label={label}
                            fullWidth
                            autoComplete={autoComplete}
                            variant="standard"
                        />
                    )}
                    control={control}
                    name={name}
                    require            
               />
           </Grid>
        </>
    )
}
