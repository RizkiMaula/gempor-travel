import { Typography, Card } from '@material-tailwind/react';

const Table = (props) => {
  // eslint-disable-next-line react/prop-types
  const { logic, th1 = 'Name', th2 = 'Created At', th3 = 'Updated At', th4 = 'Action' } = props;
  return (
    <Card className="w-[90%] h-full overflow-scroll">
      <table className="w-full text-center table-auto min-w-max">
        <thead>
          <tr>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 dark:bg-gray-700 dark:border-gray-700 ">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70 dark:text-lightTextColor"
              >
                {th1}
              </Typography>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 dark:bg-gray-700 dark:border-gray-700">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70 dark:text-lightTextColor"
              >
                {th2}
              </Typography>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 dark:bg-gray-700 dark:border-gray-700">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70 dark:text-lightTextColor"
              >
                {th3}
              </Typography>
            </th>
            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50 dark:bg-gray-700 dark:border-gray-700">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70 dark:text-lightTextColor"
              >
                {th4}
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>{logic}</tbody>
      </table>
    </Card>
  );
};

export default Table;
