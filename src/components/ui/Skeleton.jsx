import PropTypes from 'prop-types';

const Skeleton = ({ className = '', variant = 'text' }) => {
  const baseStyles = 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded';
  
  const variants = {
    text: 'h-4',
    title: 'h-6',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-48',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} />
  );
};

Skeleton.Card = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4">
    <Skeleton variant="avatar" className="mb-3" />
    <Skeleton variant="title" className="mb-2 w-3/4" />
    <Skeleton variant="text" className="mb-1 w-full" />
    <Skeleton variant="text" className="w-5/6" />
  </div>
);

Skeleton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['text', 'title', 'avatar', 'card']),
};

export default Skeleton;

