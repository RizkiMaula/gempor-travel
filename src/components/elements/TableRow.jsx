import { faCircleInfo, faFilePen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@material-tailwind/react';
// eslint-disable-next-line react/prop-types
const TableRow = ({ keyIndex, name, createdAt, updatedAt, eventDelete, eventEdit, eventView, classes = '', isLast }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <tr key={keyIndex}>
      <td className="p-4 border-b border-blue-gray-50 dark:bg-gray-400">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal dark:text-gray-800"
        >
          {name}
        </Typography>
      </td>
      <td className="p-4 border-b border-blue-gray-50 dark:bg-gray-400">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal dark:text-gray-800"
        >
          {formatDate(createdAt)}
        </Typography>
      </td>
      <td className="p-4 border-b border-blue-gray-50 dark:bg-gray-400">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal dark:text-gray-800"
        >
          {formatDate(updatedAt)}
        </Typography>
      </td>
      <td
        className="p-4 border-b border-blue-gray-50 dark:bg-gray-400 dark:text-gray-800"
        style={{ textAlign: 'center', display: 'flex', gap: '10px', justifyContent: 'center' }}
      >
        <button onClick={eventView}>
          <FontAwesomeIcon icon={faCircleInfo} />
        </button>
        <button onClick={eventEdit}>
          <FontAwesomeIcon icon={faFilePen} />
        </button>
        <button onClick={eventDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
