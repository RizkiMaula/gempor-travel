import { useRef } from 'react';
import Button from '../elements/Button';
import { Card, CardHeader, CardBody, CardFooter, Typography, Input } from '@material-tailwind/react';

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
      <Card className="absolute my-8 transform -translate-x-1/2 -translate-y-1/2 top-[45%] left-1/2 w-96">
        <CardHeader
          floated={false}
          className="h-30 md:h-70"
        >
          <img
            src={image}
            alt={name}
          />
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Typography
            variant="h4"
            color="blue-gray"
          >
            {text}
          </Typography>
          <Typography
            className="-mb-2"
            variant="h6"
          >
            {name}
          </Typography>
          <Typography
            className="-mb-2"
            variant="h6"
          >
            Role
          </Typography>
          <select
            name="Role"
            id=""
            value={value}
            onChange={onEventRole}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </CardBody>
        <CardFooter className="flex items-center justify-between w-full gap-2">
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
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserEditModal;
