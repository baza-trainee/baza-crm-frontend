import { Dispatch, SetStateAction } from 'react';
import { LuChevronRight } from 'react-icons/lu';
import { LuChevronLeft } from 'react-icons/lu';

const Pagination = ({
  page,
  setPage,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) => {
  const prev = () => {
    if (page > 0) {
      setPage((prev) => prev - 20);
    }
  };
  const next = () => {
    setPage((prev) => prev + 20);
  };
  return (
    <div className="flex justify-center gap-2">
      <LuChevronLeft size={25} onClick={prev} className="cursor-pointer" />
      <LuChevronRight size={25} onClick={next} className="cursor-pointer" />
    </div>
  );
};

export default Pagination;
