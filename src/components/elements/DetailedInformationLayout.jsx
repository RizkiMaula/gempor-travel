// eslint-disable-next-line react/prop-types
const DetailedInformationLayout = ({ title, logic, loading, error }) => {
  return (
    <>
      <h1 className="text-sm text-center sm:text-xl md:text-2xl">{title}</h1>
      {loading}
      {error}
      <div className="w-full h-[50%] flex justify-center items-center gap-4 mt-3 pb-4">{logic}</div>
    </>
  );
};

export default DetailedInformationLayout;
