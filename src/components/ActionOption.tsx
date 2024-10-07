// import React, { IconType } from 'react';
import { ReactNode } from 'react';
// import { IconType } from 'react-icons';

type ActionOptionProps = {
  id: string;
  text: string;
  action: string;
  // icon: IconType;
  children: ReactNode;
  infoType: string;
  setAction: (info: string) => void;
};

const ActionOption: React.FC<ActionOptionProps> = ({
  id,
  text,
  action,
  children,
  setAction,
  infoType,
}) => {
  console.log(action);
  // console.log(text);
  return (
    <div className="mr-4 flex flex-row items-center has-[:checked]:text-primary-blue hover:text-primary-blue has-[:disabled]:text-tertiary-text has-[:disabled]:pointer-events-none  `${action === text ? 'text-primary-blue' : ''} ${!infoType ? 'text-tertiary-text pointer-events-none' : ''}`">
      <label className="w-full  text-center flex items-center cursor-pointer">
        <input
          type="radio"
          id={id}
          name="action"
          value={text}
          className="invisible peer"
          onChange={() => setAction(text)}
          disabled={!infoType}
        />
        {children}
        {text}
      </label>
    </div>
  );
};

export default ActionOption;
