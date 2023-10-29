import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import {
  AppBar,
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Box,
  Typography,
  createTheme,
  ThemeProvider,
  CircularProgress,
} from "@mui/material";
import Header from "./Components/Header";

const theme = createTheme({
  typography: {
    fontFamily: "Titan One, sans-serif",
  },
});

interface Agent {
  id: string;
  uuid: string;
  displayName: string;
  description: string;
  bustPortrait: string;
  isPlayableCharacter: boolean;
  abilities: string;
  role: {
    displayName: string;
  };
}

const App: React.FC = () => {
  const { data, isLoading } = useQuery(
    "agentes",
    () => {
      return axios
        .get("https://valorant-api.com/v1/agents")
        .then((res) =>
          res.data.data.filter(
            (agent: Agent) => agent.isPlayableCharacter === true
          )
        );
    },
    {
      retry: 5,
      refetchOnWindowFocus: true,
    }
  );

  // if (isLoading) {
  //   return <div>Carregando...</div>;
  // }

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      <Header />
      <AppBar position="relative" sx={{ bgcolor: "#672e37" }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Album
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          "Valorant Agent Cards: Informações sobre os principais agentes em
          cards de fácil acesso.
        </Typography>
      </AppBar>
      <main style={{ background: "#672e37" }}>
        <Container sx={{ py: 8, background: "#672e37" }} maxWidth="lg">
          <Grid container spacing={4}>
            {isLoading ? (
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <CircularProgress />
              </Grid>
            ) : data ? (
              data.map((agent: Agent) => (
                <Grid item key={agent.uuid} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      background: "#ce9e9c",
                      borderRadius: "1rem",
                      textAlign: "center",
                      boxShadow: "10px 10px 2px rgba(0, 0, 0, 0.2)",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        pt: "100%",
                      }}
                      image={agent.bustPortrait}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {agent.displayName}
                      </Typography>
                      <Typography>{agent.role.displayName}</Typography>
                      <Typography color={"#3c3a4c"}>
                        {agent.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : isLoading ? (
              "carregando..."
            ) : (
              "Nenhum dado disponível"
            )}
          </Grid>
        </Container>
      </main>
      <Box sx={{ bgcolor: "#f94555", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom></Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          &copy; 2023. Todos os direitos reservados.
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default App;
