import { FaDiscord, FaLinkedinIn } from 'react-icons/fa6';

const Socials: React.FC = () => {
  return (
    <div className="flex gap-9">
      <div className="grid duration-500 border-2 rounded-md border-primary-blue size-9 bg-primary-blue place-items-center hover:border-white">
        <a href="http://discord.com" target="_blank" rel="noopener noreferrer">
          <FaDiscord size={24} className="text-white" />
        </a>
      </div>
      <div className="grid duration-500 border-2 rounded-md border-primary-blue size-9 bg-primary-blue place-items-center hover:border-white">
        <a
          href="https://www.linkedin.com/company/baza-trainee/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn size={24} className="text-white" />
        </a>
      </div>
    </div>
  );
};
export default Socials;
