import { ProgressBar } from 'react-bootstrap';

const ProjectProjectStatus = ({ project, className }) => (
  <div className={className}>
    <ProgressBar>
      <ProgressBar
        min={0}
        max={project.tasks.length}
        now={project.tasks.reduce(
          (acc, task) => (task.done ? acc + 1 : acc),
          0
        )}
        style={{
          backgroundImage: 'linear-gradient(62deg, #A090F8 20%, #6EA4F9 79%)',
        }}
      />
    </ProgressBar>
  </div>
);

export default ProjectProjectStatus;
