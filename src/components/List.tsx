import { CheckIcon, MinusIcon } from "@heroicons/react/24/solid"
import { categoryItems } from "../data/db"
 

const prueba = [
  {
    id: 11,
    nombre: "Manzana",
    categoria: 1,
    buy: false,

  },
  {
    id: 111,
    nombre: "Pera",
    categoria: 1,
    buy: true,

  },
  {
    id: 22,
    nombre: "Repollo",
    categoria: 2,
    buy: true,

  },
  {
    id: 33,
    nombre: "Quesillo",
    categoria: 3,
    buy: true,

  },
  {
    id: 44,
    nombre: "Semitas",
    categoria: 4,
    buy: false,

  },
  {
    id: 55,
    nombre: "Pollo",
    categoria: 5,
    buy: false,

  },
  {
    id: 66,
    nombre: "Coca Cola",
    categoria: 6,
    buy: true,
  },
  {
    id: 77,
    nombre: "Crema",
    categoria: 7,
    buy: true,
  },
  {
    id: 88,
    nombre: "Estufa",
    categoria: 8,
    buy: true,
  }
]

export const List = () => {



  const productosPorCategoria = categoryItems.filter(f => prueba.some(p => p.categoria === f.id)).map(category => ({
    ...category,
    productos: prueba.filter(product => product.categoria === category.id),
  }));

 console.log(productosPorCategoria);
 

  return (
    <>
      <div className={`grid md:grid-cols-${Math.min(Math.max(productosPorCategoria.length, 1),4)} m-5 gap-2`}>
        {/* Mostrar los productos de la categoría Fruta (id: 1) */}
        {productosPorCategoria.map(category => (
          <div key={category.id} className="pb-2  border rounded-lg">
            {category.productos.length > 0 && (
              <div >
                <div className={`${category.color} text-white mb-2 border-b text-center text-2xl uppercase flex items-center justify-center`}>
                  {category.name}
                </div>
                <ul>
                  {category.productos.map(product => product.buy === true
                    ? <li key={product.id} className="mb-2" >
                      <div key={product.id} className="grid grid-cols-2 bg-blue-200"
                      >
                        <CheckIcon className="h-6 w-6 ml-5 text-blue-500 mr-3 " />
                        <p className="">{product.nombre}</p>
                      </div>
                    </li>
                    : <li key={product.id} className="mb-2">
                      <div key={product.id} className="grid grid-cols-2">
                        <MinusIcon className="h-6 w-6 ml-5" />
                        <p>{product.nombre}</p>

                      </div>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </>


    // <>



    //   <div className={`grid  md:grid-cols-${Math.max(Math.min(vistaCat.length, 1), 4)} m-5 gap-2`}>
    //     {vistaCat.map(item => (
    //       <div key={item.id} className="pb-2  border rounded-lg">
    //        
    //         {/* decision si esta comprada o no */}
    //         {prueba.map(p => p.buy === true
    //           ? <div key={p.id} className="grid grid-cols-2">
    //             <CheckIcon className="h-6 w-6 ml-5 text-blue-500 mr-3" />
    //             <p>{p.nombre}</p>
    //           </div>
    //           : <div key={p.id} className="grid grid-cols-2">
    //             <MinusIcon className="h-6 w-6 ml-5" />
    //             <p>{p.nombre} </p>
    //           </div>
    //         )}
    //       </div>
    //     ))}
    //   </div>
    // </>
  )
}



