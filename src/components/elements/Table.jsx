const Table = (props) => {
  // eslint-disable-next-line react/prop-types
  const { logic } = props;
  return (
    <div className="overflow-x-auto w-[98%] ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-center">
            <th
              scope="col"
              className="px-6 py-3"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              Created At
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              Updated At
            </th>
            <th
              scope="col"
              className="px-6 py-3"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>{logic}</tbody>
      </table>
    </div>
  );
};

export default Table;

{
  /* <tr
            key={category.id}
            className="text-center"
          >
            <td className="border-b-2">{category.name}</td>
            <td className="border-b-2">{formatDate(category.createdAt)}</td>
            <td className="border-b-2">{formatDate(category.updatedAt)}</td>
            <td className="flex justify-center gap-2 border-b-2">
              <button>
                <FontAwesomeIcon icon={faCircleInfo} />
              </button>
              <button>
                <FontAwesomeIcon icon={faFilePen} />
              </button>
              <button onClick={() => handleDelete(category.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr> */
}
