import star from '../../assets/common/star.svg';
import fullStar from '../../assets/common/full-star.svg';

type UserRatingProps = {
  tableHeaders?: string[];
  userProjects?: (string | null)[][];
};

const UserRating: React.FC<UserRatingProps> = ({
  tableHeaders = [
    'Назва проекту',
    'Період',
    'Бали за проект',
    'Оцінка команди',
  ],
  userProjects = [
    ['CRM Baza Skills', '07.2024-09.2024', '3', '3'],
    ['Project Alpha', '10.2024-11.2024', '2', '2'],
    ['Project Beta', '11.2024-12.2024', null, null],
  ],
}) => {
  return (
    <div className="flex-1 h-[719px] overflow-hidden border rounded-xl border-card-border bg-white">
      <table className="m-[-1px] min-w-full text-base border border-card-border">
        <thead className="font-lato py-2 bg-[#e4f1ff]">
          <tr>
            {tableHeaders.map((tableHeader, i) => (
              <th className="py-3 border border-card-border" key={i}>
                {tableHeader}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userProjects.map((userProject, rowIndex) => (
            <tr key={rowIndex}>
              {userProject.map((data, colIndex) => (
                <td
                  key={colIndex}
                  className="py-3 text-center border border-[#bcd7ff]"
                >
                  {colIndex === 3 ? (
                    <div className="flex justify-center items-center gap-3">
                      {[...Array(5)].map((_, i) => (
                        <img
                          key={i}
                          src={i < Number(data) ? fullStar : star}
                          alt={i < Number(data) ? 'Full star' : 'Star'}
                          width={24}
                          height={24}
                        />
                      ))}
                    </div>
                  ) : (
                    data
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRating;
