import { useRef } from 'react';
import Button from '../elements/Button';

// eslint-disable-next-line react/prop-types
const DetailsPicsModal = ({ onClose, createdAt = '24 Agustus 2024', updatedAt = '24 Agustus 2024', text = '....', categoryValue, imageValue }) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm"
    >
      <div className="absolute flex flex-col items-center justify-center w-1/3 gap-4 transform -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-black rounded top-1/2 left-1/2 h-1/3">
        <h4>{text}</h4>
        <div className="flex flex-col items-center w-full gap-2 border-2 border-black">
          <h1>{categoryValue}</h1>
          <img
            src={imageValue}
            alt={categoryValue}
            className="w-1/2 h-1/2"
          />
          {/* <div className="flex gap-2">
            <h1>Created At: {formatDate(createdAt)}</h1>
            <h1>Updated At: {formatDate(updatedAt)}</h1>
          </div> */}
        </div>
        <div className="flex justify-around w-[75%] gap-2">
          <Button
            text="Cancel"
            bgColor="bg-red-500"
            event={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsPicsModal;
