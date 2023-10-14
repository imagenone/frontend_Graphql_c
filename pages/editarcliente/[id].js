import React from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useQuery, gql, useMutation } from "@apollo/client";
import * as Yup from "yup";
import { Formik } from "formik";
import Swal from "sweetalert2";


const OBTENER_CLIENTE = gql`
  query obtenerCliente($id:ID!) {
    obtenerCliente(id:$id) {
      nombre
      apellido
      empresa
      email
      telefono
      
    }
  }
`;

//Actualizar el cliente

const ACTUALIZAR_CLIENTE = gql`

mutation actualizarCliente($id: ID!, $input:  ClienteInput ){
  actualizarCliente(id: $id, input: $input){
    nombre
    email
   
  } 
}


`;   



const EditarCliente = () => {
  //obetener el id actual
  const router = useRouter();
  const { query: { id } } = router;
    console.log("id: ", id);

  //consultar para obtener cliente
  const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
    variables: {
      id
    },
  });
// ACTUALIZAR EL CLIENTE 
const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE);


//schema de validation
  const  schemaValidacion =  Yup.object({
  nombre: Yup.string()
             .required("El Nombre del Cliente es obligatorio"),
  apellido: Yup.string()
               .required("El Apellido del Cliente es obligatorio"),
  empresa: Yup.string()
              .required("El Campo Empresa  es obligatorio"),
  email: Yup.string()
            .email("Email no avalido")
            .required("El Email es obligatorio"),
});


  if (loading) return "cargando...";
  // console.log("data:",data.obtenerCliente);

  const {obtenerCliente} = data;

  // Modificar el cliente en la base de datos 
const actualizarInfoCliente = async valores => {
  const { nombre, apellido, email, empresa, telefono } = valores;

  try {
    const {data} = await actualizarCliente({
      variables: {
        id,
        input: {
          nombre,
          apellido,
          email,
          empresa,        
          telefono
        }

      }
    });
     console.log("data:", data);
    
   
    //  Mostrar alerta
    Swal.fire(
      'Actualizado',
      'El Cliente se Actualizo Correctamente..',
      'success'
      
    )
  
    // redireccionar al Usuario
    setTimeout(() => {
     router.push('/')
   
    }, 3000);

   
    
   
  } catch (error) {
    console.log(error)
  }
}

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Editar cliente</h1>
      <div className="font-sans">
        <div className="relative min-h-screen flex flex-col sm:justify-center items-center   ">
          <div className="relative sm:max-w-sm w-full">
            <Formik
            validationSchema={ schemaValidacion }
            enableReinitialize
            initialValues={obtenerCliente}
            onSubmit={ ( valores ) => {
              actualizarInfoCliente(valores)
            }}
            >
              {(props) => {
                {/* console.log(props); */}
                return (

                  <form className=" rounded bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
                  >
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
                         onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.nombre}
                      />
                    </div>
                    {props.touched.nombre && props.errors.nombre ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{props.errors.nombre}</p>
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
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.apellido}
                      />
                    </div>
                    {props.touched.apellido && props.errors.apellido ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{props.errors.apellido}</p>
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
                         onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.empresa}
                      />
                    </div>
                    {props.touched.empresa && props.errors.empresa ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{props.errors.empresa}</p>
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
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.email}
                      />
                    </div>
                    {props.touched.email && props.errors.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{props.errors.email}</p>
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
                       onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.telefono}
                      />
                    </div>

                    <input
                      type="submit"
                      className="bg-gray-800  text-white mt-5 p-2  w-full uppercase font-bold hover:bg-gray-900"
                      value="Editar Cliente"
                    />
                  </form>

                )
              }}
            </Formik>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditarCliente;
