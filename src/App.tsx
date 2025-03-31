
import { Header } from "./components/Header"
import { List } from "./components/List"
import { PlusIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import { Modal } from "./components/Modal"
import { useEffect, useReducer, useState } from "react"
import { initialState, productsReducer } from "./reducers/list-reducer"
import Swal from "sweetalert2"




function App() {

  // State de mi app
  const [state, dispatch] = useReducer(productsReducer, initialState)

  // para el modal si esta abierto o no
  const [isModalVisible, setIsModalVisible] = useState(false);


  // guardamos datos en el localStorage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(state.products))
  }, [state.products])

  const ResetApp = () => {

    Swal.fire({
      title: "¿Estás seguro/a? ",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "reset-app" })
        Swal.fire({
          title: "¡Eliminada!",
          text: "Su archivo ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }



  return (
    <>
      <Header
        state={state}
      />
      {state.products.length === 0
        ? <h2 className="text-center m-10 uppercase">Tu Lista se Encuentra vacia...</h2>
        : <List
          state={state}
          dispatch={dispatch}
          setIsModalVisible={setIsModalVisible}
        />
      }

      {/* para abrir la ventana modal */}
      <div className="App">
        <button className="fixed bottom-4 right-5 bg-lime-500 text-white rounded-full h-10 w-10 md:h-15 md:w-15 hover:bg-lime-600 text-center cursor-pointer"
          title="Agrega Productos"
          onClick={() => setIsModalVisible(true)}
        >
          <PlusIcon
          />
        </button>

        {state.products.length > 0
          ? <button className="fixed bottom-4 left-5 bg-red-500 text-white rounded-full h-10 w-10 md:h-15 md:w-15 hover:bg-red-600 text-center cursor-pointer"
            title="Reinicia la App"
            onClick={() => ResetApp()}
          >
            <ArrowPathIcon
              className=" md:h-13 m-1"
            />
          </button>
          : <></>
        }


        <Modal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          state={state}
          dispatch={dispatch}
        />
      </div>
    </>
  )
}

export default App
