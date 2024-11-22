import { Dispatch, SetStateAction, useState } from 'react';
import DefaultStar from '../../assets/common/evaluating-default-star.svg';
import Star1 from '../../assets/common/evaluating-star-1.svg';
import Star2 from '../../assets/common/evaluating-star-2.svg';
import Star3 from '../../assets/common/evaluating-star-3.svg';
import Star4 from '../../assets/common/evaluating-star-4.svg';
import Star5 from '../../assets/common/evaluating-star-5.svg';
import { MembersEvaluations, MemberDetail } from '../../types';

const EvaluatingUser = ({
  member,
  setMemberEvaluation,
}: {
  member: MemberDetail['user'];
  setMemberEvaluation: Dispatch<SetStateAction<MembersEvaluations[] | []>>;
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [sended, setSended] = useState(false);
  const hoverImages = [DefaultStar, Star1, Star2, Star3, Star4, Star5];

  const onSubmitRaiting = (id: number, index: number) => {
    setMemberEvaluation((prev) => [...prev, { userId: id, points: index }]);
    setRating(index);
    setSended(true);
  };

  const activeStars = (index: number) => {
    if (hover >= index) {
      return <img className="w-full " src={hoverImages[hover]} alt="star" />;
    } else {
      return (
        <img className="opacity-50 w-full " src={hoverImages[0]} alt="star" />
      );
    }
  };
  return (
    <li className="flex justify-between gap-7 px-[10px] border border-color-pm rounded-[10px] py-2">
      <span className="name flex items-center ">
        {member.firstName + ' ' + member.lastName}
      </span>
      <div className="flex p-1 gap-2">
        {hoverImages.map((_, index) => {
          if (index > 0) {
            return (
              <button
                type="button"
                key={index}
                className="w-6 h-6"
                disabled={sended}
                onClick={() => onSubmitRaiting(member.id!, index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                {activeStars(index)}
              </button>
            );
          }
        })}
      </div>
    </li>
  );
};

export default EvaluatingUser;
