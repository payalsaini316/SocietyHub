import Swal from "sweetalert2";

export const showSuccess = (message) => {
  return Swal.fire({
    icon: "success",
    title: "Success!",
    text: message,
    confirmButtonColor: "#26734d"
  });
};

export const showError = (message) => {
  return Swal.fire({
    icon: "error",
    title: "Error!",
    text: message,
    confirmButtonColor: "#26734d"
  });
};

export const showWarning = (message) => {
  return Swal.fire({
    icon: "warning",
    title: "Warning!",
    text: message,
    confirmButtonColor: "#26734d"
  });
};

export const showConfirm = (message) => {
  return Swal.fire({
    title: "Are you sure?",
    text: message,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#26734d",
    cancelButtonColor: "#777"
  });
};