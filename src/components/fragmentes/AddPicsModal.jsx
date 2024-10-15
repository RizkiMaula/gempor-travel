import { useRef } from 'react';
import Button from '../elements/Button';
import { Card, CardBody, CardFooter, Typography, Input } from '@material-tailwind/react';

// eslint-disable-next-line react/prop-types
const AddPicsModal = ({ onClose, onHandleName, onHandleImage, onAddCategory, text = '....' }) => {
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
      <Card className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
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
            Insert Name
          </Typography>
          <Input
            label="Name"
            size="lg"
            required
            onChange={onHandleName}
          />
          <Typography
            className="-mb-2"
            variant="h6"
          >
            Insert Image Here
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={onHandleImage}
          />
        </CardBody>
        <CardFooter className="flex justify-between pt-0">
          <Button
            text="Add"
            bgColor="bg-blue-500"
            event={onAddCategory}
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

export default AddPicsModal;
