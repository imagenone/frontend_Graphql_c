

import { gql, useMutation } from '@apollo/client';
import  Router  from 'next/router';
import Swal from 'sweetalert2';

const ELIMINAR_PRODUCTO = gql`

mutation eliminarProducto ($id: ID!){
  eliminarProducto(id: $id)
}

`;

const OBTENER_PRODUCTOS = gql`
query  obtenerProductos{
  obtenerProductos {
    id
    nombre
    precio
    existencia

  }
}


`;


const Producto = ({producto}) => {


         const {nombre, precio, existencia, id} = producto;
//mutation eliminar Producto
const  [ eliminarProducto ] = useMutation(ELIMINAR_PRODUCTO,{
    update(cache) {
        const { obtenerProductos } = cache.readQuery({
            query:  OBTENER_PRODUCTOS
        });
        cache.writeQuery({
            query: OBTENER_PRODUCTOS,
            data: {
                obtenerProductos: obtenerProductos.filter( productoActual => productoActual.id !== id)
            }
        })
    }
})

//eliminar producto
const confirmarEliminarProducto = () => {

    console.log("eliminar producto")
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
                // eliminar producto de la DB
                const {data} = await eliminarProducto({
                    variables: {
                        id
                    }
                });
                // console.log("data:", data)
                Swal.fire(
                    'correcto',
                    data.eliminarProducto,
                    'success'
                )

                
            } catch (error) {
                console.log(error);
            }
         
        }
      })

}
//editar producto
const editarProducto = () => {

    Router.push({
        pathname: '/editarproducto/[id]',
        query:{ id }
    })

}

    return (
        <>
        
            <tr className='text-center' >
                <td>{nombre}</td>
                <td>{precio}</td>
                <td>{existencia}</td>
                <td className="border px-4 py-2 " >
                <button
                type='button'
                className='flex justify-center items-ceter bg-red-800 hover:bg-red-900 py-2 px-4 w-full text-white rounded text-xs font-bold'
                onClick={() =>{ confirmarEliminarProducto() }}
                >
                Borrar
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 ">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                </button>
            </td>
            <td className="border px-4 py-2 " >
                <button
                type='button'
                className='flex justify-center items-ceter bg-blue-400 hover:bg-blue-600 py-2 px-4 w-full text-white rounded text-xs font-bold'
                onClick={() =>{ editarProducto() }}
                >
                Editar
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>


                </button>
            </td>


            </tr>
            

        </>
        
       

        
    );
}

export default Producto;
