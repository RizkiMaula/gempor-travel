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
    // <tr className="text-center">
    //   <td className="py-2 border-b-2">{name}</td>
    //   <td className="py-2 border-b-2">{formatDate(createdAt)}</td>
    //   <td className="py-2 border-b-2">{formatDate(updatedAt)}</td>
    //   <td className="flex justify-center gap-2 py-2 border-b-2">
    //     <button onClick={eventView}>
    //       <FontAwesomeIcon icon={faCircleInfo} />
    //     </button>
    //     <button onClick={eventEdit}>
    //       <FontAwesomeIcon icon={faFilePen} />
    //     </button>
    //     <button onClick={eventDelete}>
    //       <FontAwesomeIcon icon={faTrash} />
    //     </button>
    //   </td>
    // </tr>
    <tr key={keyIndex}>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {name}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {formatDate(createdAt)}
        </Typography>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          {formatDate(updatedAt)}
        </Typography>
      </td>
      <td
        className={classes}
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
