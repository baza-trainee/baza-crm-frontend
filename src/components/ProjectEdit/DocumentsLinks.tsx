import { useFormContext } from 'react-hook-form';
import { useState } from 'react';

import { Document } from '../../types';

const DocumentsLinks = () => {
  const {
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();

  const documents: Document[] = watch('documents', []);

  const [documentInput, setDocumentInput] = useState<Document>({
    name: '',
    link: '',
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleAddDocument = () => {
    let hasError = false;

    if (!documentInput.name) {
      setError('documentName', { message: "Назва документа обов'язкова" });
      hasError = true;
    }
    if (!documentInput.link) {
      setError('documentLink', {
        message: "Посилання на документ обов'язкове",
      });
      hasError = true;
    }

    if (hasError) return;

    if (
      !documentInput.link.startsWith('http://') &&
      !documentInput.link.startsWith('https://')
    ) {
      documentInput.link = `https://${documentInput.link}`;
    }

    const updatedDocuments = [...documents, documentInput];
    setValue('documents', updatedDocuments);
    setDocumentInput({ name: '', link: '' });
  };

  const handleInputChange = (field: 'name' | 'link', value: string) => {
    setDocumentInput((prev) => ({ ...prev, [field]: value }));

    if (field === 'name') {
      clearErrors('documentName');
    } else if (field === 'link') {
      clearErrors('documentLink');
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-[10px] px-8 py-2 border-card-border border relative mt-4">
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
        <div className="bg-white rounded-[10px] pt-5 border-card-border border flex flex-col gap-5 w-full absolute top-11 left-0">
          <ul className="flex flex-col gap-2 px-8">
            {documents.map((doc) => (
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
            <label htmlFor="documentName">Назва документа</label>
            <input
              className="w-full h-10 mt-2 rounded-[10px] duration-500 outline-none focus:border-primary-blue border-2 px-3"
              placeholder="Введіть назву"
              type="text"
              value={documentInput.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <div className="h-5">
              {errors.documentName?.message &&
                typeof errors.documentName.message === 'string' && (
                  <span className="text-red">
                    {errors.documentName.message}
                  </span>
                )}
            </div>
            <label htmlFor="documentLink">Посилання на документ</label>
            <input
              className="w-full h-10 mt-2 rounded-[10px] duration-500 outline-none focus:border-primary-blue border-2 px-3"
              placeholder="Введіть посилання"
              type="text"
              value={documentInput.link}
              onChange={(e) => handleInputChange('link', e.target.value)}
            />
            <div className="h-2">
              {errors.documentLink?.message &&
                typeof errors.documentLink.message === 'string' && (
                  <span className="text-red">
                    {errors.documentLink.message}
                  </span>
                )}
            </div>
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
