import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';
import ProjectEditor from 'shared/components/ProjectEditor';

const ProjectCreate = () => {
  const stores = useStores();

  const projectCreate = ({ name, abbreviation }) => {
    stores.projects.projectPost(
      { name, abbreviation },
      { redirectUrl: '/project/view' }
    );
  };

  return (
    <div className='d-flex justify-content-center'>
      <div>
        <h1>Create new project</h1>
        <ProjectEditor onSubmit={projectCreate} />
      </div>
    </div>
  );
};

export default observer(ProjectCreate);
