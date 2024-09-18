import React from 'react';

type SubjectOptionProps = {
  infoType: string;
  setInfoType: (info: string) => void;
  text: string;
  id: string;
};

const SubjectOption: React.FC<SubjectOptionProps> = ({
  setInfoType,
  infoType,
  text,
  id,
}) => {
  return (
    <div className="relative h-[52px] w-[268px] group mr-4">
      <svg
        className="absolute inset-0 z-0 top-0 left-0 w-full h-full transform translate-y-0  transition-all duration-300 group-hover:translate-y-[13px] group-has-[:checked]:translate-y-[13px] fill-primary-blue"
        xmlns="http://www.w3.org/2000/svg"
        width="267"
        height="39"
        viewBox="0 0 267 39"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 0C4.47715 0 0 4.47715 0 10V29C0 34.5228 4.47716 39 10 39H258C263.523 39 268 34.5228 268 29V10C268 4.47715 263.523 0 258 0H10Z"
          fill="1E70EB"
        />
      </svg>
      <div
        onClick={() => setInfoType(text)}
        className="absolute z-10  bg-white mr-4  h-[52px] w-[268px] rounded-xl border-2 border-solid border-primary-blue has-[:checked]:text-primary-blue hover:text-primary-blue "
      >
        <label
          htmlFor={id}
          className="w-full  h-full  text-center cursor-pointer flex items-center justify-center"
        >
          <input
            type="radio"
            id="projects"
            name="info"
            value={text}
            className="invisible"
            checked={infoType === text}
            onChange={() => setInfoType(text)}
          />
          {text}
        </label>
      </div>
    </div>
  );
};

export default SubjectOption;
