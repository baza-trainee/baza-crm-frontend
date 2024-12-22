import { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { getTags } from '../../utils/tagApi';
import type { Project } from '../../types';
import Select, {
  components,
  DropdownIndicatorProps,
  StylesConfig,
} from 'react-select';
import Modal from 'react-modal';
import { Controller, useForm } from 'react-hook-form';
import chevronDown from '../../assets/common/chevron-down.svg';

type SelectSpecialization = {
  value: number | undefined;
  label: string | undefined;
};

type ApplyForm = {
  specialization: string;
  ndaCondition: boolean;
  projectRules: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropdownIndicator = (props: DropdownIndicatorProps<any, true>) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={chevronDown} alt="chevronDownIcon" width={24} height={24} />
    </components.DropdownIndicator>
  );
};

const ApplyPopUp = ({
  projectId,
  price,
  token,
  projectSpecializations,
  openApplyPopUp,
  handleCloseApplyPopUp,
}: {
  price: number;
  projectId: number;
  projectSpecializations: Project['projectRequirments'];
  token: string | undefined;
  openApplyPopUp: boolean;
  handleCloseApplyPopUp: () => void;
}) => {
  const [specializations, setSpecializations] = useState<
    SelectSpecialization[]
  >([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ApplyForm>({
    defaultValues: {
      specialization: '',
      ndaCondition: false,
      projectRules: false,
    },
  }); //TODO:add send request logic and work with admin crm part

  useEffect(() => {
    const constructTagObject = async () => {
      const allTags = await getTags(token!);
      const tagObject = projectSpecializations.map((s) => {
        const res = allTags.find((t) => t.id === s.tagId);
        return { value: res?.id, label: res?.name };
      });
      setSpecializations(tagObject);
    };
    constructTagObject();
  }, []);
  const customStyles: StylesConfig<SelectSpecialization, true> = {
    control: (provided, state) => ({
      ...provided,
      height: '20px',
      backgroundColor: state.isFocused ? '#E8F2FF' : '#F8F9FD',
      borderRadius: '10px',
      borderWidth: '2px',
      borderColor: '#e8f2ff',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'gray',
      },
      minHeight: '40px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    menu: (provided) => ({
      ...provided,
      height: '244px',
    }),

    menuList(base) {
      return {
        ...base,
        maxHeight: '244px',
      };
    },
  };

  const submitHandler = (data: ApplyForm) => {
    console.log(data);
    console.log(projectId);
  };

  const handleMenuOpen = () => setIsMenuOpen(true);
  const handleMenuClose = () => setIsMenuOpen(false);
  return (
    <Modal
      isOpen={openApplyPopUp}
      onAfterClose={handleCloseApplyPopUp}
      onRequestClose={handleCloseApplyPopUp}
      style={{
        overlay: {
          backgroundColor: 'rgba(145, 162, 182, 0.7)',
          zIndex: '50',
        },
        content: {
          backgroundColor: '#F8F9FD',
          zIndex: '100',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          padding: '0',
          marginRight: '-50%',
          transform: 'translate(-45%, -50%)',
          borderWidth: '1px',
          borderRadius: '10px',
        },
      }}
    >
      <div className="flex flex-col pt-7">
        <div className="w-full flex justify-end pr-7">
          <RxCross1 onClick={handleCloseApplyPopUp} />
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-3 px-60 pb-10"
        >
          <h3 className="font-sans text-xl">Спеціалізація</h3>
          <Controller
            name="specialization"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                menuIsOpen={isMenuOpen}
                onMenuOpen={handleMenuOpen}
                onMenuClose={handleMenuClose}
                components={{ DropdownIndicator }}
                options={specializations}
                onChange={(selectedOption) => onChange(selectedOption)}
                onBlur={onBlur}
                value={specializations.find((s) => s.label === value)}
                classNamePrefix="select"
                placeholder=""
                styles={customStyles}
                hideSelectedOptions={false}
              ></Select>
            )}
          ></Controller>
          {errors.specialization && (
            <p className="text-sm text-red">Field must be filled</p>
          )}
          <div
            style={isMenuOpen ? { marginTop: '250px' } : { marginTop: '0px' }}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col">
              <label className="flex gap-1">
                <input
                  type="checkbox"
                  {...register('projectRules', { required: true })}
                />
                <span className="flex gap-1">
                  <p>Погоджуюсь</p>
                  <p className="text-primary-blue">
                    з правилами участі у проєкті.
                  </p>
                </span>
              </label>
              {errors.projectRules && (
                <p className="text-sm text-red">Please agree to the terms</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="flex gap-1">
                <input
                  type="checkbox"
                  {...register('ndaCondition', { required: true })}
                />
                <span className="flex gap-1">
                  <p>Погоджуюсь</p>
                  <p className="text-primary-blue">з умовами NDA</p>
                </span>
              </label>
              {errors.ndaCondition && (
                <p className="text-sm text-red">Please agree to the terms</p>
              )}
            </div>

            <span className="flex gap-1">
              <p>Внесок за участь в проєкті -</p>
              <p className="text-primary-blue">{price} грн.</p>
            </span>

            <button
              className="border-2 rounded-[10px] border-primary-blue duration-500 bg-primary-blue text-white hover:bg-white hover:text-primary-blue px-32 py-2"
              type="submit"
            >
              <p className="text-white font-semibold hover:text-primary-blue">
                Подати заявку
              </p>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ApplyPopUp;
