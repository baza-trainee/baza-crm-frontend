import type { EvaluatingsCalculate } from '../../types';

const UserRating = ({
  projectPoints,
  karmaPoints,
}: {
  projectPoints: number | null | undefined;
  karmaPoints: string | null | undefined;
}) => {
  const evaluatings = (): EvaluatingsCalculate => {
    const points = Number(karmaPoints);
    const number = Math.trunc(points);
    return {
      fullStars: new Array(number).fill(1) as number[],
      fractional: (Number(karmaPoints) - number) * 100,
      emptyStars: new Array(5 - Math.ceil(points)).fill(1) as number[],
    };
  };
  return (
    <div className="flex-1 h-[719px] overflow-hidden border rounded-xl border-card-border bg-white p-4">
      <h2 className="mb-4 text-lg font-bold text-center">Рейтинг співпраці</h2>
      <table className="m-[-1px] min-w-full text-base border rounded-xl border-card-border ">
        <thead className="font-lato bg-[#e4f1ff]">
          <tr>
            <th className="py-3 border border-card-border rounded-tl-xl">
              Cередній оцінка за проекти
            </th>
            <th className="py-3 border border-card-border rounded-tr-xl">
              Бали за проекти
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-3 text-center border border-[#bcd7ff]">
              <div className="flex items-center justify-center gap-3">
                <div className="flex gap-0.5">
                  <div className="flex gap-1">
                    {evaluatings().fullStars.map((_s, i) => (
                      <div
                        key={i}
                        className="size-6 [mask-image:url(assets/common/star-mask.svg)] [mask-repeat:no-repeat] [mask-size:cover]"
                      >
                        <div className="bg-[#FFB800] w-full h-full"></div>
                      </div>
                    ))}
                  </div>
                  <div className="size-6 bg-gray-200 [mask-image:url(assets/common/star-mask.svg)] [mask-repeat:no-repeat] [mask-size:cover]">
                    <div
                      className="bg-[#FFB800] h-full"
                      style={{
                        width: `${evaluatings().fractional}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex gap-0.5">
                    {evaluatings().emptyStars.map((_s, i) => (
                      <div
                        key={i}
                        className="size-6 [mask-image:url(assets/common/star-mask.svg)] [mask-repeat:no-repeat] [mask-size:cover]"
                      >
                        <div className="bg-gray-200 w-full h-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </td>
            <td className="py-3 text-center border border-[#bcd7ff]">
              {projectPoints ?? '-'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserRating;
