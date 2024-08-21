import TitleHeader from '../components/Portal/TitleHeader';
import UserProfileHeader from '../components/Portal/UserProfileHeader';
import UserRating from '../components/Portal/UserRating';

const Portal = () => {
  return (
    <section className="flex flex-col w-full min-h-screen gap-5 px-8 pt-5 pb-24 bg-light-blue-bg">
      <UserProfileHeader />
      <TitleHeader title="Інформація учасника" />
      <div className="flex w-full gap-5">
        <div className="flex-1 border rounded-xl border-card-border bg-white"></div>
        <UserRating />
      </div>
    </section>
  );
};

export default Portal;
