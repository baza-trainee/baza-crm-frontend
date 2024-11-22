import { Dispatch, SetStateAction, useState } from 'react';
import DefaultStar from '../../assets/common/evaluating-default-star.svg';
import Star1 from '../../assets/common/evaluating-star-1.svg';
import Star2 from '../../assets/common/evaluating-star-2.svg';
import Star3 from '../../assets/common/evaluating-star-3.svg';
import Star4 from '../../assets/common/evaluating-star-4.svg';
import Star5 from '../../assets/common/evaluating-star-5.svg';
import { MembersEvaluations, RootState, MemberDetail } from '../../types';
import { toast } from 'react-toastify';

import { useSelector } from 'react-redux';

const EvaluatingUser = ({
  member,
  setMemberEvaluation,
}: {
  member: MemberDetail['user'];
  setMemberEvaluation: Dispatch<SetStateAction<MembersEvaluations[] | []>>;
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const user = useSelector((state: RootState) => state.userState.user);
  const hoverImages = [DefaultStar, Star1, Star2, Star3, Star4, Star5];

  const onSubmitRaiting = (id: number, index: number) => {
    if (Number(user?.user.id) !== member.id!) {
      setMemberEvaluation((prev) => [...prev, { userId: id, points: index }]);
      setRating(index);
    } else toast.error('Себе оцінювати не можна');
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
    <li className="flex justify-between gap-7 px-[10px] border border-wave-blue rounded-[10px] py-2">
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
