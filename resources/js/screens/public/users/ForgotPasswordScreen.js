import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import MainNavbar from "../../../components/MainNavbar"
import {
    Container,
    Paper,
    TextField,
    Button,
    Grid,
    Divider
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { withStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    paper: {
        margin: '5rem auto',
        width: '70%',
        padding: '5rem'
    }
}))

const ForgotPasswordScreen = ({ history }) => {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [emailSent, setEmailSent] = useState(false)

    useEffect(() => {
        if (emailSent) {
            history.push('/login')
        }
    }, [emailSent])

    const submitHandler = e => {
        e.preventDefault()

        Axios.post('/api/forgot-password', { email })

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Email has been sent. Please check your email inbox for a reset-password link.`,
            showConfirmButton: false,
            timer: 6500,
            width: '65rem'
        })

        setEmailSent(true)
    }

    return (
        <>
            <MainNavbar />

            <Paper elevation={3} className={classes.paper}>
                <div className='auth'>
                    <div className='auth__info'>
                        <h3 className='auth__info--title'>Forgot Password</h3>
                    </div>

                    <Divider />

                    <div className='auth__content'>
                        <form onSubmit={submitHandler}>
                        <TextField
                                variant='outlined'
                                margin='normal'
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                autoFocus
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />

                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                color='secondary'
                            >
                                Send Email
                            </Button>

                            <Grid container className='auth__content--grid'>
                                <Grid item xs>
                                    <Link to='/login'>Never mind..</Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </div>
            </Paper>
        </>
    )
}

export default ForgotPasswordScreen
