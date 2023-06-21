import Layout from "@/components/Layout";
import React from "react";

//Nuevacuenta

const Nuevacuenta = () => {
  return (
    <>
      <Layout>
        <h1 className="text-center text-2xl text-white font-light">
          Crear Nueva Cuenta
        </h1>
        <div className=" flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
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
                />
              </div>
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
                />
              </div>

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
                />
              </div>
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
                />
              </div>
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
