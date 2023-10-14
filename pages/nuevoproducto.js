import Layout from "@/components/Layout";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";


const NUEVO_PRODUCTO = gql`
     mutation  nuevoProducto($input: ProductoInput){
        nuevoProducto(input: $input) {
            id
            nombre
            existencia
            precio

           }
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

// formulario Para Nuevo producto

const NuevoProducto = () => {
// routing 
const router = useRouter()

  //Mutation 
  const [ nuevoProducto ] = useMutation(NUEVO_PRODUCTO, {
   update(cache, {data: { nuevoProducto}}) {
    //obtener el objeto de cache
    const {obtenerProductos} = cache.readQuery({query: OBTENER_PRODUCTOS});

    // reescribir ese objeto
    cache.writeQuery({
      query: OBTENER_PRODUCTOS,
      data: {
        obtenerProductos: [...obtenerProductos, nuevoProducto]
      }
    })
   }
  } );

  const formik = useFormik({
    initialValues: {
        nombre:'',
        existencia:'',
        precio:''
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
                 .required('El nombre del Producto es Obligatorio'),
      existencia: Yup.number()    
                     .required('Agregar la cantidad disponible') 
                     .positive('No se aceptan numeros Negativos')       
                     .integer('La existencia deben ser numeros enteros'),
      precio: Yup.number()
                 .required('E precio es obligatorio')
                 .positive('No se aceptan numeros negativos')
  }),
  onSubmit: async valores => {
    const { nombre, existencia, precio } = valores  

    try {
      const {data} = await nuevoProducto({
          variables: {
           input: {
            nombre,
            existencia,
            precio
           } 
          }

      });
      console.log("data:", data)

      // Mostras alerta
      Swal.fire(
        'Creado',
       ' se creo el producto satisfactoriamente',
       'success'
      )
      // redireccionar la ruta
      router.push('/productos');
    } catch (error) {
      console.log(error);
    }
console.log("submit activated")
  }
  })
  
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light "> Nuevo Producto</h1>

      <div className="flex justify-center mt-5"></div>
      <div className="w-full max-w-lg">
      
        <form
          className="bg-white  shadow-md px-8 pt-6 pb-8 mb-4"
          onSubmit={formik.handleSubmit}
        >
          <div className=" mb-4">
            <label
              className="block mt-3 text-sm text-gray-700 text-center font-semibold text-[12px]"
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              id="nombre"
              type="text"
              placeholder="Nombre Del Producto"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombre}
            />
          </div>
          {formik.touched.nombre && formik.errors.nombre ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.nombre}</p>
                </div>
              ) : null}
          <div className=" mb-4">
            <label
              className="block mt-3 text-sm text-gray-700 text-center font-semibold text-[12px]"
              htmlFor="existencia"
            >
              producto disponible
            </label>
            <input
              className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              id="existencia"
              type="number"
              placeholder="Cantidad disponible"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.existencia}
            />
          </div>
          {formik.touched.existencia && formik.errors.existencia ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.existencia}</p>
                </div>
              ) : null}
        
          <div className=" mb-4">
            <label
              className="block mt-3 text-sm text-gray-700 text-center font-semibold text-[12px]"
              htmlFor="precio"
            >
              Precio
            </label>
            <input
              className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              id="precio"
              type="number"
              placeholder="Nombre Del Producto"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.precio}
            />
          </div>
          {formik.touched.precio && formik.errors.precio ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.precio}</p>
                </div>
              ) : null}
          <input
                  type="submit"
                  className="bg-gray-800  text-white mt-5 p-2  w-full uppercase font-bold hover:bg-gray-900"
                  value="Registrar Producto"
                />
        </form>
      </div>
    </Layout>
  );
};

export default NuevoProducto;
