const AdminViewInput = ({
  id,
  label,
  text,
}: {
  id: string;
  label: string;
  text: string | undefined;
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-text-black font-open-sans text-[20px] font-normal leading-[28px] tracking-[0.4px]"
      >
        {label}
      </label>
      <div className="relative">
        <input
          className="mt-2 rounded-[10px] border-2 border-solid border-input-normal-state bg-light-blue-bg px-4 h-10 w-full font-open-sans text-base font-normal leading-[26px] hover:outline-none focus:outline-none"
          id={id}
          defaultValue={text}
          readOnly
        />
      </div>
    </div>
  );
};

export default AdminViewInput;
