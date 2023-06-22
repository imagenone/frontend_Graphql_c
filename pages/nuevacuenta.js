import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";

const NUEVA_CUENTA = gql`
  mutation nuevoUsuario($input: UsuarioInput) {
    nuevoUsuario(input: $input) {
      id
      nombre
      apellido
      email
    }
  }
`;
//Nuevacuenta
const Nuevacuenta = () => {
//state para el mensaje
const [mensaje, guardarMensaje] = useState(null)


  //mutacion para crear nuevos usuarios
  const [nuevoUsuario] = useMutation(NUEVA_CUENTA);
  //Routing
  const router = useRouter()

//validacion del form
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
                 .required("el Nombre es Obligatorio"),
      apellido: Yup.string()
                   .required("El Apellido es Obligatorio"),
      email: Yup.string()
                .email("El Email no es Valido")
                .required("El Email es Obligatorio"),
      password: Yup.string()
                   .required("El password no puede estar vacio")
                   .min(6, " El password debe ser de al menos 6 caracteres"),
    }),
    onSubmit: async (valores) => {
      // console.log("enviando");
      // console.log(valores);
      const {nombre, apellido, email, password} = valores;

      try {
    const {data} = await  nuevoUsuario({
          variables :{
            input :{
                nombre,
                apellido,
                email,
                password
                  }
          }
      });
      console.log(data);

      //usuario creado correctamente
      guardarMensaje(`se creo correctamente el Usuario: ${data.nuevoUsuario.nombre}`)
      setTimeout (() =>{
        guardarMensaje(null)
        router.push('/login')
      }, 2000);
      //redirect al user para inicar seccion
      } catch (error) {
        guardarMensaje(error.message.replace('graphQl error:', ''))
        setTimeout (() =>{
          guardarMensaje(null)
        }, 3000);
      
      }
    },
  });

  // if (loading) return;  ("cargando....");

const mostraMensaje = () => {
return (
  <div className="bg-white py2 px-3 w-full my-3 max-w-sm text-center mx-auto" >
    <p>{mensaje}</p>
  </div>
)
};
  return (
    <>
      <Layout>
      {mensaje && mostraMensaje()}
        <h1 className="text-center text-2xl text-white font-light">
          Crear Nueva Cuenta
        </h1>
        <div className=" flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm  font-bold mb-2"
                  htmlFor="nombre"
                >
                  Nombre
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-cyan-500/90"
                  id="nombre"
                  type="nombre"
                  placeholder="Nombre Usuario"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.nombre && formik.errors.nombre ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.nombre}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm  font-bold mb-2"
                  htmlFor="apellido"
                >
                  Apellido
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-cyan-500/90"
                  id="apellido"
                  type="apellido"
                  placeholder="Apellido Usuario"
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.apellido && formik.errors.apellido ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.apellido}</p>
                </div>
              ) : null}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm  font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-cyan-500/90"
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm  font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-cyan-500/90"
                  id="password"
                  type="password"
                  placeholder="password User"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}
              <input
                type="submit"
                className="bg-gray-700 w-full mt-5 p-2 uppercase text-white hover:bg-gray-900 rounded"
                value="Create  new Count"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Nuevacuenta;
