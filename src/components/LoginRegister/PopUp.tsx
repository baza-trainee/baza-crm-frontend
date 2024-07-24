type PopUpProps = {
  text1: string;
  text2: string;
  additionalClass?: string;
  onClose: () => void;
};

const PopUp: React.FC<PopUpProps> = ({
  text1,
  text2,
  additionalClass = '',
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className={`font-Open Sans font-sans text-[20px] font-bold leading-[1.5] w-[600px] p-[50px] pb-[100px] bg-[#f8f9fd] rounded-[10px] ${additionalClass}`}
      >
        <div className="flex justify-end mb-[36px]">
          <svg
            onClick={onClose}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <path
              d="M20 1.75L18.25 0L10 8.25L1.75 0L0 1.75L8.25 10L0 18.25L1.75 20L10 11.75L18.25 20L20 18.25L11.75 10L20 1.75Z"
              fill="#333338"
            />
          </svg>
        </div>
        <div className="flex justify-center mb-[12px]">{text1}</div>
        <div className="flex justify-center">{text2}</div>
      </div>
    </div>
  );
};

export default PopUp;
