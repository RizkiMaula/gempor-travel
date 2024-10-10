import { Typography, Card } from '@material-tailwind/react';

const TABLE_HEAD = ['Name', 'Created At', 'Updated At', 'Action'];

const Table = (props) => {
  // eslint-disable-next-line react/prop-types
  const { logic } = props;
  return (
    <Card className="w-[90%] h-full overflow-scroll">
      <table className="w-full text-center table-auto min-w-max">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="p-4 border-b border-blue-gray-100 bg-blue-gray-50"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{logic}</tbody>
      </table>
    </Card>
  );
};

export default Table;
