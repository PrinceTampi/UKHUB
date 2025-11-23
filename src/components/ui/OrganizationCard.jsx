import PropTypes from 'prop-types';
import Card from './Card';
import { ORGANIZATION_CATEGORIES } from '../../utils/constants';
import { OrganizationIcon, MailIcon, UsersIcon } from '../icons';

/**
 * Organization Card Component
 * Menampilkan informasi organisasi dalam format card
 */
const OrganizationCard = ({ 
  organization, 
  onClick,
  showStatus = true,
  className = '' 
}) => {
  const { 
    id, 
    name, 
    abbreviation, 
    category, 
    logo, 
    description, 
    status = 'active',
    pembina,
    contact 
  } = organization;

  const statusConfig = {
    active: {
      label: 'Aktif',
      className: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    },
    inactive: {
      label: 'Nonaktif',
      className: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    },
  };

  return (
    <Card 
      hover 
      onClick={onClick}
      className={`group ${className}`}
    >
      <Card.Body className="p-8">
        <div className="flex items-start gap-5">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all">
              {logo ? (
                <img 
                  src={logo} 
                  alt={name}
                  className="w-full h-full rounded-2xl object-cover"
                />
              ) : (
                <OrganizationIcon className="w-10 h-10" />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-1">
                  {name}
                </h3>
                {abbreviation && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-3">
                    {abbreviation}
                  </p>
                )}
              </div>
              {showStatus && (
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${statusConfig[status]?.className || statusConfig.active.className}`}>
                  {statusConfig[status]?.label || 'Aktif'}
                </span>
              )}
            </div>

            {/* Category Badge */}
            {category && (
              <span className="inline-block px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium mb-4">
                {category}
              </span>
            )}

            {/* Description */}
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 leading-relaxed">
                {description}
              </p>
            )}

            {/* Additional Info */}
            <div className="pt-5 border-t border-gray-200 dark:border-gray-700 space-y-3">
              {pembina && (
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <UsersIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{pembina}</span>
                </div>
              )}
              {contact?.email && (
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <MailIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{contact.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

OrganizationCard.propTypes = {
  organization: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    abbreviation: PropTypes.string,
    category: PropTypes.oneOf(ORGANIZATION_CATEGORIES),
    logo: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.oneOf(['active', 'inactive']),
    pembina: PropTypes.string,
    contact: PropTypes.shape({
      email: PropTypes.string,
      phone: PropTypes.string,
    }),
  }).isRequired,
  onClick: PropTypes.func,
  showStatus: PropTypes.bool,
  className: PropTypes.string,
};

export default OrganizationCard;
