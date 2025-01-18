import { User } from '../../types';
import AdminViewInput from './AdminViewInput';
import AdminViewSkillList from './AdminViewSkillList';

const AdminUserForm = ({ user }: { user: User }) => {
  return (
    <form className="flex flex-col gap-5 p-5">
      <div className="flex flex-col lg:flex-row w-[344px] lg:w-full gap-5">
        <div className="w-full flex flex-col gap-[9px] ">
          <AdminViewInput id="firstName" label="Ім'я" text={user.firstName} />
          <AdminViewInput id="lastName" label="Прізвище" text={user.lastName} />
          <AdminViewInput id="country" label="Країна" text={user.country} />
          <AdminViewInput id="city" label="Місто" text={user.city} />
          <AdminViewInput id="phone" label="Телефон" text={user.phone} />
          <AdminViewInput id="resume" label="Резюме" text={user.cv_link} />
        </div>
        <div className="flex flex-col w-full gap-[9px] ">
          <div className="flex flex-col">
            <label className="text-text-black font-open-sans text-[20px] font-normal leading-[28px] tracking-[0.4px]">
              Спеціалізації
            </label>
            <ul className="flex flex-wrap gap-1 mt-2">
              {user.specializations.map((s) => (
                <AdminViewSkillList key={s.id} name={s.name} />
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <label className="text-text-black font-open-sans text-[20px] font-normal leading-[28px] tracking-[0.4px]">
              Технології
            </label>
            <ul className="flex flex-wrap gap-1 mt-2">
              {user.technologies.map((s) => (
                <AdminViewSkillList key={s.id} name={s.name} />
              ))}
            </ul>
          </div>
        </div>
        <AdminViewInput id="email" label="Email" text={user.email} />

        <AdminViewInput id="linkedin" label="Linkedin" text={user.linkedin} />
        <label className="flex gap-2 items-center ">
          <input
            className="size-5"
            type="checkbox"
            checked={user.discordReceiving}
          />
          Отримує сповіщення у Discord
        </label>
      </div>
      <a
        className="w-min px-5 py-3 text-white bg-primary-blue rounded-[10px] hover:bg-active-blue"
        target="_blank"
        href={`https://discord.com/users/${user.discord}`}
      >
        <p>Discord</p>
      </a>
    </form>
  );
};

export default AdminUserForm;
