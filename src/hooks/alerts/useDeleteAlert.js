import Swal from 'sweetalert2';

const useDeleteAlert = () => {
  const deleteAlertConfirm = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
  };
  const deleteAlertSuccess = () => {
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'Your file has been deleted.',
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const deleteAlertError = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
  };
  const deleteAlertReject = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You canceled the deletion!',
    });
  };
  return { deleteAlertSuccess, deleteAlertConfirm, deleteAlertError, deleteAlertReject };
};

export default useDeleteAlert;
