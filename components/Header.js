import {useQuery ,gql } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react'


const OBTENER_USUARIO = gql`
query obtenerUsuario{
  obtenerUsuario{
     id
     nombre
     apellido

  }
}
`

const Header = () => {
    const router = useRouter();

    // QUERY  DE APOLLO
     const {data, loading, error } = useQuery(OBTENER_USUARIO);
    //  console.log(data);
    //  console.log(loading);
    //  console.log(error);

     // obtener que no accedamos a data antes de tener resultados
     if (loading)  return null;

     //si no hay informacion
     if (!data) {
        return router.push('/login');
        
     }

     const {nombre, apellido} = data.obtenerUsuario
     //cerrar seccion
     const cerrarSesion = ()=>{
        localStorage.removeItem('token');
       router.push('/login');
     }
    return ( 
        <div className='flex justify-between mb-10'>
            <p className='mr-2' >hola: {nombre} {apellido}</p>

            <button
            onClick={() =>cerrarSesion()}
            type='button'
            className='bg-blue-700 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md hover:bg-blue-900 '
            >
                Cerrar Sesion
            </button>
        </div>
     );
}
 
export default Header;