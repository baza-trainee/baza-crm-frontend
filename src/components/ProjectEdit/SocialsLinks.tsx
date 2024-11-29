import { useFormContext } from 'react-hook-form';
import { useRef, useState, useEffect } from 'react';

const SocialsLinks = () => {
  const {
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();

  const links: string[] = watch('links', []);
  const [linkInput, setLinkInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const linkRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toogleLinkMenu = (e: MouseEvent) => {
    if (linkRef.current === e.target) {
      setIsOpen((prev) => !prev);
    } else if (!menuRef.current?.contains(e.target as Node)) setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', toogleLinkMenu);
    return () => document.removeEventListener('click', toogleLinkMenu);
  }, [linkRef, menuRef]);

  const handleAddLink = () => {
    let formattedLink = linkInput;
    if (!formattedLink) {
      setError('linkInput', {
        message: "Посилання обов'язкове",
      });
      return;
    }

    if (!linkInput.startsWith('http://') && !linkInput.startsWith('https://')) {
      formattedLink = `https://${linkInput}`;
    }

    const updatedLinks = [...links, formattedLink];
    setValue('links', updatedLinks);
    setLinkInput('');
  };

  const handleInputChange = (value: string) => {
    setLinkInput(value);

    if (errors.linkInput) {
      clearErrors('linkInput');
    }
  };

  return (
    <div className="bg-white rounded-[10px] py-5 border-card-border border flex flex-col gap-5 w-[412px]">
      <ul className="flex flex-col gap-2 px-8">
        {links.map((link) => (
          <li key={link}>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative hover:after:w-full after:w-0 after:block after:h-[2px] after:bg-primary-blue after:absolute after:left-0 after:bottom-0 after:duration-500 hover:text-primary-blue cursor-pointer"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
      <div className="relative">
        <div className="flex items-center justify-between gap-2 px-8 cursor-pointer ">
          <h3
            ref={linkRef}
            className="font-normal  hover:text-primary-blue hover:underline"
          >
            Додати посилання на соц. мережі
          </h3>
        </div>
        {isOpen && (
          <div
            ref={menuRef}
            className="absolute left-0 z-10 bg-input-normal-state rounded-[10px] shadow-lg top-8 w-full border-card-border border px-7 py-5"
          >
            <label htmlFor="linkInput" className="">
              Нове посилання
            </label>
            <input
              className="w-full h-10 mt-2 rounded-[10px] duration-500 outline-none focus:border-primary-blue border-2 px-3"
              placeholder="Введіть посилання"
              type="text"
              value={linkInput}
              onChange={(e) => {
                handleInputChange(e.target.value);
              }}
            />
            <div className="h-5">
              {errors?.linkInput &&
                typeof errors?.linkInput?.message === 'string' && (
                  <span className="text-red">{errors?.linkInput?.message}</span>
                )}
            </div>
            <button
              type="button"
              onClick={handleAddLink}
              className="border-2 border-primary-blue rounded-[10px] duration-500 bg-primary-blue text-white hover:bg-transparent hover:text-black font-semibold flex justify-center items-center w-[268px] h-10 mx-auto mt-2"
            >
              Додати
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialsLinks;
