
import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
import  Router  from 'next/router';

const ELIMINAR_CLIENTE = gql`
mutation eliminarCliente($id:ID!){
  eliminarCliente(id:$id)

  
}
`;


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



const Cliente = ({cliente}) => {

    // MUTATION FOR DELETE
const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE,{
    update(cache){
        // obtener una copia del objeto de cache
        const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTE_USUARIO});

        //rescribir el cache
        cache.writeQuery({
            query: OBTENER_CLIENTE_USUARIO,
            data:{
                obtenerClientesVendedor: obtenerClientesVendedor.filter(clienteactual => clienteactual.id !== id)

            }
        })



    }
});



    const {nombre, apellido, empresa, email, id } = cliente;

    //Eliminar Cliente
    const confirmarEliminarCliente = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then( async (result) => {
            if (result.value) {
                try {
                     //delete Cliente por ID
                    const {data} = await eliminarCliente({
                            variables: {
                                id
                            }
                    });
                    // console.log("resp data:", data)
                    // Show Alert
                    Swal.fire(
                        'Deleted!',
                        data.eliminarCliente,
                        'success'
                      )
                } catch (error) {
                    console.log(error);
                }

             
            }
          })

    }
// actualizar cliente en frontend
    const editarCliente =  () => {
Router.push({
pathname: '/editarcliente/[id]',
query:{ id }

})

    } 
    return (
       
            
            <tr >
            <td className="border px-4 py-2 " >{nombre}</td>
            <td className="border px-4 py-2 " >{apellido}</td>
            <td className="border px-4 py-2 " >{empresa} </td>
            <td className="border px-4 py-2 " >{email}</td>
            <td className="border px-4 py-2 " >
                <button
                type='button'
                className='flex justify-center items-ceter bg-red-800 hover:bg-red-900 py-2 px-4 w-full text-white rounded text-xs font-bold'
                onClick={() =>{ confirmarEliminarCliente() }}
                >
                Eliminar
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 ">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                </button>
            </td>

            <td className="border px-4 py-2 " >
                <button
                type='button'
                className='flex justify-center items-ceter bg-blue-400 hover:bg-blue-600 py-2 px-4 w-full text-white rounded text-xs font-bold'
                onClick={() =>{ editarCliente() }}
                >
                Editar
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>


                </button>
            </td>


          </tr>
      
    );
}

export default Cliente;


