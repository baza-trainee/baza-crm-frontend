import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { UserData } from './PortalUserForm';

interface FileInputProps {
  id: keyof UserData;
  label: string;
  icon?: string;
  register: UseFormRegister<UserData>;
}

const FileInput: React.FC<FileInputProps> = ({ id, label, icon, register }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : '');
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="text-text-black font-open-sans text-[20px] font-normal leading-[28px] tracking-[0.4px]"
      >
        {label}
      </label>
      <div className="relative">
        <label className="mt-2 mb-2 flex items-center justify-between cursor-pointer rounded-[10px] border-2 border-solid border-input-normal-state bg-light-blue-bg px-4 h-10 w-full font-open-sans text-base font-normal leading-[26px]">
          <span
            className={`${
              fileName ? 'text-primary-blue underline' : 'text-light-grey'
            } font-open-sans text-[16px] font-normal leading-[26px]`}
          >
            {fileName ? fileName : 'Не обрано'}
          </span>
          {icon && (
            <img
              src={icon}
              alt={icon}
              className="ml-2"
              width={24}
              height={24}
            />
          )}
          <input
            id={id}
            type="file"
            className="hidden"
            {...register(id)}
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

export default FileInput;
