import { useRef } from 'react';
import Button from '../elements/Button';
import { Card, CardHeader, CardBody, CardFooter, Typography, Input } from '@material-tailwind/react';

// eslint-disable-next-line react/prop-types
const DetailsPicsModal = ({ onClose, onHandleName, createdAt = '24 Agustus 2024', updatedAt = '24 Agustus 2024', text = '....', categoryValue, imageValue }) => {
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
      <Card className="absolute my-8 transform -translate-x-1/2 -translate-y-1/2 top-[45%] left-1/2 w-96">
        <CardHeader
          floated={false}
          className="h-30 md:h-70"
        >
          <img
            src={imageValue}
            alt={categoryValue}
          />
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <Typography className="-mb-2">Created At</Typography>
              <Typography className="-mb-2">{formatDate(createdAt)}</Typography>
            </div>
            <div className="flex flex-col gap-2">
              <Typography className="-mb-2">Updated At</Typography>
              <Typography className="-mb-2">{formatDate(updatedAt)}</Typography>
            </div>
          </div>
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
            Name
          </Typography>
          <Input
            label="Name"
            size="lg"
            onChange={onHandleName}
            value={categoryValue}
            disabled
          />
        </CardBody>
        <CardFooter className="flex items-center justify-center w-full gap-2">
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

export default DetailsPicsModal;
