// funcion para formatear cantidades son signo de dolar
export const formatCurrency = (quantity: number) => {
    return new Intl.NumberFormat('en-US', {
        style: "currency",
        currency : "USD"
    }).format(quantity)
}

// Funcion para evitar que el usuario ingrese mas de 10 en cantidades
export const formatCurrencyWithLimit = (quantity: number) => {
    // Limita el valor a 10 si es mayor que 10
    const limitedQuantity = quantity > 10 ? 10 : quantity;
    return new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    }).format(limitedQuantity);
}