import { ActionDispatch, ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useMemo, useState } from "react"
import { categoryItems } from "../data/db"
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'
import { ProductsActions, ProductsState } from "../reducers/list-reducer"
import { listItem } from "../types"
import { formatCurrency, Toast } from "../helpers"
import { v4 as uuidv4 } from 'uuid';
type FormProps = {
    setIsModalVisible: Dispatch<SetStateAction<boolean>>
    dispatch: ActionDispatch<[action: ProductsActions]>
    state: ProductsState
}

const initialState: listItem = {
    // para generar un id  
    id: "",
    name: "",
    categorie: 1,
    buy: false,
    amount: 0,
    price: 0
}

export const Form = ({ setIsModalVisible, dispatch, state }: FormProps) => {

    const [list, setList] = useState<listItem>(initialState)

    const estimatedTotal = useMemo(() => list.amount * list.price, [list])



    // este useEffect funciona para llenar los input al momento de actualizar
    useEffect(() => {
        if (state.productId) {
            // filter me retorna un arreglo x eso ponemos la posicion 0
            // con esta linea me traigo la actividad que tenga el mismo id
            const selectedProduct = state.products.filter(item => item.id === state.productId)[0]
            setList(selectedProduct)
        }
    }, [state.productId])


    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        // identificar los datos que llegan como string para convertir los a number antes de setearlos a nuestro state
        // ['category'] es el nombre del campo del state que tengo que revisar si esta como string pa cambiarlo
        // e.target.id es el nombre de los input en general
        const isNumberField = ['categorie', 'price', "amount"].includes(e.target.id)
        setList({
            ...list, //una copia de mi state
            // isNumberField me regresa un true o false
            // con el + nos aseguramos de que un number como string se convierta en number real
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    };


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Si no hay ID, es un nuevo producto, por lo tanto genera un ID
        if (!list.id) {
            list.id = uuidv4();  // Solo genera el ID si es un producto nuevo
        }

        if (state.products.some(item => item.name === list.name && state.productId === "")) {
            console.log("repetido");
            Toast.fire({
                icon: "error",
                title: `${list.name} Duplicado`
            });
            return
        }
        dispatch({ type: 'save-product', payload: { newProducts: list } })
        // Ventana emergente que avisa que se agrego lo puse como un helper
        if (state.productId === "") {
            Toast.fire({
                icon: "success",
                title: "Producto Agregado"
            });
        } else {
            Toast.fire({
                icon: "success",
                title: "Producto Actualizado"
            });
        }

        setIsModalVisible(false)

    }


    return (
        // <form action="" className="w-2/3 grid grid-cols-2 justify-items-center p-5  bg-red-500">
        <form action="" onSubmit={handleSubmit} >
            <div className="justify-items-center  mx-auto">
                <div className="p-2 space-x-3">
                    <label htmlFor="categorie">Categoria</label>
                    <select id="categorie" className="border border-lime-500 rounded-lg mt-2 p-1 w-full"
                        value={list.categorie}
                        onChange={handleChange}
                    >
                        {categoryItems.map((item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        )))}
                    </select>

                </div>
                <div className=" p-2 space-x-3">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name"
                        placeholder="Nombre del producto"
                        required
                        className="border border-lime-500 rounded-lg mt-2 p-1 w-full"
                        value={list.name}
                        onChange={handleChange}
                    />
                </div>
                <div className=" p-2 m space-x-3">
                    <label htmlFor="amount" >Cantidad</label>
                    <input type="number"
                        placeholder="Cantidad a Comprar"
                        required
                        id="amount"
                        min={1}
                        className=" border border-lime-500 rounded-lg mt-2 p-1 w-full"
                        value={list.amount}
                        onChange={handleChange}
                    />
                </div>
                <div className=" p-2 space-x-3">
                    <label htmlFor="price">Precio</label>
                    <input type="number"
                        placeholder="Precio Unitario"
                        required
                        id="price"
                        min={1}
                        className=" border border-lime-500 rounded-lg p-1 mt-2 w-full"
                        value={list.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col my-3">
                    <label>Total Estimado: {""}
                        <span className="text-blue-500">
                            {formatCurrency(estimatedTotal)}
                        </span>
                    </label>
                </div>

                <div className="md:col-span-2">
                    <button
                        className="flex flex-row-reverse gap-2 items-center cursor-pointer rounded-lg bg-green-500 hover:bg-green-700 p-1 text-white"
                        title="Guardar en la lista"
                    >
                        <ArrowUpCircleIcon className="h-5 w-5" />
                        <p className="ml-2">Guardar</p>
                    </button>



                </div>
            </div>

        </form>

    )
}
