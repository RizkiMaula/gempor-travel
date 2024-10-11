// eslint-disable-next-line react/prop-types
const UserLayout = ({ children, classname }) => {
  return <div className={`w-full h-[200rem] flex justify-center items-center flex-col pb-7 ${classname}`}>{children}</div>;
};

export default UserLayout;
