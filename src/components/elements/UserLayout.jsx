// eslint-disable-next-line react/prop-types
const UserLayout = ({ children, classname, height = 'h-110 md:h-[130rem]', padding = 'pb-10 lg:pb-0 md:pb-0' }) => {
  return <div className={`w-full ${height} ${padding} flex justify-center items-center flex-col ${classname}`}>{children}</div>;
};

export default UserLayout;
