// eslint-disable-next-line react/prop-types
const UserLayout = ({ children, classname }) => {
  return (
    <div
      className={`w-full h-[200rem] flex justify-center items-center flex-col  ${classname}`}
      style={{ border: '2px solid black', top: '5rem' }}
    >
      {children}
    </div>
  );
};

export default UserLayout;
