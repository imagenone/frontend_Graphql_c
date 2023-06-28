import {ApolloClient,createHttpLink, InMemoryCache} from '@apollo/client'
import {setContext} from 'apollo-link-context';



const HttpLink = createHttpLink({
    uri: 'http://localhost:4000/',
    
});

const authLink = setContext((_, {headers}) => {

    // leer storage almacenado
    const token = localStorage.getItem('token');

return {
    headers:{
        ...headers,
        authorization  : token
    }
}
});

const client = new ApolloClient({
    connectToDevTools: true,
cache: new InMemoryCache(),
link: authLink.concat(HttpLink)

});

export default client;