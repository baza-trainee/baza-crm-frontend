type ProjectFormatProps = {
  projectType: string;
};

const ProjectFormat: React.FC<ProjectFormatProps> = ({ projectType }) => {
  return (
    <>
      {projectType === 'free' && (
        <div className="p-5 text-black w-96 bg-input-normal-state rounded-[10px]">
          <span className="text-primary-blue">FREE</span> format - внесок за
          участь в розробці проєкту відсутній.
        </div>
      )}
      {projectType === 'light' && (
        <div className="p-5 text-black w-96 bg-input-normal-state rounded-[10px]">
          <span className="text-primary-blue">LIGHT</span> format - внесок за
          участь в розробці проєкту складає 490 грн. Внесок треба буде внести на
          р/р після старту проєкту.
        </div>
      )}
      {projectType === 'strong' && (
        <div className="p-5 text-black border rounded-lg w-96 bg-input-normal-state border-input-normal">
          <span className="text-primary-blue">STRONG</span> format - внесок за
          участь в розробці проєкту складає 8000 грн. Внесок треба буде внести
          на р/р після старту проєкту.
        </div>
      )}
    </>
  );
};

export default ProjectFormat;
