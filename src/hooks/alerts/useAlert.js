import Swal from 'sweetalert2';

const useAlert = () => {
  const successAlert = ({ title = 'Success', text = '', icon = 'success', showConfirmButton = true, timer = null }) => {
    Swal.fire({
      icon,
      title,
      text,
      showConfirmButton,
      timer,
    });
  };
  const errorAlert = ({ title = 'Error', text = '', showConfirmButton = true, timer = null }) => {
    Swal.fire({
      icon: 'error',
      title,
      text,
      showConfirmButton,
      timer,
    });
  };
  return { successAlert, errorAlert };
};

export default useAlert;
