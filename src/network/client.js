import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6IktyaXNobmEgVGhha29yIiwiaXNfY2FuZGlkYXRlIjp0cnVlLCJpYXQiOjE2NzkwMDAyMjAsImV4cCI6MTY3OTUxODYyMH0.elXKEXbdTLzB-N83VOJMnxkrXFebJF7tayBCiwMwU6o`;

const httpLink = createHttpLink({
  uri: 'https://api.poc.graphql.dev.vnplatform.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `${token}`,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
