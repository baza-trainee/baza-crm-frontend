import { Dispatch, SetStateAction, useState } from 'react';
import DefaultStar from '../../assets/common/evaluating-default-star.svg';
import Star1 from '../../assets/common/evaluating-star-1.svg';
import Star2 from '../../assets/common/evaluating-star-2.svg';
import Star3 from '../../assets/common/evaluating-star-3.svg';
import Star4 from '../../assets/common/evaluating-star-4.svg';
import Star5 from '../../assets/common/evaluating-star-5.svg';
import { MembersEvaluations } from '../../types';

const EvaluatingUser = ({
  members,
  setMemberEvaluation,
}: {
  members: { name: string }[];
  setMemberEvaluation: Dispatch<SetStateAction<MembersEvaluations | []>>;
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const onSubmitRaiting = (index: number, name: string) => {
    setMemberEvaluation((prev) => [...prev, { name, evaluation: index }]);
    setRating(index);
  };

  return members.map((m, index) => (
    <li
      key={index}
      className="flex justify-between gap-7 px-[10px] border border-wave-blue rounded-[10px] py-2"
    >
      <span className="name flex items-center ">{m.name}</span>
      <div className="flex p-1 gap-2">
        {[...Array(5)].map((_, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className="w-6 h-6"
              onClick={() => onSubmitRaiting(index, m.name)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              {hover >= index ? (
                <img
                  className="w-full "
                  src={
                    hover === 1
                      ? Star1
                      : hover === 2
                        ? Star2
                        : hover === 3
                          ? Star3
                          : hover === 4
                            ? Star4
                            : Star5
                  }
                  alt="star"
                />
              ) : (
                <img
                  className="opacity-50 w-full "
                  src={DefaultStar}
                  alt="star"
                />
              )}
            </button>
          );
        })}
      </div>
    </li>
  ));
};

export default EvaluatingUser;
