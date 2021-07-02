import { Paper } from '@material-ui/core'
import React from 'react'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minWidth: 345,
    },

    pageNotFoundContainer: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    pageNotFound: {
        padding: '20px',
        width: '350px',
        height: '150px'
    }
});

const Error404 = () => {
    const classes = useStyles();

    return (
        <div className={classes.pageNotFoundContainer}>
            <Paper className={classes.pageNotFound}>
                <h3>
                    404 Page Not Found
                </h3>
                <a href="/">Go Back</a>
            </Paper>
        </div>
    )
}

export default Error404
