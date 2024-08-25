import { Box, Paper, Container,  Typography } from "@mui/material"

const Header  = () => {                         
    return (                                                                              
        <Container>
            <Paper elevation={10}>     
                <Box border={1} p={5} bgcolor="#ffa726">  
                    <Typography gutterBottom variant="h1" align="center"
                    sx={{
                        fontSize: {
                            xs: "34px",
                            md: "80px",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            fontFamily: '"Baskervville SC", "sans',
                            fontweight: "400",
                            fontstyle: "normal"
                        }
                    }}>Drink Finder</Typography>
                    <Typography variant="h4" align="center"
                    sx={{
                        fontSize: {
                            xs: "20px",
                            md: "40px",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            fontFamily: '"Baskervville SC", "sans',
                            fontweight: "400",
                            fontstyle: "normal"
                        }
                    }}>Find Your Perfect Cocktail Here!</Typography>
                </Box>            
            </Paper>
        </Container>
    )
}

export default Header