import Swal from "sweetalert2";

const SuccessAlert = () => {
  return Swal.fire({
    title: `Update successfully`,
    icon: "success",
    draggable: true,
  });
};

export default SuccessAlert;
