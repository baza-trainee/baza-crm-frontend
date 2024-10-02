import HashLoader from 'react-spinners/HashLoader';

const Spinner: React.FC = () => {
  return (
    <section className="flex items-center justify-center w-full height-100">
      <HashLoader
        color="#1e70eb"
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </section>
  );
};

export default Spinner;
