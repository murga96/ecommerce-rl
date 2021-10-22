import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles'
import accounting from 'accounting';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        display:"flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        height: "20vh",
        marginTop: 20,
    },
}))

const Total = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h5>Total items: 3</h5>
            <h5>{accounting.formatMoney(50)}</h5>
            <Button sx={{marginTop: "2rem"}} variant="contained" color="error">Check out</Button>
        </div>
    )
}

export default Total
