const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require("graphql");
const moment = require("moment");

const TeamType = new GraphQLObjectType({
  name: "Team",
  fields: () => ({
    id: { type: GraphQLInt },
    city: { type: GraphQLString },
    conference: { type: GraphQLString },
    division: { type: GraphQLString },
    full_name: { type: GraphQLString },
    name: { type: GraphQLString }
  })
});

const GameType = new GraphQLObjectType({
  name: "Game",
  fields: () => ({
    id: { type: GraphQLInt },
    date: { type: GraphQLString },
    home_team_score: { type: GraphQLInt },
    visitor_team_score: { type: GraphQLInt },
    home_team: { type: TeamType },
    visitor_team: { type: TeamType },
    status: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    teams: {
      type: new GraphQLList(TeamType),
      async resolve(parents, args) {
        try {
          const response = await axios.get(
            "https://www.balldontlie.io/api/v1/teams"
          );
          const data = await response;
          return data.data.data;
        } catch (error) {
          console.error(error);
        }
      }
    },
    team: {
      type: TeamType,
      args: {
        id: { type: GraphQLInt }
      },
      async resolve(parents, args) {
        try {
          const response = await axios.get(
            `https://www.balldontlie.io/api/v1/teams/${args.id}`
          );
          const data = await response;
          return data.data;
        } catch (error) {
          console.error(error);
        }
      }
    },
    allGames: {
      type: new GraphQLList(GameType),
      args: { date: { type: GraphQLString } },
      async resolve(parent, args) {
        try {
          const response = await axios.get(
            `https://www.balldontlie.io/api/v1/games/?start_date=${args.date}&end_date=${args.date}`
          );
          const data = await response;
          return data.data.data;
        } catch (error) {
          console.error(error);
        }
      }
    },
    teamGames: {
      type: new GraphQLList(GameType),
      args: {
        id: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        try {
          const response = await axios.get(
            `https://www.balldontlie.io/api/v1/games?teams_ids[]=${
              args.id
            }&start_date=${moment()
              .subtract(7, "days")
              .format("YYYY-MM-DD")}&end_date=${moment()
              .add(7, "days")
              .format("YYYY-MM-DD")}`
          );
          const data = await response;
          return data.data.data;
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
