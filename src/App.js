import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import orange from "@material-ui/core/colors/orange";
import blueGrey from "@material-ui/core/colors/blueGrey";
import Layout from "./Pages/Layout/Layout";
import Home from "./Pages/Home/Home";
import Create from "./Pages/Create/Create";
import Detail from "./Pages/Detail/Detail";
import { GlobalProvider } from "./Context/GlobalState";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[800],
    },
    secondary: {
      main: blueGrey[800],
    },
  },
});

const App = () => {
  return (
    <GlobalProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/create" component={Create} />
              <Route path="/detail/:id" component={Detail} />
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </GlobalProvider>
  );
};

export default App;
