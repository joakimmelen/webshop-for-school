import { Box, Container, Typography } from '@mui/material'
import React from 'react'

function ErrorPage() {
  return (
    <Container maxWidth="lg">
    <Box sx={{ bgcolor: 'orange', height: '100vh' }}>
       <Typography>Oops, something went wrong..</Typography>
    </Box>
</Container>
  )
}

export default ErrorPage