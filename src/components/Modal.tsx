import { Dispatch, SetStateAction } from "react";
import { Form } from "./Form";
import { XCircleIcon } from '@heroicons/react/24/solid'
import { ProductsActions, ProductsState } from "../reducers/list-reducer";
type ModalProps = {
    isModalVisible: boolean
    setIsModalVisible: Dispatch<SetStateAction<boolean>>
    state: ProductsState
    dispatch: Dispatch<ProductsActions>

}


export const Modal = ({ isModalVisible, setIsModalVisible, state, dispatch }: ModalProps) => {

    if (!isModalVisible) return null; // Si no se debe mostrar la modal, no renderiza nada


    // Si el clic es fuera del modal, cierra la modal
    const handleClickOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((e.target as HTMLElement).classList.contains('backModal')) {
            setIsModalVisible(false)
            state.productId = ""
        }
    }

    // cerrar el modal con el boton
    const circleIconOut = () => {
        setIsModalVisible(false)
        state.productId = ""
    }

    // lg:w-1/4 md:w-1/2
    return (
        // backModal una clase personalizada que utilice para identificar el área que rodea el contenido de la modal
        <div className="backModal  fixed inset-0 bg-gray-200  opacity-96 flex justify-center items-center"
            onClick={handleClickOut}>
            {/* e.stopPropagation() previene que el evento de clic se propague hacia los elementos padres, es decir, detiene la "burbuja" del evento. */}
            <div className="bg-white p-6 rounded-lg w-5/6  md:w-2/3 lg:w-1/3" onClick={(e) => e.stopPropagation()} >
                {/* icono de cerrar sesion */}
                <div className="relative">
                      <XCircleIcon
                        title="Cerrar Ventana"
                        onClick={circleIconOut}
                        className='absolute -top-10 -right-20 px-10  h-10 cursor-pointer text-red-500'
                    />  
                    {/* classname para poner scroll en la rotacion de pantalla de movil */}
                    <div className=" md:max-h-[60vh] overflow-auto">           
                        <h2 className="text-2xl mb-4 text-center">¡Agrega producto a tu Lista!</h2>
                        {/* contenido del modal   */}
                        <Form
                            setIsModalVisible={setIsModalVisible}
                            dispatch={dispatch}
                            state={state}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};
