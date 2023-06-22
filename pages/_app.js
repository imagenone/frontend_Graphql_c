// import '@/styles/globals.css'

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }



import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo'
const App =({ Component, pageProps }) => {
    return(
    <ApolloProvider client={client} >
       <Component {...pageProps} />
    </ApolloProvider>
      
  )
 
  
}
export default App;