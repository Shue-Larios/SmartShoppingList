import { listItem } from "../types"

// las acciones son las que describen que es lo que esta sucediendo una ves que queramos modificar el state
export type ProductsActions =
    // el type describe que es lo que esta sucediendo
    // el payload es como los datos que le estoy mandando y que se van agregar al state
    // newActivity es un objeto que se nombro asi y Activity es el tipo de dato para prevenir error de TS
    { type: "save-product", payload: { newProducts: listItem } }
// esta es la accion para actualizar
// { type: "set-activeId", payload: { id: Activity["id"] } } |
// { type: "delete-activity", payload: { id: Activity["id"] } }


export type ProductsState = {
    // este es el nombre que va a tener el reducer en componets del navegador que estan en el state
    products: listItem[];
    //   activeId: listItem["id"]
}

export const initialState: ProductsState = {
    // esta tiene que ser nombrada igual que ProductsState
    products: [],
    // activeId: ""
}

export const productsReducer = (
    state: ProductsState = initialState,
    action: ProductsActions
) => {
    let updateList: listItem[] = []
    if (action.type === "save-product") {     
        updateList = [...state.products, action.payload.newProducts]
          return {
        ...state,
        // para guardar mi nuevo producto en el state
        products: updateList
    }
    }
  

    // // aca va toda la logica
    // // si action.type es igual a eso ejecuta esa accion
    // if (action.type === "save-product") {
    //     // este codigo maneja la logica para actualizar el state es seguro escribir codigo aqui
    //     // let updateActivities: Activity[] = []
    //     if (state.products) {
    //         // cuando estamos editando
    //         // para iterar sobre las actividades para saber cual es el que tiene el id que le pasamos
    //         // si es cierto retorno el action.payload de newActivity sino regreso activity completo
    //         updateActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
    //     } else {
    //         // cuando estamos guardando
    //         updateActivities = [...state.activities, action.payload.newActivity]
    //     }
    //     // este return tiene que ir siempre retorna el estado siempre hay que tener solo un retunr por accion
    //     return {
    //         // siempre se hace una copia del state para guardar todos los datos
    //         ...state, //esta linea va a estar usualmente
    //         // esta tiene que ser nombrada igual que la de initialState si se nombra distinto crea dos propiedades diferentes
    //         // saca una copia de las actividades que ta estan y agrega los ultimos datos ingresados por el usuario 
    //         activities: updateActivities,
    //         // aca que haya una nueva actividad voy a reiniciar  para evitar problemas al editar y crear nuevo
    //         activeId: ""
    //     }
    // }
    return state
}