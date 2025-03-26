// import { listItem } from "../types"

// // las acciones son las que describen que es lo que esta sucediendo una ves que queramos modificar el state
// export type ProductsActions =
//     // el type describe que es lo que esta sucediendo
//     // el payload es como los datos que le estoy mandando y que se van agregar al state
//     // newActivity es un objeto que se nombro asi y Activity es el tipo de dato para prevenir error de TS
//     { type: "save-product", payload: { newProducts: listItem } }
// // esta es la accion para actualizar
// // { type: "set-activeId", payload: { id: Activity["id"] } } |
// // { type: "delete-activity", payload: { id: Activity["id"] } }


// export type ProductsState = {
//     // este es el nombre que va a tener el reducer en componets del navegador que estan en el state
//     products: listItem[];
//     //   activeId: listItem["id"]
// }

// export const initialState: ProductsState = {
//     // esta tiene que ser nombrada igual que ActivityState
//     products: [],
//     // activeId: ""
// }


// export const productsReducer = (
//     state: ProductsState = initialState,
//     action: ProductsActions
// ) => {

//     // aca va toda la logica

//     return state
// }