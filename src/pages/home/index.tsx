import { Box, Button, CircularProgress, Container, Grid, Pagination } from "@mui/material";
import React from "react";
import { CardComponent, HeaderComponent } from "../../components";
import { characters } from "../../api/character";
import { TypeCharacter } from "./interface/character.interface";

export const HomePage: React.FC<{}> = () => {
  const [allCharacters, setAllCharacters] = React.useState<
    TypeCharacter[] | null
  >(null);
  
  const [loading, setLoading] = React.useState<boolean>(true);
  const [page, setPage]= React.useState(1);
  const [count, setCount]= React.useState(0);

  
  React.useEffect(() => {
    setLoading(true);
    characters
      .getAll({ page })
      .then((r) => {
        setCount(r.data.info.pages)
        setAllCharacters(r.data.results);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [page]);

  const handleChange=(event:React.ChangeEvent<unknown>, value:number)=>{
    setPage(value)
  }

  return (
    <Container maxWidth="xl">
      <HeaderComponent
        title="Hola mundo"
        description="Hola mundo bienvenido a Codrr"
        element={
          <Button fullWidth variant="contained">
            Hola mundo
          </Button>
        }
      />
      {loading ? (
        <Box sx={{ display:"flex", justifyContent:"center", mt:4 }}>
            <CircularProgress/>
        </Box>
      ):(
        <>
            <div>
                {allCharacters?.length !== 0 ? (
                <Grid sx={{ my:2 }} container spacing={2} direction="row">
                    {allCharacters!.map((character) => (
                        <Grid key={character.id} item xs={3}>
                        <CardComponent
                        id={character.id}
                        image={character.image}
                        name={character.name}
                        species={character.species}
                        status={character.status}
                    />
                    </Grid>
                    ))}
                </Grid>
                ) : (
                "No data"
                )}
            </div>
            <Box sx={{ width:"100%", display:"flex",justifyContent:"center" }}>
                <Pagination 
                    count={count} 
                    page={page} 
                    onChange={handleChange}
                    variant="outlined"
                    color="primary"
                    sx={{ mb:3 }}
                    size="large"
                />
            </Box>
        </>

      )}
    </Container>
  );
};
