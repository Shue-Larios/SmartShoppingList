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
import { listItem } from "../types";
import { ProductsState } from "../reducers/list-reducer";
import { Toast } from "../helpers";

// la accion para editar
const leadingActions = () => (
  <LeadingActions>
    <SwipeAction onClick={() => console.info('Editando....')}>
      Editar
    </SwipeAction>
  </LeadingActions>
);
// la accion para eliminar
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


type ListProps = {
  state: ProductsState
}

export const List = ({ state }: ListProps) => {

  const productList = state.products

  const productosPorCategoria = categoryItems.filter(f => productList.some(p => p.categorie === f.id)).map(category => ({
    ...category,
    productos: productList.filter(product => product.categorie === category.id),
  }));

  // para saber si el producto ya se compro
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
                          maxSwipe={50}
                          leadingActions={leadingActions()}
                          trailingActions={trailingActions()}>
                          <div className="flex justify-center gap-5 w-full h-8 items-center cursor-pointer bg-blue-200"
                            onDoubleClick={() => purchasedItem(product)}>

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
                          maxSwipe={50}
                          leadingActions={leadingActions()}
                          trailingActions={trailingActions()} >
                          <div className="flex justify-center gap-5 w-full h-8 items-center cursor-pointer bg-gray-200"
                            onDoubleClick={() => purchasedItem(product)}
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



