import EvaluatingCard from '../components/Evaluating/EvaluatingCard';
import { useState } from 'react';
import type { MembersEvaluations, RootState } from '../types';
import { useSelector } from 'react-redux';
import type { BotProjectDetails } from '../types';
//import { getKarmaInfo } from '../utils/karmaApi';
//import type { Tag } from '../types';
//import { getTags } from '../utils/tagApi';

const Evaluating = () => {
  const [currentProjectDetails, setCurrentProjectDetails] = useState<
    BotProjectDetails | []
  >();
  const [membersEvaluations, setMembersEvaluations] = useState<
    MembersEvaluations[] | []
  >([]); // для setKarma
  const [sended, setSended] = useState(false);
  //const [tags, setTags] = useState<Tag[]>();
  console.log(currentProjectDetails, setCurrentProjectDetails);
  const user = useSelector((state: RootState) => state.userState.user);
  //const searchParams = new URLSearchParams(window.location.search);
  //const requstToken = searchParams.get('data');

  /* 
  useEffect(() => {
    Promise.all([
      getKarmaInfo(requstToken!, user!.token),
      getTags(user!.token),
    ]).then((res) => {
      setCurrentProjectDetails(res[0]);
      setTags(res[1]);
    });
  }, [user, requstToken]); */
  /* const tags: Tag[] = [
    {
      id: 160,
      name: 'Java',
      color: null,
      isSpecialization: false,
    },
    {
      id: 161,
      name: 'React Vue',
      color: null,
      isSpecialization: false,
    },
    {
      id: 162,
      name: 'Angular',
      color: null,
      isSpecialization: false,
    },
    {
      id: 163,
      name: 'Swagger',
      color: null,
      isSpecialization: false,
    },
    {
      id: 164,
      name: 'Postman',
      color: null,
      isSpecialization: false,
    },
    {
      id: 266,
      name: 'Security Archit',
      color: '#1c8e44',
      isSpecialization: true,
    },
    {
      id: 200,
      name: 'Jira',
      color: null,
      isSpecialization: false,
    },
    {
      id: 267,
      name: 'back-end',
      color: '#93f868',
      isSpecialization: true,
    },
    {
      id: 4,
      name: 'mobile',
      color: null,
      isSpecialization: true,
    },
    {
      id: 5,
      name: 'open-source',
      color: null,
      isSpecialization: false,
    },
    {
      id: 6,
      name: 'open-source2',
      color: null,
      isSpecialization: true,
    },
    {
      id: 7,
      name: 'haptic6',
      color: null,
      isSpecialization: false,
    },
    {
      id: 8,
      name: 'wireless',
      color: null,
      isSpecialization: true,
    },
    {
      id: 12,
      name: 'open-source5',
      color: null,
      isSpecialization: true,
    },
    {
      id: 14,
      name: '1080p1',
      color: null,
      isSpecialization: true,
    },
    {
      id: 15,
      name: 'multi-byte0',
      color: null,
      isSpecialization: true,
    },
    {
      id: 20,
      name: 'digital7',
      color: null,
      isSpecialization: true,
    },
    {
      id: 25,
      name: 'PM',
      color: null,
      isSpecialization: true,
    },
    {
      id: 26,
      name: 'Design',
      color: null,
      isSpecialization: true,
    },
    {
      id: 27,
      name: 'Front-end',
      color: null,
      isSpecialization: true,
    },
    {
      id: 28,
      name: 'Back-end',
      color: null,
      isSpecialization: true,
    },
    {
      id: 29,
      name: 'QA-manual',
      color: null,
      isSpecialization: true,
    },
    {
      id: 30,
      name: 'Full Stack',
      color: null,
      isSpecialization: true,
    },
    {
      id: 211,
      name: 'PM2',
      color: '#579dff',
      isSpecialization: true,
    },
    {
      id: 212,
      name: 'Design2',
      color: '#94c748',
      isSpecialization: true,
    },
    {
      id: 214,
      name: 'Front-end2',
      color: '#f5cd47',
      isSpecialization: true,
    },
    {
      id: 230,
      name: 'Back-end2',
      color: '#9f8fef',
      isSpecialization: true,
    },
    {
      id: 239,
      name: 'QA',
      color: '#f87168',
      isSpecialization: true,
    },
    {
      id: 241,
      name: 'Full Stack 2',
      color: '#fea362',
      isSpecialization: true,
    },
  ]; */

  const membersArray = [
    {
      title: 'Design',
      members: [
        { id: 2, name: 'Антиристарх Евгений' },
        { id: 3, name: 'Антиристарх Евгений' },
        { id: 4, name: 'Антиристарх Евгений' },
        { id: 5, name: 'Антиристарх Евгений' },
        { id: 6, name: 'Антиристарх Евгений' },
        { id: 7, name: 'Антиристарх Евгений' },
      ],
      borderColor: 'border-color-designer',
      bgColor: 'bg-color-designer',
    },
    {
      title: 'Front-end',
      members: [
        { id: Number(user?.user.id), name: 'Поточний юзер' },
        { id: 9, name: 'Антиристарх Евгений' },
        { id: 10, name: 'Антиристарх Евгений' },
        { id: 11, name: 'Антиристарх Евгений' },
        { id: 12, name: 'Антиристарх Евгений' },
        { id: 13, name: 'Антиристарх Евгений' },
      ],
      borderColor: 'border-color-front-end',
      bgColor: 'bg-color-front-end',
    },
    {
      title: 'Back-end',
      members: [
        { id: 14, name: 'Антиристарх Евгений' },
        { id: 15, name: 'Антиристарх Евгений' },
        { id: 16, name: 'Антиристарх Евгений' },
        { id: 17, name: 'Антиристарх Евгений' },
        { id: 18, name: 'Антиристарх Евгений' },
        { id: 19, name: 'Антиристарх Евгений' },
      ],
      borderColor: 'border-color-back-end',
      bgColor: 'bg-color-back-end',
    },
    {
      title: 'QA Manual',
      members: [
        { id: 20, name: 'Антиристарх Евгений' },
        { id: 21, name: 'Антиристарх Евгений' },
        { id: 22, name: 'Антиристарх Евгений' },
        { id: 23, name: 'Антиристарх Евгений' },
        { id: 24, name: 'Антиристарх Евгений' },
        { id: 25, name: 'Антиристарх Евгений' },
      ],
      borderColor: 'border-color-qa',
      bgColor: 'bg-color-qa',
    },
    {
      title: 'Full-Stack',
      members: [
        { id: 26, name: 'Антиристарх Евгений' },
        { id: 27, name: 'Антиристарх Евгений' },
        { id: 28, name: 'Антиристарх Евгений' },
        { id: 29, name: 'Антиристарх Евгений' },
        { id: 30, name: 'Антиристарх Евгений' },
        { id: 31, name: 'Антиристарх Евгений' },
      ],
      borderColor: 'border-color-full-stack',
      bgColor: 'bg-color-full-stack',
    },
    {
      title: 'PM',
      members: [{ id: 32, name: 'Антиристарх Евгений' }],
      borderColor: 'border-color-pm',
      bgColor: 'bg-color-pm',
    },
  ];

  const sendEvaluations = () => {
    console.log(membersEvaluations);
    //setKarma()      //протестувати коли буде працювати бек
    setSended(true);
    // console.log()
  };
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
          /*  currentProjectDetails &&
          tags && */
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
          className={`px-[87px] py-[14px] ${sended ? 'bg-disabled-blue' : 'bg-primary-blue'} rounded-[10px]`}
          onClick={sendEvaluations}
          disabled={sended}
        >
          <p className="text-white font-semibold">Відправити</p>
        </button>
      </div>
    </section>
  );
};

export default Evaluating;
