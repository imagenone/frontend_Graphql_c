import Layout from "@/components/Layout";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {gql, useMutation} from '@apollo/client'
import { useRouter } from "next/router";



const  AUTENTICAR_USUARIO = gql`
mutation autenticarUsuario($input: AutenticarInput){
  autenticarUsuario(input: $input) {
    token
  }
}

`

const Login = () => {

  // routing
  const router =  useRouter()
  const [mensaje, guardarMensaje]= useState(null)
  // Mutation parar crear nuevos usuarios en apollo
  const [ autenticarUsuario ]  = useMutation(AUTENTICAR_USUARIO)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
                .email('El Email no es Valido')
                .required('El Email no Puede estar Vacio'),
      password: Yup.string()
                  .required('El Password es Obligatorio')          
    }),
    onSubmit: async valores => {
      const {email, password}= valores
     try {
      const{ data} = await autenticarUsuario({
        variables:{
          input: {
            email,
            password

          }
        }
      });
      console.log(data);
      guardarMensaje('Autenticando...')

      //guardar token en el storage
      const {token} = data.autenticarUsuario;
      localStorage.setItem('token', token);

      //redireccionar hacia el cliente
      setTimeout(() => {
        guardarMensaje(null)
        router.push('/')
      },3000)

       } 
     
     catch (error) {
      guardarMensaje(error.message.replace('GraphQL error:', ''))
      // console.log(error)
      setTimeout(() =>{
        guardarMensaje(null);
      }, 3000)
     }
    }
  })
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
        <h1 className="text-center text-2xl text-white font-light">Login</h1>
        {mensaje && mostraMensaje()}
        <div className=" flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
             className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
             onSubmit={formik.handleSubmit}
             >
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
                  onChange={ formik.handleChange}
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
                  placeholder="Password User"
                  onChange={ formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
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
                value="Iniciar Sesion"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
