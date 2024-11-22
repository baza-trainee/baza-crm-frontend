import { Dispatch, SetStateAction } from 'react';
import EvaluatingUser from './EvaluatingUser';
import type { MembersEvaluations, MemberDetail } from '../../types';

const EvaluatingCard = ({
  title,
  color,
  members,
  setMembersEvaluations,
}: {
  members: MemberDetail[];
  title: string;
  color: string;
  setMembersEvaluations: Dispatch<SetStateAction<MembersEvaluations[] | []>>;
}) => {
  return (
    <li
      style={{ borderColor: color }}
      className="py-5 px-8 bg-white border-2 rounded-[20px] h-min "
    >
      <span
        style={{ backgroundColor: color }}
        className="inline-block mb-3 px-5 rounded-[10px] font-bold text-lg leading-[1.5] text-white"
      >
        {title}
      </span>
      <ul className="flex flex-col gap-3">
        {members.map((m) => (
          <EvaluatingUser
            key={m.user.id}
            setMemberEvaluation={setMembersEvaluations}
            member={m.user}
          />
        ))}
      </ul>
    </li>
  );
};

export default EvaluatingCard;
