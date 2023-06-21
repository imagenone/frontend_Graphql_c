
import Link from "next/link"
import {useRouter} from 'next/router'



const Sidebar =() => {

  //routing next
  const router = useRouter();
  console.log(router.pathname)
  return (
    <>
    
      <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black" >CRM Clientes</p>
      </div>

      <nav className="mt-5 list-none">
          <li className={router.pathname === "/" ? "bg-blue-800 p-3" : "p-3"}>
            <Link className="text-white mb-2 block" href= "/" rel="stylesheet" >
            
              Clientes
            
                  
            </Link>
          </li>
          <li  className={router.pathname === "/pedidos" ? "bg-blue-800 p-3" : "p-3"}>
            <Link  className="text-white mb-2 block" href= "/pedidos" rel="stylesheet" >
                  Pedidos
            </Link>
          </li>
          <li className={router.pathname === "/productos" ? "bg-blue-800 p-3" : "p-3"}>
            <Link className="text-white mb-2 block" href= "/productos" rel="stylesheet" >
                  Productos
            </Link>
          </li>
      </nav>
        
      </aside>
    
    
     
    </>
  )
}

export default Sidebar
