import { Controller, useFormContext } from 'react-hook-form';
import { useState } from 'react';

import { Document } from '../../types';

const DocumentsLinks = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext();

  const documents: Document[] = watch('documents', []);

  const [isOpen, setIsOpen] = useState(false);

  const handleAddDocument = async () => {
    const isValid = await trigger(['documentName', 'documentLink']);
    if (!isValid) return;

    let documentLink = watch('documentLink');

    if (
      !documentLink.startsWith('http://') &&
      !documentLink.startsWith('https://')
    ) {
      documentLink = `https://${documentLink}`;
    }

    const newDocument: Document = {
      name: watch('documentName'),
      link: documentLink,
    };
    const updatedDocuments = [...documents, newDocument];
    setValue('documents', updatedDocuments);

    setValue('documentName', '');
    setValue('documentLink', '');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-[10px] px-8 py-2 border-card-border border relative">
      <div
        onClick={toggleDropdown}
        className="flex items-center justify-between cursor-pointer "
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
      </div>
      {isOpen && (
        <div className="bg-white rounded-[10px] pt-5 border-card-border border flex flex-col gap-3 w-full absolute top-11 left-0">
          <ul className="flex flex-col gap-2 px-8">
            {documents?.map((doc) => (
              <li key={doc.link}>
                <a
                  href={doc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative hover:after:w-full after:w-0 after:block after:h-[2px] after:bg-primary-blue after:absolute after:left-0 after:bottom-0 after:duration-500 hover:text-primary-blue cursor-pointer capitalize"
                >
                  {doc.name}
                </a>
              </li>
            ))}
          </ul>
          <h3 className="px-8 font-semibold">Додати посилання на документ</h3>
          <div className="bg-input-normal-state rounded-b-[10px] w-full border-card-border border-t px-7 py-5">
            {/* DOCUMENT NAME FIELD */}
            <Controller
              name="documentName"
              control={control}
              defaultValue=""
              rules={{ required: "Назва документа обов'язкова" }}
              render={({ field }) => (
                <>
                  <label htmlFor="documentName">Назва документа</label>
                  <input
                    className="w-full h-10 mt-2 rounded-[10px] duration-500 outline-none focus:border-primary-blue border-2 px-3"
                    placeholder="Введіть назву"
                    {...field}
                  />
                  <div className="h-5">
                    {errors.documentName &&
                      typeof errors.documentName.message === 'string' && (
                        <span className="text-red">
                          {errors.documentName.message}
                        </span>
                      )}
                  </div>
                </>
              )}
            />

            {/* DOCUMENT LINK FIELD */}
            <Controller
              name="documentLink"
              control={control}
              defaultValue=""
              rules={{ required: "Посилання обов'язкове" }}
              render={({ field }) => (
                <>
                  <label htmlFor="documentLink">Посилання на документ</label>
                  <input
                    className="w-full h-10 mt-2 rounded-[10px] duration-500 outline-none focus:border-primary-blue border-2 px-3"
                    placeholder="Введіть посилання"
                    {...field}
                  />
                  <div className="h-2">
                    {errors.documentLink &&
                      typeof errors.documentLink.message === 'string' && (
                        <span className="text-red">
                          {errors.documentLink.message}
                        </span>
                      )}
                  </div>
                </>
              )}
            />
            <button
              type="button"
              onClick={handleAddDocument}
              className="border-2 border-primary-blue rounded-[10px] duration-500 bg-primary-blue text-white hover:bg-transparent hover:text-black font-semibold flex justify-center items-center w-[268px] h-10 mx-auto mt-5"
            >
              Додати
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsLinks;
