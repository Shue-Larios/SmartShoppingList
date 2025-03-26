import { Dispatch, SetStateAction } from "react";
import { Form } from "./Form";
import { XCircleIcon } from '@heroicons/react/24/solid'
type ModalProps = {
    isModalVisible: boolean
    setIsModalVisible: Dispatch<SetStateAction<boolean>>
}


export const Modal = ({ isModalVisible, setIsModalVisible }: ModalProps) => {

    if (!isModalVisible) return null; // Si no se debe mostrar la modal, no renderiza nada


    // Si el clic es fuera del modal, cierra la modal
    const handleClickOut = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((e.target as HTMLElement).classList.contains('backModal')) {
            // setIsModalVisible(false)
            setIsModalVisible(false)

        }
    }

    return (
        // backModal una clase personalizada que utilice para identificar el área que rodea el contenido de la modal
        <div className="backModal   fixed inset-0 bg-gray-200   opacity-95 flex justify-center items-center z-50"
            onClick={handleClickOut}>

            {/* e.stopPropagation() previene que el evento de clic se propague hacia los elementos padres, es decir, detiene la "burbuja" del evento. */}
            <div className="bg-white p-6 rounded-lg md:w-1/3" onClick={(e) => e.stopPropagation()} >
                {/* icono de cerrar sesion */}
                <div className="relative">
                    <XCircleIcon
                    title="Cerrar Ventana"
                        onClick={() => setIsModalVisible(false)}
                        className='absolute -top-10 -right-20 px-10  h-10 cursor-pointer text-red-500'
                    //  className='absolute -top-10 right-2 h-10 w-10 text-gray-700 cursor-pointer'
                    />
                    <h2 className="text-2xl mb-4 text-center">¡Agrega producto a tu Lista!</h2>
                    {/* contenido del modal   */}
                    <Form
                        setIsModalVisible={setIsModalVisible}
                    />
                </div>
            </div>
        </div>
    );
};
