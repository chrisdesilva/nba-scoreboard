import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./nba.png";
import Games from "./components/Games";
import Team from "./components/Team";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex flex-col justify-center items center h-full">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="NBA logo" />
          </div>
          <Route exact path="/" component={Games} />
          <Route exact path="/teams/:id" component={Team} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
