import Swal from 'sweetalert2';

const useDeleteAlert = () => {
  const deleteAlertConfirm = ({ title = 'Are you sure?', text = "You won't be able to revert this!", confirmButtonText = 'Yes, delete it!', onConfirm = () => {}, onCancel = () => {} }) => {
    Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        onCancel();
      }
    });
  };

  const deleteAlertSuccess = ({ text = 'Your file has been deleted.' }) => {
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text,
      showConfirmButton: false,
      timer: 1500,
    });
  };
  const deleteAlertError = ({ text = 'Something went wrong!' }) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text,
    });
  };
  const deleteAlertReject = ({ text = 'You canceled the deletion!' }) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text,
    });
  };
  return { deleteAlertSuccess, deleteAlertConfirm, deleteAlertError, deleteAlertReject };
};

export default useDeleteAlert;
