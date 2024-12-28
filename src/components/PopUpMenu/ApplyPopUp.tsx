import { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { getTags } from '../../utils/tagApi';
import type { Project } from '../../types';
import Select, {
  components,
  DropdownIndicatorProps,
  StylesConfig,
  OptionProps,
} from 'react-select';
import Modal from 'react-modal';
import { Controller, useForm } from 'react-hook-form';
import chevronDown from '../../assets/common/chevron-down.svg';
import { applyToProject } from '../../utils/projectApplicationApi';

type SelectSpecialization = {
  value: number | undefined;
  label: string | undefined;
};

type ApplyForm = {
  specialization: { value: number | undefined; label: string | undefined };
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
const CustomOption = ({
  children,
  ...props
}: OptionProps<SelectSpecialization, boolean>) => (
  <components.Option {...props}>
    <div className="flex gap-1 items-center group">
      <span className="mt-0.5 size-4 rounded-full border-2 border-black group-hover:border-4  group-hover:border-primary-blue"></span>
      <p className=" group-hover:text-primary-blue text-black">{children}</p>
    </div>
  </components.Option>
);

const ApplyPopUp = ({
  projectId,
  price,
  token,
  projectSpecializations,
  openApplyPopUp,
  openSuccessApplyHandler,
  handleCloseApplyPopUp,
}: {
  price: number;
  projectId: number;
  projectSpecializations: Project['projectRequirments'];
  token: string | undefined;
  openApplyPopUp: boolean;
  openSuccessApplyHandler: () => void;
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
      specialization: { value: undefined, label: undefined },
      ndaCondition: false,
      projectRules: false,
    },
  });

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
    option(base, props) {
      return {
        ...base,
        backgroundColor: props.isSelected ? '#e8f2ff' : 'white',
      };
    },
  };

  const submitHandler = async (data: ApplyForm) => {
    try {
      const res = await applyToProject(
        projectId.toString(),
        data.specialization.value!.toString(),
        token!,
      );
      console.log(res);
      handleCloseApplyPopUp();
      openSuccessApplyHandler();
    } catch (error) {
      console.log(error);
    }
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
          <RxCross1
            size={'20px'}
            className="cursor-pointer"
            onClick={handleCloseApplyPopUp}
          />
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
                components={{ DropdownIndicator, Option: CustomOption }}
                options={specializations}
                onChange={(selectedOption) => onChange(selectedOption)}
                onBlur={onBlur}
                value={specializations.find((s) => s.label === value!.label)}
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
              <label className="flex gap-1 items-center">
                <input
                  className="size-4"
                  type="checkbox"
                  {...register('projectRules', { required: true })}
                />
                <span className="flex gap-1">
                  <p>Погоджуюсь</p>
                  <a className="text-primary-blue" href="\public\rules.pdf">
                    з правилами участі у проєкті.
                  </a>
                </span>
              </label>
              {errors.projectRules && (
                <p className="text-sm text-red">Please agree to the terms</p>
              )}
            </div>
            <div className="flex flex-col">
              <label className="flex gap-1 items-center">
                <input
                  className="size-4"
                  type="checkbox"
                  {...register('ndaCondition', { required: true })}
                />
                <span className="flex gap-1">
                  <p>Погоджуюсь</p>
                  <a
                    className="text-primary-blue"
                    href="\public\privacy-policy.pdf"
                  >
                    з умовами NDA
                  </a>
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
