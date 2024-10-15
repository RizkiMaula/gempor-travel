import { Button } from '@material-tailwind/react';

const TableLayouts = ({ content, eventShowModal, title }) => {
  return (
    <div className="flex flex-col items-center w-full gap-2 pt-[4rem] md:pt-[5rem]">
      {' '}
      <div className="w-[90%] flex justify-between items-center py-4">
        <h1 className="text-xl md:text-2xl">{title}</h1>
        <Button
          text="Add"
          event={eventShowModal}
          bgColor="bg-blue-500"
        />
      </div>
      {content}
    </div>
  );
};

export default TableLayouts;
