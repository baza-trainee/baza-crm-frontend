import { useState } from 'react';

const DocumentationsLinks: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="bg-white rounded-[10px] px-8 py-2 border-card-border border justify-between flex items-center relative cursor-pointer"
      onClick={toggleDropdown}
    >
      <span>Документація</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
      {isOpen && (
        <div className="absolute left-0 z-10 mt-1 bg-input-normal-state rounded-[10px] shadow-lg top-full w-full border-card-border border">
          <ul className="py-2">
            <li>
              <a
                href="https://www.figma.com/design/HKp4ob8BG0AAZqT3mhVyyj/CRM_system?node-id=1656-7724&node-type=frame&t=DII6qHoxV4BFESGb-0"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block px-8 py-1 duration-500 text-primary-blue group"
              >
                <span className="group-hover:after:w-12 after:w-0 after:block after:h-[1px] after:bg-primary-blue after:absolute after:left-0 after:bottom-1 after:transition-all after:duration-500 after:mx-8">
                  Figma
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://trello.com/uk"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block px-8 py-1 duration-500 text-primary-blue group"
              >
                <span className="group-hover:after:w-10 after:w-0 after:block after:h-[1px] after:bg-primary-blue after:absolute after:left-0 after:bottom-1 after:transition-all after:duration-500 after:mx-8">
                  Trello
                </span>
              </a>
            </li>
            <li>
              <a
                href="https://www.figma.com/design/HKp4ob8BG0AAZqT3mhVyyj/CRM_system?node-id=1656-7724&node-type=frame&t=DII6qHoxV4BFESGb-0"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block px-8 py-1 duration-500 text-primary-blue group"
              >
                <span className="group-hover:after:w-36 after:w-0 after:block after:h-[1px] after:bg-primary-blue after:absolute after:left-0 after:bottom-1 after:transition-all after:duration-500 after:mx-8">
                  Технічне завдання
                </span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentationsLinks;
