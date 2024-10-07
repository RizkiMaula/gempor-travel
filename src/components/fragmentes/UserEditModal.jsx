import { useRef } from 'react';
import Button from '../elements/Button';

// eslint-disable-next-line react/prop-types
const UserEditModal = ({ onClose, onUpdateRole, text = '....', name = 'diambil dari API nanti', image = '....', value, onEventRole }) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm"
    >
      <div className="absolute flex flex-col items-center justify-center w-[50%] gap-4 transform -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-black rounded top-1/2 left-1/2 h-[50%]">
        <h4>{text}</h4>
        <div className="flex flex-col items-center w-full h-[10rem] gap-2 border-2 border-black">
          <img
            src={image}
            alt=""
            className="w-[7rem] h-[50%] rounded-full"
          />
          <h1>{name}</h1>
          <select
            name="Role"
            id=""
            value={value}
            onChange={onEventRole}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="flex justify-around w-[75%] gap-2">
          <Button
            text="Update"
            bgColor="bg-blue-500"
            event={onUpdateRole}
          />
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

export default UserEditModal;
