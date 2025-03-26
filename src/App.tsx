 
import { Header } from "./components/Header"
import { List } from "./components/List"
import { PlusIcon } from '@heroicons/react/24/solid'
import { listItem } from "./types"
import { Modal } from "./components/Modal"
import { useState } from "react"
 
function App() {

  // const [state, dispatch] = useReducer(productsReducer, initialState)


  const [list, setList] = useState<listItem[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false);

  console.log(setList);
  

  return (


    <>
      <Header />
      {list.length !== 0
        ? <h2 className="text-center m-10 uppercase">Tu Lista se Encuentra vacia...</h2>
        : <List />
      }

      {/* para abrir la ventana modal */}
      <div className="App">
        <button className="fixed bottom-4 right-5 bg-blue-500 text-white rounded-full h-10 w-10 md:h-15 md:w-15 hover:bg-blue-700 text-center"
          onClick={() => setIsModalVisible(true)}
        >
          <PlusIcon
          />
        </button>

        <Modal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </div>

    </>
  )
}

export default App
