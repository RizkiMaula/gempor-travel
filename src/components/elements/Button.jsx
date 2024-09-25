// eslint-disable-next-line react/prop-types
const Button = ({ text = '....', bgColor = 'bg-red-500', event }) => {
  return (
    <div>
      <button
        className={`w-[6rem] h-[2rem] text-white ${bgColor} rounded-[0.25rem]`}
        onClick={event}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
