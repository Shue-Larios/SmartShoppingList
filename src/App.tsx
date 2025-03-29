
import { Header } from "./components/Header"
import { List } from "./components/List"
import { PlusIcon } from '@heroicons/react/24/solid'
import { Modal } from "./components/Modal"
import { useReducer, useState } from "react"
import { initialState, productsReducer } from "./reducers/list-reducer"




function App() {

  // State de mi app
  const [state, dispatch] = useReducer(productsReducer, initialState)

  // para el modal si esta abierto o no
  const [isModalVisible, setIsModalVisible] = useState(false);


 

 

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

      {/* {list.length !== 0
        ? <h2 className="text-center m-10 uppercase">Tu Lista se Encuentra vacia...</h2>
        : <List
        state={state}
        
        />
      } */}

      {/* para abrir la ventana modal */}
      <div className="App">
        <button className="fixed bottom-4 right-5 bg-lime-500 text-white rounded-full h-10 w-10 md:h-15 md:w-15 hover:bg-lime-600 text-center cursor-pointer"
          onClick={() => setIsModalVisible(true)}
        >
          <PlusIcon
          />
        </button>

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
