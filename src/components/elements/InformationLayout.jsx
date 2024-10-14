// eslint-disable-next-line react/prop-types
const InformationLayout = ({ title, logic, loading, error }) => {
  return (
    <>
      <h1 className="text-sm text-center sm:text-xl md:text-2xl">{title}</h1>
      {loading}
      {error}
      <div className="w-full h-[50%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 pb-4">{logic}</div>
    </>
  );
};

export default InformationLayout;
