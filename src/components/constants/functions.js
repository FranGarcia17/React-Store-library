import Swal from "sweetalert2";

export function normalizeString(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
};

export function alertSuccess(action) {
    return Swal.fire({
        position: "center",
        icon: "success",
        title: `libro ${action} correctamente`,
        showConfirmButton: false,
        timer: 1500,
    });
}

export function alertError() {
    Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Este libro ya lo haz agregado",
    });
}