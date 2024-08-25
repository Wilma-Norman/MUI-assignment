import Header from './components/Header'
import {Button, Container, Box, Paper, Card, CardHeader, CardMedia, CardContent, Tab} from '@mui/material';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';

type CocktailType = {
  title: string,
  category: string,
  image: string,
  instructions: string,
  ingredients: string[],
  measures: string[],
  glass: string
}

function App() {
  const [recipe, setRecipe] = useState<CocktailType | null>(null)
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const styles = {
    boxStyle: {
      padding: 2,
      backgroundColor: "#ffcc80",
      my: 4,
      border: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    cardBox: {
      display: "flex",
      justifyContent: "row",
      '@media (max-width: 600px)': {
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
      }
    },

    image: {
      width: '50%', 
      height: 'auto',
      '@media (max-width: 600px)': {
          marginTop: "20px"
      }
    },

    infoContainer: {
      fontFamily: '"Baskervville SC", "sans',
      fontweight: "400",
      fontstyle: "normal",
    },

    wraperContainer: {
      marginTop: "20px",
      '@media (max-width: 300px)': {
          width: "100%",
          padding: "0",
          marginTop: "10px"
          
      }
    }
  }

  const handleClick = async():Promise<void> => {    
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      const data = await response.json();      
      let drink = data.drinks[0]
      
      const ingredientKeys = Object.keys(drink).filter(item => item.includes("strIngredient"))
      const ingredientValues = [];
      const measureValues = [];

      for(let i = 0; i < ingredientKeys.length; i++) {
        if (drink[ingredientKeys[i]] !== "") {
          ingredientValues.push(drink[ingredientKeys[i]])
          measureValues.push(drink[`strMeasure` + (i + 1)])
          }
      }      

      setRecipe({title: drink.strDrink,
        category: drink.strCategory,
        image: drink.strDrinkThumb,
        instructions: drink.strInstructions,
        ingredients: ingredientValues,
        measures: measureValues,
        glass: drink.strGlass
      })
    } catch(error) {
      console.log(error)
    }      
  }

  return (
    <>
    <Header />
    <Container maxWidth="lg" sx={styles.wraperContainer}>
      <Paper>
      {recipe && (
        <Box>
            <Card >
              <CardHeader title={recipe.title}
              subheader={`${recipe.category} - ${recipe.glass}`}>
              </CardHeader>
              <Box sx={styles.cardBox}>
              <CardMedia component="img" src={recipe.image} sx={styles.image} />
                <CardContent>              
                  <Box sx={{ width: '100%', typography: 'body1', }}>
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                          <Tab sx={styles.infoContainer} label="Ingredient" value="1" />
                          <Tab sx={styles.infoContainer} label="Instructions" value="2" />
                        </TabList>
                      </Box>
                      <TabPanel sx={{fontFamily: '"Baskervville SC", "sans"', fontweight: "400", fontstyle: "normal"}}
                       value="1">{recipe.ingredients.map((item, index) => {
                        return <p key={index}>{item} {recipe.measures[index]}</p>
                      })}
                      </TabPanel>
                      <TabPanel sx={{fontFamily: '"Baskervville SC", "sans"', fontweight: "400", fontstyle: "normal"}}
                       value="2">{recipe.instructions}
                       </TabPanel>
                    </TabContext>
                  </Box>
                </CardContent>
              </Box>
            </Card>
      </Box>                                        
      )}
        <Box sx={styles.boxStyle}>
          <Button sx={{fontFamily: '"Baskervville SC", "sans"', fontweight: "400", fontstyle: "normal"}}
           onClick={handleClick} endIcon={<LocalBarIcon />} size="large" color="warning" variant="contained">New Drink</Button>
        </Box>
      </Paper>
    </Container>
    </>
  )
}

export default App




