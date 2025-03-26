import { Dispatch, FormEvent, SetStateAction } from "react"
import { categoryItems } from "../data/db"
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid'

type FormProps = {
    setIsModalVisible: Dispatch<SetStateAction<boolean>>
}


export const Form = ({ setIsModalVisible }: FormProps) => {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("desde handlesubmit");
        setIsModalVisible(false) //cierra el modal
    }


    return (
        // <form action="" className="w-2/3 grid grid-cols-2 justify-items-center p-5  bg-red-500">
        <form action="" onSubmit={handleSubmit} >
            <div className="justify-items-center  mx-auto">
                <div className="p-2 space-x-3">
                    <label htmlFor="categoria">Categoria</label>
                    <select id="categoria" className="border border-lime-500 rounded-lg mt-2 p-1 w-full">
                        {categoryItems.map((item => (
                            <option key={item.id} value="">{item.name} </option>
                        )))}
                    </select>

                </div>
                <div className=" p-2 space-x-3">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre"
                        className=" border border-lime-500 rounded-lg mt-2 p-1 w-full" />
                </div>
                <div className=" p-2 m space-x-3">
                    <label htmlFor="cantidad" >Cantidad</label>
                    <input type="number"
                        id="cantidad"
                        min={0}
                        className=" border border-lime-500 rounded-lg mt-2 p-1 w-full" />
                </div>
                <div className=" p-2 space-x-3">
                    <label htmlFor="precio">Precio</label>
                    <input type="number"
                        id="precio"
                        min={0}
                        className=" border border-lime-500 rounded-lg p-1 mt-2 w-full" />
                </div>

                <div className=" md:col-span-2 grid">
                    <label className="flex flex-col my-3">Total Estimado:{""} </label>
                    {/* <input
                        className="-full my-auto rounded-2xl h-8 cursor-pointer bg-green-500 hover:bg-green-700"
                        type="submit" value="Guardar"
                    /> */}

                    <button
                    className="flex flex-row-reverse gap-2 items-center cursor-pointer rounded-lg bg-green-500 hover:bg-green-700 p-1 text-white"
                    title="Guardar en la lista" 
                    >
                        <ArrowUpCircleIcon className="h-5 w-5"/>
                        Guardar
                    </button>



                </div>
            </div>

        </form>

    )
}
