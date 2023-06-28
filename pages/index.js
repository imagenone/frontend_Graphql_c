import Layout from "@/components/Layout";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";



const OBTENER_CLIENTE_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor{
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const Index = () => {
// router
const router = useRouter();

//Consulta de Apollo
const {data, loading, error} = useQuery(OBTENER_CLIENTE_USUARIO);
console.log(data)
console.log(loading)
console.log(error)
if (loading) return "Charging...";
if (!data.obtenerClientesVendedor) {
  return router.push('/login')
  
}
  return (
    <>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>

        <Link href='/nuevocliente' >
        Nuevo Cliente
          
        </Link>



        <table className="table-auto shadown-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
        <tr className="text-white">
          <th className="w-1/5 py-2">Nombre</th>
          <th className="w-1/5 py-2">Empresa</th>
          <th className="w-1/5 py-2">Email</th>
       
        </tr>
        </thead>

        <tbody className="bg-white">
        {data.obtenerClientesVendedor.map(cliente =>(
          <tr key={cliente.id} >
            <td className="border px-4 py-2 " >{cliente.nombre} {cliente.apellido}</td>
            <td className="border px-4 py-2 " >{cliente.empresa} </td>
            <td className="border px-4 py-2 " >{cliente.email}</td>

          </tr>
        ) )}

        </tbody>

        </table>
      </Layout>
    </>
  );
};

export default Index;
