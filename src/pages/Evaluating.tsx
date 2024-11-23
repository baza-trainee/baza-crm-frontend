import EvaluatingCard from '../components/Evaluating/EvaluatingCard';
import { useEffect, useState } from 'react';
import type {
  MembersEvaluations,
  BotProjectDetails,
  MemberDetail,
  RootState,
  SetEvaluations,
} from '../types';
import { useSelector } from 'react-redux';
import { getKarmaObject, setKarma } from '../utils/karmaApi';
import type { Tag } from '../types';
import { getTags } from '../utils/tagApi';

const Evaluating = () => {
  const [currentProjectDetails, setCurrentProjectDetails] =
    useState<BotProjectDetails>();
  const [membersEvaluations, setMembersEvaluations] = useState<
    MembersEvaluations[] | []
  >([]);
  const [sended, setSended] = useState(false);
  const [tags, setTags] = useState<Tag[]>();
  const user = useSelector((state: RootState) => state.userState.user);
  const searchParams = new URLSearchParams(window.location.search);
  const requstToken = searchParams.get('data');

  useEffect(() => {
    if (requstToken) {
      Promise.all([
        getKarmaObject(requstToken!, user!.token),
        getTags(user!.token),
      ]).then((res) => {
        setCurrentProjectDetails(res[0]);
        setTags(res[1]);
      });
    }
  }, [user, requstToken]);

  const sendEvaluations = async () => {
    const karmasObj: SetEvaluations = {
      karmas: membersEvaluations,
    };
    await setKarma(requstToken as string, user!.token, karmasObj);
    setSended(true);
  };
  const originalTags = () => {
    const originalTagsArray: BotProjectDetails['members'] = [];
    currentProjectDetails?.members.forEach((m) => {
      const findTag = originalTagsArray.find(
        (t: MemberDetail) => t.tagId === m.tagId,
      );
      if (!findTag) {
        originalTagsArray.push(m);
      }
    });
    return originalTagsArray;
  };
  return (
    <section className="px-12 pt-5 pb-10 bg-input-normal-state min-h-screen">
      <span className="text-2xl font-bold block py-3 border-card-border rounded-xl border text-center bg-white mb-5">
        Оцінка роботи команди
      </span>
      {currentProjectDetails ? (
        <>
          <div className="text-center [&>p]:text-xl mb-5">
            <p>
              Вітаємо, ви завершили роботу над проєктом
              <span className="font-bold">
                {` "${currentProjectDetails.project.name}"`}
              </span>
            </p>
            <p>Будь ласка, оцініть роботу команди.</p>
          </div>
          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {user &&
              currentProjectDetails &&
              tags &&
              originalTags().map((m, index) => {
                const currentTagData = tags.filter((t) => t.id === m.tagId)[0];
                const currentMembers = currentProjectDetails.members.filter(
                  (m) => m.tagId === currentTagData.id,
                );
                return (
                  <EvaluatingCard
                    key={index}
                    setMembersEvaluations={setMembersEvaluations}
                    title={currentTagData.name}
                    color={currentTagData.color}
                    members={currentMembers}
                  />
                );
              })}
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
        </>
      ) : (
        <p className="font-semibold">Немає даних про команду</p>
      )}
    </section>
  );
};

export default Evaluating;
