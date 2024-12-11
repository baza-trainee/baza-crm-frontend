import star from '../../assets/common/star.svg';
import fullStar from '../../assets/common/full-star.svg';

const UserRating = ({
  projectPoints,
  karmaPoints,
}: {
  projectPoints: number | null | undefined;
  karmaPoints: number | null | undefined;
}) => {
  return (
    <div className="flex-1 h-[719px] overflow-hidden border rounded-xl border-card-border bg-white p-4">
      <h2 className="mb-4 text-lg font-bold text-center">Рейтинг співпраці</h2>
      <table className="m-[-1px] min-w-full text-base border rounded-xl border-card-border ">
        <thead className="font-lato bg-[#e4f1ff]">
          <tr>
            <th className="py-3 border border-card-border rounded-tl-xl">
              Бали за проєкт
            </th>
            <th className="py-3 border border-card-border rounded-tr-xl">
              Оцінка команди
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-3 text-center border border-[#bcd7ff]">
              <div className="flex items-center justify-center gap-3">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={i < (karmaPoints ?? 0) ? fullStar : star}
                    alt={i < (karmaPoints ?? 0) ? 'Full star' : 'Star'}
                    width={24}
                    height={24}
                  />
                ))}
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
