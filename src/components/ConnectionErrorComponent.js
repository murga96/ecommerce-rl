import React from 'react'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

export const ConnectionErrorComponent = () => {
    return (
        <React.Fragment>
            <Typography align='center' variant="h6" sx={{mt:"10rem"}}>
                There appears to be trouble with your network connection.
            </Typography>
        </React.Fragment>
    )
}
