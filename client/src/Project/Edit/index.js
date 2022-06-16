import { useStores } from 'shared/store';
import { observer } from 'mobx-react-lite';
import { useMatch } from 'react-router-dom';
import ProjectEditor from 'shared/components/ProjectEditor';
import { useMemo } from 'react';

const ProjectEdit = () => {
  const match = useMatch('/project/edit/:projectId');
  const stores = useStores();

  const project = useMemo(() => {
    return stores.projects.allProjects.find(
      (project) => project.id === Number(match?.params?.projectId)
    );
  }, [stores.projects.allProjects, match]);

  const projectDelete = (projectId) => {
    stores.projects.projectDelete(projectId, { redirectUrl: '/project' });
  };

  const projectPatch = (projectId, params) => {
    stores.projects.projectPatch(projectId, params, {
      redirectUrl: `/project/view/${projectId}`,
    });
  };

  if (stores.projects.projectsFetched === false) {
    return <>Loading</>;
  }

  if (!project) {
    return <>Project not found | 404</>;
  }

  return (
    <div className='d-flex flex-column align-items-center'>
      <div>
        <h1>Edit project</h1>
        <ProjectEditor
          initialValues={{
            name: project.name,
            abbreviation: project.abbreviation,
          }}
          hasDeleteOption
          onDelete={() => projectDelete(project.id)}
          onSubmit={(params) => projectPatch(project.id, params)}
        />
      </div>
    </div>
  );
};

export default observer(ProjectEdit);
