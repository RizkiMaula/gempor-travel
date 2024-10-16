import ReactLoading from 'react-loading';

// eslint-disable-next-line react/prop-types
const Loading = ({ type = 'spin', color = '#0000FF', height = '5rem', width = '5rem' }) => {
  return (
    <ReactLoading
      type={type}
      color={color}
      height={height}
      width={width}
    />
  );
};

export default Loading;
