import { CheckIcon, MinusIcon } from "@heroicons/react/24/solid"
import { categoryItems } from "../data/db" 


const prueba = [
  {
    id: 11,
    name: "Manzana",
    categoria: 1,
    buy: false,

  },
  {
    id: 111,
    name: "Pera",
    categoria: 1,
    buy: true,

  },
  {
    id: 22,
    name: "Repollo",
    categoria: 2,
    buy: true,

  },
  {
    id: 33,
    name: "Quesillo",
    categoria: 3,
    buy: true,

  },
  // {
  //   id: 44,
  //   name: "Semitas",
  //   categoria: 4,
  //   buy: false,

  // },
  // {
  //   id: 55,
  //   name: "Pollo",
  //   categoria: 5,
  //   buy: false,

  // },
  // {
  //   id: 66,
  //   name: "Coca Cola",
  //   categoria: 6,
  //   buy: true,
  // },
  // {
  //   id: 77,
  //   name: "Crema",
  //   categoria: 7,
  //   buy: true,
  // } 
]

export const List = () => {



  const productosPorCategoria = categoryItems.filter(f => prueba.some(p => p.categoria === f.id)).map(category => ({
    ...category,
    productos: prueba.filter(product => product.categoria === category.id),
  }));


  return (
    <>
      <div className="grid m-5 gap-2 md:grid-cols-4">

        {/* Mostrar los productos de la categoría Fruta (id: 1) */}
        {productosPorCategoria.map(category => (
          <div key={category.id} className="pb-2    border rounded-lg">
            {category.productos.length > 0 && (
              <>
                <div className={`${category.color} text-white mb-2 border-b text-center text-2xl uppercase flex items-center justify-center`}>
                  {category.name}
                </div>
                <ul>
                  {category.productos.map(product => product.buy === true
                    ? <li key={product.id} className="mb-2" >
                      <div key={product.id} className="grid grid-cols-2 bg-blue-200"
                      >
                        <CheckIcon className="h-6 w-6 ml-5 text-blue-500 mr-3 " />
                        <p className="">{product.name}</p>
                      </div>
                    </li>
                    : <li key={product.id} className="mb-2">
                      <div key={product.id} className="grid grid-cols-2">
                        <MinusIcon className="h-6 w-6 ml-5" />
                        <p>{product.name}</p>

                      </div>
                    </li>
                  )}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>


    </>
  )
}



