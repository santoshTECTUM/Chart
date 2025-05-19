import { Box, Button, Grid, Link } from '@mui/material'
import React from 'react'
import { router } from '../Layout/routes'
import { useNavigate } from 'react-router-dom'

export const Menu = () => {

    const navigate = useNavigate()
    return (
        <Box>
            <Grid container spacing={1}>
                {router.map((item, index) => (
                    <Grid item xs={2} key={index}>
                        <Link to={item.url} onClick={() => navigate(item.url)}>
                            <Button title={`Redirect to ${item.name}`} variant="contained" color="primary">
                                {item.name}
                            </Button>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Menu