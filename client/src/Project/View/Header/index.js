import { Pencil } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import IconButton from 'shared/components/IconButton';
import { useNavigate } from 'react-router-dom';

const propTypes = {
  project: PropTypes.shape({}).isRequired,
};

const ProjectHeader = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div
      className='rounded-3 text-white shadow position-relative p-4'
      style={{
        backgroundImage: 'linear-gradient(62deg, #A090F8 20%, #6EA4F9 79%)',
      }}
    >
      <h1>{project.name}</h1>
      <IconButton
        icon={<Pencil />}
        className='position-absolute top-0 end-0 m-2 bg-transparent border-0'
        onClick={() => navigate(`/project/edit/${project.id}`)}
      />
    </div>
  );
};

ProjectHeader.propTypes = propTypes;

export default ProjectHeader;
