// eslint-disable-next-line react/prop-types
const UserLayout = ({ children, classname }) => {
  return <div className={`w-full min-h-screen flex justify-center flex-col ${classname}`}>{children}</div>;
};

export default UserLayout;
