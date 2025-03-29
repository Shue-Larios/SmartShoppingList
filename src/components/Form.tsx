import { ActionDispatch, ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react"
import { categoryItems } from "../data/db"
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'
import { ProductsActions } from "../reducers/list-reducer"
import { listItem } from "../types"
import { Toast } from "../helpers"

type FormProps = {
    setIsModalVisible: Dispatch<SetStateAction<boolean>>
    dispatch: ActionDispatch<[action: ProductsActions]>
}

const initialState: listItem = {
    // para generar un id  
    id: crypto.randomUUID(),
    name: "",
    categorie: 1,
    buy: false,
    amount: 0,
    price: 0
}



export const Form = ({ setIsModalVisible, dispatch }: FormProps) => {

    const [list, setList] = useState<listItem>(initialState)



    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        // identificar los datos que llegan como string para convertir los a number antes de setearlos a nuestro state
        // ['category'] es el nombre del campo del state que tengo que revisar si esta como string pa cambiarlo
        // e.target.id es el nombre de los input en general
        const isNumberField = ['categorie','price' ].includes(e.target.id)
        setList({
            ...list, //una copia de mi state
            // isNumberField me regresa un true o false
            // con el + nos aseguramos de que un number como string se convierta en number real
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    };


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'save-product', payload: { newProducts: list } })
        // Ventana emergente que avisa que se agrego lo puse como un helper
        Toast.fire({
            icon: "success",
            title: "Producto Agregado"
        });


        setIsModalVisible(false)
    }


    return (
        // <form action="" className="w-2/3 grid grid-cols-2 justify-items-center p-5  bg-red-500">
        <form action="" onSubmit={handleSubmit} >
            <div className="justify-items-center  mx-auto">
                <div className="p-2 space-x-3">
                    <label htmlFor="categorie">Categoria</label>
                    <select id="categorie" className="border border-lime-500 rounded-lg mt-2 p-1 w-full"
                        //  value={list.id}
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
                        className=" border border-lime-500 rounded-lg mt-2 p-1 w-full"
                        // value={list.name}
                        onChange={handleChange}
                    />
                </div>
                <div className=" p-2 m space-x-3">
                    <label htmlFor="amount" >Cantidad</label>
                    <input type="number"
                        placeholder="Cantidad a Comprar"
                        required
                        id="amount"
                        min={0}
                        className=" border border-lime-500 rounded-lg mt-2 p-1 w-full"
                        // value={list.amount}
                        onChange={handleChange}
                    />
                </div>
                <div className=" p-2 space-x-3">
                    <label htmlFor="price">Precio</label>
                    <input type="number"
                        placeholder="Precio Unitario"
                        required
                        id="price"
                        min={0}
                        className=" border border-lime-500 rounded-lg p-1 mt-2 w-full"
                        // value={list.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col my-3">
                    <label>Total Estimado: {""}
                        <span className="text-blue-500">
                            {list.amount * list.price}
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
