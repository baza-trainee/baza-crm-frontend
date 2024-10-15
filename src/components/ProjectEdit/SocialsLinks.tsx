import { Controller, useFormContext } from 'react-hook-form';
import { useState } from 'react';

const SocialsLinks = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext();

  const links: string[] = watch('links', []);

  const [isOpen, setIsOpen] = useState(false);

  const handleAddLink = async () => {
    const isValid = await trigger(['socialLink']);
    if (!isValid) return;

    let socialLink = watch('socialLink');

    if (
      !socialLink.startsWith('http://') &&
      !socialLink.startsWith('https://')
    ) {
      socialLink = `https://${socialLink}`;
    }

    const updatedLinks = [...links, socialLink];
    setValue('links', updatedLinks);

    setValue('socialLink', '');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-[10px] py-5 border-card-border border flex flex-col gap-5 w-[412px]">
      <ul className="flex flex-col gap-2 px-8">
        {links?.map((link) => (
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
        <div
          className="flex items-center justify-between gap-2 px-8 cursor-pointer "
          onClick={toggleDropdown}
        >
          <h3 className="font-semibold">Додати посилання на соц. мережі</h3>
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
        </div>
        {isOpen && (
          <div className="absolute left-0 z-10 bg-input-normal-state rounded-[10px] shadow-lg top-8 w-full border-card-border border px-7 py-5">
            <Controller
              name="socialLink"
              control={control}
              defaultValue=""
              rules={{ required: "Посилання обов'язкове" }}
              render={({ field }) => (
                <>
                  <label htmlFor="socialLink">Нове посилання</label>
                  <input
                    className="w-full h-10 mt-2 rounded-[10px] duration-500 outline-none focus:border-primary-blue border-2 px-3"
                    placeholder="Введіть посилання"
                    {...field}
                  />
                  <div className="h-2">
                    {errors.socialLink &&
                      typeof errors.socialLink.message === 'string' && (
                        <span className="text-red">
                          {errors.socialLink.message}
                        </span>
                      )}
                  </div>
                </>
              )}
            />
            <button
              type="button"
              onClick={handleAddLink}
              className="border-2 border-primary-blue rounded-[10px] duration-500 bg-primary-blue text-white hover:bg-transparent hover:text-black font-semibold flex justify-center items-center w-[268px] h-10 mx-auto mt-5"
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
