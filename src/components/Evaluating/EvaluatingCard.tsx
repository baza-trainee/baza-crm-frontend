import { Dispatch, SetStateAction } from 'react';
import EvaluatingUser from './EvaluatingUser';
import type { MembersEvaluations } from '../../types';

const EvaluatingCard = ({
  title,
  borderColor,
  bgColor,
  members,
  setMembersEvaluations,
}: {
  members: { id?: string; name: string }[];
  title: string;
  borderColor: string;
  bgColor: string;
  setMembersEvaluations: Dispatch<SetStateAction<MembersEvaluations | []>>;
}) => {
  return (
    <li
      className={`py-5 px-8 bg-white border-2 rounded-[20px] h-min ${borderColor}`}
    >
      <span
        className={`inline-block mb-3 px-5 rounded-[10px] ${bgColor} font-bold text-lg leading-[1.5] text-white`}
      >
        {title}
      </span>
      <ul className="flex flex-col gap-3">
        {members.map((m, index) => (
          <EvaluatingUser
            key={m.id ? m.id : index}
            setMemberEvaluation={setMembersEvaluations}
            member={m}
          />
        ))}
      </ul>
    </li>
  );
};

export default EvaluatingCard;
