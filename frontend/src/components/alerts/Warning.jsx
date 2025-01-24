import Swal from "sweetalert2";

const WarningAlert = () => {
  return Swal.fire({
    icon: "warning",
    text: "Something went wrong!",
    footer: '<a href="#">Waiting to develop</a>'
  });
};

export default WarningAlert;
