import { useState } from 'react';
import DefaultStar from '../assets/common/evaluating-default-star.svg';
import Star1 from '../assets/common/evaluating-star-1.svg';
import Star2 from '../assets/common/evaluating-star-2.svg';
import Star3 from '../assets/common/evaluating-star-3.svg';
import Star4 from '../assets/common/evaluating-star-4.svg';
import Star5 from '../assets/common/evaluating-star-5.svg';

const Evaluating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <section className="px-12 pt-5 pb-12 bg-input-normal-state height-100">
      <span className="text-2xl font-bold block py-3 border-card-border rounded-xl border text-center bg-white mb-5">
        Оцінка роботи команди
      </span>
      <div className="text-center [&>p]:text-xl mb-5">
        <p>
          Вітаємо, ви завершили роботу над проєктом “
          <span className="font-bold">
            Лендінг для збору коштів на придбання дрона для військових
          </span>
          ”.
        </p>
        <p>Будь ласка, оцініть роботу команди.</p>
      </div>
      <ul className="grid grid-cols-3 gap-5 mb-10">
        <li className="py-5 px-8 bg-white border-2 rounded-[20px] border-color-designer">
          <span className="inline-block mb-3 px-5 rounded-[10px] bg-color-designer font-bold text-lg leading-[1.5] text-white">
            Design
          </span>
          <ul className="flex flex-col gap-3">
            <li className="flex justify-between gap-2 px-[10px] border border-hover-gray rounded-[10px] py-2">
              <span className="name">Антиристарх Евгений</span>
              <div className="flex">
                {[...Array(5)].map((_, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className="[&:not(:last-child)]:pr-2"
                      onClick={() => setRating(index)}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(rating)}
                    >
                      {hover >= index ? (
                        <img
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
                          className="opacity-50"
                          src={DefaultStar}
                          alt="star"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  );
};

export default Evaluating;
