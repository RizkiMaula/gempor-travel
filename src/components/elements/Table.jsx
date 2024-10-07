const Table = (props) => {
  // eslint-disable-next-line react/prop-types
  const { logic, column1 = 'Nama', column2 = 'Created At', column3 = 'Updated At', column4 = 'Action' } = props;
  return (
    <div className="overflow-x-auto w-[98%] ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-center">
            <th
              scope="col"
              className="px-6 py-3"
            >
              {column1}
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              {column2}
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              {column3}
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              {column4}
            </th>
          </tr>
        </thead>
        <tbody>{logic}</tbody>
      </table>
    </div>
  );
};

export default Table;
