import { Toast } from "../helpers";
import { listItem } from "../types"

// las acciones son las que describen que es lo que esta sucediendo una ves que queramos modificar el state
export type ProductsActions =
    // el type describe que es lo que esta sucediendo
    // el payload es como los datos que le estoy mandando y que se van agregar al state
    // newActivity es un objeto que se nombro asi y Activity es el tipo de dato para prevenir error de TS
    { type: "save-product", payload: { newProducts: listItem } } |
    // esta es la accion para actualizar
    { type: "set-productId", payload: { id: listItem["id"] } } |
    { type: "purchased-product", payload: { id: listItem["id"] } } |
    { type: "delete-product", payload: { id: listItem["id"] } }


export type ProductsState = {
    // este es el nombre que va a tener el reducer en componets del navegador que estan en el state
    products: listItem[];
    productId: listItem["id"]
}

// obtenemos datos del localStorage
const localStorageProducts = (): listItem[] => {
    // para obtener las actividades ya guardadas en el localStorage
    const products = localStorage.getItem('products')
    return (
        // si tenemos lo vamos a regresar como un arreglo caso contrario cuando no hay nada en el localstorage se inicia como arreglo vacio
        products ? JSON.parse(products) : []
    )
}

export const initialState: ProductsState = {
    // esta tiene que ser nombrada igual que ProductsState
    // estos son los valores iniciales
    products: localStorageProducts(),
    productId: ""
}

export const productsReducer = (
    state: ProductsState = initialState,
    action: ProductsActions
) => {

    // si action.type es igual a eso ejecuta esa accion
    let updateList: listItem[] = []
    if (action.type === "save-product") {

        // para editar
        if (state.productId) {
            updateList = state.products.map(item => item.id === state.productId ? action.payload.newProducts : item)

        } else {
            //    para guardar nuevo
            updateList = [...state.products, action.payload.newProducts]
        }
        return {
            ...state,
            // para guardar mi nuevo producto en el state
            products: updateList,
            productId: ""
        }
    }
    // para actualizar el producto a comprado
    if (action.type === "purchased-product") {
        // updateList = state.products.filter(item => item.id === action.payload.id ? item.buy = true: item.buy = false)
        updateList = state.products.map(item =>
            // item.id es igual al payload.id me devuelve una copia del item con el buy diferente de lo que esta de no ser igual devuelve todo el item
            item.id === action.payload.id ? { ...item, buy: !item.buy } : item
        );
        return {
            // tengo una copia de lo que no voy actualizar
            ...state,
            products: updateList,
        }
    }

    // para seleccionar el producto por el id
    if (action.type === "set-productId") {
        return {
            // tengo una copia de lo que no voy actualizar
            ...state,
            productId: action.payload.id
        }
    }

    // para eliminar el producto
    if (action.type === "delete-product") {
        Toast.fire({
            icon: "success",
            title: "Producto Eliminado"
        });
        return {
            // tengo una copia de lo que no voy actualizar
            ...state,
            products: state.products.filter(item => item.id !== action.payload.id)
        }
    }


    return state
}