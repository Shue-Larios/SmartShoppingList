import Swal from "sweetalert2";

// funcion para formatear cantidades son signo de dolar
export const formatCurrency = (quantity: number) => {
    return new Intl.NumberFormat('en-HN', {
        style: "currency",
        currency: "Lps"
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

export const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});
