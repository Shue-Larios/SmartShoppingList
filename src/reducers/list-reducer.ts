import { listItem } from "../types"

// las acciones son las que describen que es lo que esta sucediendo una ves que queramos modificar el state
export type ProductsActions =
    // el type describe que es lo que esta sucediendo
    // el payload es como los datos que le estoy mandando y que se van agregar al state
    // newActivity es un objeto que se nombro asi y Activity es el tipo de dato para prevenir error de TS
    { type: "save-product", payload: { newProducts: listItem } } |
    // esta es la accion para actualizar
    { type: "set-productId", payload: { id: listItem["id"] } }
// { type: "delete-activity", payload: { id: Activity["id"] } }


export type ProductsState = {
    // este es el nombre que va a tener el reducer en componets del navegador que estan en el state
    products: listItem[];
    productId: listItem["id"]
}

export const initialState: ProductsState = {
    // esta tiene que ser nombrada igual que ProductsState
    products: [],
    productId: ""
}

export const productsReducer = (
    state: ProductsState = initialState,
    action: ProductsActions
) => {

    // si action.type es igual a eso ejecuta esa accion
    if (action.type === "save-product") {
        let updateList: listItem[] = []

        // para editar
        if (state.productId) {
            updateList = state.products.map(item => item.id === state.productId ? action.payload.newProducts : item)
            console.log(updateList, "update");
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

    // para editar los elementos
    if (action.type === "set-productId") {
        return {
            // tengo una copia de lo que no voy actualizar
            ...state,
            productId: action.payload.id
        }
    }


    return state
}