import Cliente from "@/components/Cliente";
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

        <Link href='/nuevocliente' className="bg-blue-700 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold " >
        Nuevo Cliente
          
        </Link>



        <table className="table-auto shadown-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
        <tr className="text-white">
          <th className="w-1/5 py-2">Nombre</th>
          <th className="w-1/5 py-2">Empresa</th>
          <th className="w-1/5 py-2">Email</th>
          <th className="w-1/5 py-2">Eliminar</th>

       
        </tr>
        </thead>

        <tbody className="bg-white">
        {data.obtenerClientesVendedor.map(cliente =>(
        <Cliente
        key={cliente.id}
        cliente={cliente}
         />
        ) )}

        </tbody>

        </table>
      </Layout>
    </>
  );
};

export default Index;
