import { useParams } from 'react-router-dom';

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Project ID: {id}</h1>
    </div>
  );
};

export default ProjectPage;
