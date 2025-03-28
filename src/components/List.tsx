import { CheckIcon, MinusIcon } from "@heroicons/react/24/solid"
import { categoryItems } from "../data/db"

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import Swal from "sweetalert2";
import { listItem } from "../types";



const leadingActions = () => (
  <LeadingActions>
    <SwipeAction onClick={() => console.info('Editando....')}>
      Editar
    </SwipeAction>
  </LeadingActions>
);

const trailingActions = () => (
  <TrailingActions>
    <SwipeAction
      // destructive={true}
      onClick={() => console.info('Eliminando')}
    >
      Eliminar
    </SwipeAction>
  </TrailingActions>
);

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

const prueba: listItem[] = [
  {
    id: 11,
    name: "Manzana",
    categorie: 1,
    buy: false,

  },
  {
    id: 111,
    name: "Pera",
    categorie: 1,
    buy: true,

  },
  {
    id: 22,
    name: "Repollo",
    categorie: 2,
    buy: true,

  },
  {
    id: 33,
    name: "Quesillo",
    categorie: 3,
    buy: true,

  },
  {
    id: 44,
    name: "Semitas",
    categorie: 4,
    buy: false,

  },
  {
    id: 55,
    name: "Pollo",
    categorie: 5,
    buy: false,

  },
  {
    id: 66,
    name: "Coca Cola",
    categorie: 6,
    buy: true,
  },
  {
    id: 77,
    name: "Crema",
    categorie: 7,
    buy: true,
  }
]

export const List = () => {

  const productosPorCategoria = categoryItems.filter(f => prueba.some(p => p.categorie === f.id)).map(category => ({
    ...category,
    productos: prueba.filter(product => product.categorie === category.id),
  }));

  const purchasedItem = (e: listItem) => {
    if (e.buy === false) {
      Toast.fire({
        icon: "success",
        title: "Producto Comprado"
      });
    } else {
      Toast.fire({
        icon: "error",
        title: "Compra Cancelada"
      });
    }
  }



  return (
    <>
      <div className="grid m-5 gap-2 md:grid-cols-4">
        {productosPorCategoria.map(category => (
          <div key={category.id} className="pb-2    border rounded-lg">
            {category.productos.length > 0 && (
              <>
                <div className={`${category.color} text-white mb-2 border-b text-center text-2xl uppercase flex items-center justify-center`}>
                  {category.name}
                </div>
                <ul className="space-y-2">
                  {category.productos.map(product => product.buy === true
                    ?
                    <li key={product.id}>
                      <SwipeableList>
                        <SwipeableListItem
                          leadingActions={leadingActions()}
                          trailingActions={trailingActions()}>
                          <div className="flex justify-center gap-5 w-full h-8 items-center cursor-pointer bg-blue-200"
                            onClick={() => purchasedItem(product)}>

                            <CheckIcon className="h-6 w-6 ml-5 text-blue-500 mr-3" />
                            <p className="">{product.name}</p>
                          </div>
                        </SwipeableListItem>
                      </SwipeableList>
                    </li>
                    :
                    <li key={product.id}>
                      <SwipeableList >
                        <SwipeableListItem
                          leadingActions={leadingActions()}
                          trailingActions={trailingActions()} >
                          <div className="flex justify-center gap-5 w-full h-8 items-center cursor-pointer bg-gray-200"
                            onClick={() => purchasedItem(product)}
                          >
                            <MinusIcon className="h-6 w-6 ml-5" />
                            <p>{product.name}</p>
                          </div>
                        </SwipeableListItem>
                      </SwipeableList>
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



