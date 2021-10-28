import React, { memo } from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import {Controller, useFormContext} from 'react-hook-form'

export const FormInput = ({name, label, autoComplete}) => {
    const {control, formState: {errors}} = useFormContext()
    return (
        <>
           <Grid item xs={12} sm={6}>
               <Controller
                    render={({field}) => (
                        <TextField
                            {...field}
                            id={name}
                            name={name}
                            label={label}
                            fullWidth
                            autoComplete={autoComplete}
                            variant="standard"
                            error={!!errors[name]}
                            helperText={errors[name]?.message ?? ''}
                        />
                    )}
                    control={control}
                    defaultValue=""
                    name={name}       
               />
           </Grid>
        </>
    )
}
