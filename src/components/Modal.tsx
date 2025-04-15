import { Dispatch, SetStateAction } from "react";
import { Form } from "./Form";
import { XCircleIcon } from '@heroicons/react/24/solid'
import { ProductsActions, ProductsState } from "../reducers/list-reducer";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'


type ModalProps = {
    isModalVisible: boolean
    setIsModalVisible: Dispatch<SetStateAction<boolean>>
    state: ProductsState
    dispatch: Dispatch<ProductsActions>

}


export const Modal = ({ isModalVisible, setIsModalVisible, state, dispatch }: ModalProps) => {
    // cerrar el modal con el boton
    const circleIconOut = () => {
        setIsModalVisible(false)
        state.productId = ""
    }


    return (

        <>
            <div className="fixed right-5 bottom-5 flex items-center justify-center">
                <button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => setIsModalVisible(true)}
                >
                    <PlusCircleIcon className='w-16 h-16 text-blue-600 hover:text-blue-800 rounded-full' />
                </button>
            </div>


            <Transition appear show={isModalVisible} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={circleIconOut}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-200 bg-opacity-75" />
                    </Transition.Child>
                    <div className="fixed  inset-0 overflow-y-auto ">
                        <div className="flex min-h-full items-center  justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                {/* aca le agregue para que se modifique el tama;o del cuadro de dialogo */}
                                <Dialog.Panel className="w-auto md:w-98 h-auto max-w-3xl transform overflow-visible rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <XCircleIcon
                                        title="Cerrar Ventana"
                                        onClick={circleIconOut}
                                        className="absolute -top-4 -right-5 h-10 w-10 cursor-pointer text-red-500 hover:text-red-700"
                                    />

                                    <div className="">
                                        <h2 className="text-2xl mb-4 text-center">¡Agrega producto a tu Lista!</h2>
                                        {/* contenido del modal   */}
                                        <Form
                                            setIsModalVisible={setIsModalVisible}
                                            dispatch={dispatch}
                                            state={state}
                                        />
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>




    );
};
