import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';

const createApolloClient = () => {
    const httpLink = new HttpLink({
        uri: `/graphql`,
        credentials: 'include'
    });

    return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
    });
};

export const graphqlClient = createApolloClient();
