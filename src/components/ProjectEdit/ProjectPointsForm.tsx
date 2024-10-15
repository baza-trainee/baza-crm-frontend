import { useFormContext } from 'react-hook-form';

const ProjectPointsForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-[412px] flex flex-col gap-5">
      <div className="bg-white rounded-[10px] px-8 py-2 border-card-border border justify-between flex items-center">
        <p className="font-bold font-lato">Бали за участь</p>
        <input
          className="text-center duration-500 border-b-2 outline-none w-52 focus:border-b-2 focus:border-b-primary-blue"
          placeholder="Вказати кількість балів"
          type="number"
          min={0}
          {...register('projectPoints', {
            required: "Кількість балів обов'язкова і є числом",
          })}
        />
      </div>
      <div className="h-5 px-8 -mt-5 -mb-3">
        {errors.projectPoints &&
          typeof errors.projectPoints.message === 'string' && (
            <span className="text-red">{errors.projectPoints.message}</span>
          )}
      </div>
    </div>
  );
};

export default ProjectPointsForm;
