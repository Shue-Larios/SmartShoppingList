import { formatCurrency } from "../helpers"
import { ProductsState } from "../reducers/list-reducer"

type HeaderProps = {

    state: ProductsState
}

export const Header = ({ state }: HeaderProps) => {

    const estimatedAmount = state.products.reduce((total, item) => total + (item.price * item.amount), 0)

    return (
        <header className="bg-lime-500 h-20 w-full grid place-items-center">
            <h1 className="md:text-4xl text-xl text-white pointer-events-none select-none">
                Lista de Compras Inteligente
                <span className="ml-3">🛒</span>
            </h1>
            {estimatedAmount !== 0 && <h3 className="text-white pointer-events-none  select-none">Monto estimado en tu compra: {""}
                <span className="font-bold">
                    {formatCurrency(estimatedAmount)}
                </span>
            </h3>

            }
        </header>
    )
}
