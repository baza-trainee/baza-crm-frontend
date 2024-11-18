import EvaluatingCard from '../components/Evaluating/EvaluatingCard';
import { useEffect, useState } from 'react';
import type { MembersEvaluations, RootState } from '../types';
import { useSelector } from 'react-redux';
import type { BotProjectDetails } from '../types';
import { getKarmaInfo } from '../utils/karmaApi';

const Evaluating = () => {
  const [projectDetails, setProjectDetails] = useState<
    BotProjectDetails | []
  >();
  const [membersEvaluations, setMembersEvaluations] = useState<
    MembersEvaluations | []
  >([]); // для setKarma
  console.log(membersEvaluations);
  //const tags = {};
  const user = useSelector((state: RootState) => state.userState.user);
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('data');
  useEffect(() => {
    getKarmaInfo(token!, user!.token).then((res) => setProjectDetails(res));
  }, [user, token]);
  const membersArray = [
    {
      title: 'Design',
      members: [
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
      ],
      borderColor: 'border-color-designer',
      bgColor: 'bg-color-designer',
    },
    {
      title: 'Front-end',
      members: [
        { id: user!.user.id, name: 'Поточний юзер' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
      ],
      borderColor: 'border-color-front-end',
      bgColor: 'bg-color-front-end',
    },
    {
      title: 'Back-end',
      members: [
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
      ],
      borderColor: 'border-color-back-end',
      bgColor: 'bg-color-back-end',
    },
    {
      title: 'QA Manual',
      members: [
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
      ],
      borderColor: 'border-color-qa',
      bgColor: 'bg-color-qa',
    },
    {
      title: 'Full-Stack',
      members: [
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
        { name: 'Антиристарх Евгений' },
      ],
      borderColor: 'border-color-full-stack',
      bgColor: 'bg-color-full-stack',
    },
    {
      title: 'PM',
      members: [{ name: 'Антиристарх Евгений' }],
      borderColor: 'border-color-pm',
      bgColor: 'bg-color-pm',
    },
  ];
  const sendEvaluations = () => {};
  return (
    <section className="px-12 pt-5 pb-10 bg-input-normal-state">
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
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {user &&
          projectDetails &&
          membersArray.map((m, index) => (
            <EvaluatingCard
              key={index}
              setMembersEvaluations={setMembersEvaluations}
              title={m.title}
              borderColor={m.borderColor}
              bgColor={m.bgColor}
              members={m.members}
            />
          ))}
      </ul>
      <div className="flex justify-center">
        <button
          className="px-[87px] py-[14px] bg-primary-blue rounded-[10px]"
          onClick={sendEvaluations}
        >
          <p className="text-white font-semibold">Відправити</p>
        </button>
      </div>
    </section>
  );
};

export default Evaluating;
