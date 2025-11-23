import PropTypes from 'prop-types';

const Card = ({ children, className = '', hover = false, onClick, ...props }) => {
  const baseStyles = 'bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700';
  const hoverStyles = hover ? 'transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer' : '';
  
  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Header = ({ children, className = '' }) => (
  <div className={`p-6 border-b border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

Card.Body = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

Card.Footer = ({ children, className = '' }) => (
  <div className={`p-6 border-t border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
  onClick: PropTypes.func,
};

Card.Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.Body.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.Footer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
