import Swal from "sweetalert2";

export default function ErrorAlert() {
  return Swal.fire({
    icon: "error",
    title: "error",
    text: "Something went wrong!",
    footer: '<a href="#">Contact support</a>',
  });
}
