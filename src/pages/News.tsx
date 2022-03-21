import { Container, Typography, Box, Paper, Grid, BottomNavigation } from '@mui/material'
import React from 'react'

function News() {
  return (
    <Container>
      <Typography variant="h3" component="h1" marginTop={7}>
        Welcome to the cool and new J-Store
      </Typography>
      {/* <Box marginTop={1} sx={{ display: "grid" }}> */}
        <img
          src="/assets/logo.png"
          height={325}
        />
      {/* </Box> */}
      <Typography variant="h6" component="h4" marginTop={3}>
        About this store
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h5" component="p" marginY={3}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit
          voluptates rem quos delectus debitis earum modi, ipsum veritatis.
          Perferendis officiis nobis, aut hic praesentium nulla vero, possimus
          omnis reprehenderit blanditiis quis incidunt minima voluptatibus illum
          quam corporis libero fugiat doloremque. Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Exercitationem officiis commodi beatae
          animi incidunt necessitatibus aut provident ad ex. Saepe!
        </Typography>
      </Box>
      <Typography variant="h6" component="h4" marginBottom={3}>
        Frequently Asked Questions
      </Typography>
      
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
      
        >
          
        </BottomNavigation>
      </Paper>
    </Container>
  )
}

export default News