import React, {useState} from "react";
import Layout from "@/components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";


const NUEVO_CLIENTE = gql`
mutation nuevoCliente($input: ClienteInput) {
  nuevoCliente(input: $input) {
    id
    nombre
    apellido
    empresa
    email
    telefono
  }
}
`;


const Nuevocliente = () => {
// router
const router = useRouter();
//mensaje de alerta cliente ya existe 
const [mensaje, guardarMensaje]= useState(null)

// Mutation Para Crear Nuevos Clientes

const [nuevoCliente] = useMutation( NUEVO_CLIENTE)

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      empresa: "",
      telefono: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El Nombre del Cliente es obligatorio"),
      apellido: Yup.string().required("El Apellido del Cliente es obligatorio"),
      empresa: Yup.string().required("El Campo Empresa  es obligatorio"),
      email: Yup.string()
        .email("Email no avalido")
        .required("El Email es obligatorio"),
    }),
    onSubmit: async valores => {

        const {nombre, apellido, empresa, email, telefono} = valores
      try {
        const { data } = await nuevoCliente({
            variables: {
                input:{
                    nombre,
                    apellido,
                    empresa,
                    email,
                    telefono,
                }
            }
        });
        console.log("data.nuevoCliente:",data.nuevoCliente)
        router.push('/') // redirect nuevo cliente
      } catch (error) {
        guardarMensaje(error.message);
      }
    },
  });

  const mostraMensaje = () => {
    return (
      <div className="bg-white py2 px-3 w-full my-3 max-w-sm text-center mx-auto" >
        <p>{mensaje}</p>
      </div>
    )
    };

  return (
    <Layout>
     
     {mensaje && mostraMensaje()}
      <div className="font-sans">
        <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
          <div className="relative sm:max-w-sm w-full">
            <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
            <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
            <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
              <h1 className="text-2xl text-gray-800 font-light">
                Nuevo cliente
              </h1>
              <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}>
                <div>
                  <label
                    className="block mt-3 text-sm text-gray-700 text-center font-semibold"
                    htmlFor="nombre"
                  >
                    Nombre
                  </label>
                  <input
                    className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    id="nombre"
                    type="text"
                    placeholder="Nombre Del Cliente"
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

                <div>
                  <label
                    className="block mt-3 text-sm text-gray-700 text-center font-semibold"
                    htmlFor="apellido"
                  >
                    Apellidos
                  </label>
                  <input
                    className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    id="apellido"
                    type="text"
                    placeholder="Apellido Del Cliente"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.apellido}
                  />
                </div>
                {formik.touched.apellido && formik.errors.apellido ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.apellido}</p>
                  </div>
                ) : null}
                <div>
                  <label
                    className="block mt-3 text-sm text-gray-700 text-center font-semibold"
                    htmlFor="empresa"
                  >
                    Empresa
                  </label>
                  <input
                    className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    id="empresa"
                    type="text"
                    placeholder="Empresa Cliente"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.empresa}
                  />
                </div>
                {formik.touched.empresa && formik.errors.empresa ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.empresa}</p>
                  </div>
                ) : null}

                <div className="mt-7">
                  <label
                    className="block mt-3 text-sm text-gray-700 text-center font-semibold"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    id="email"
                    type="email"
                    placeholder="Correo electronico"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}

                <div className="mt-7">
                  <label
                    className="block mt-3 text-sm text-gray-700 text-center font-semibold"
                    htmlFor="telefono"
                  >
                    Telefono
                  </label>
                  <input
                    className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                    id="telefono"
                    type="tel"
                    placeholder="Telefono cliente"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.telefono}
                  />
                </div>
             

                <input
                  type="submit"
                  className="bg-gray-800  text-white mt-5 p-2  w-full uppercase font-bold hover:bg-gray-900"
                  value="Registrar Cliente"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Nuevocliente;
