import { useState } from 'react';

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
                      {rating && hover >= index ? (
                        <img
                          src={`/assets/common/evaluating-star-${hover}.svg`}
                          alt="star"
                        />
                      ) : (
                        <img
                          className="opacity-50"
                          src="/assets/common/evaluating-default-star.svg"
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
