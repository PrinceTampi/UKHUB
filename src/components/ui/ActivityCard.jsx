import PropTypes from 'prop-types';
import Card from './Card';
import { formatDate, formatDateTime } from '../../utils/helpers';
import { ACTIVITY_STATUS } from '../../utils/constants';
import { CalendarIcon, LocationIcon, UsersIcon } from '../icons';

/**
 * Activity Card Component
 * Menampilkan kegiatan organisasi
 */
const ActivityCard = ({ 
  activity, 
  onClick,
  showOrganization = true,
  className = '' 
}) => {
  const { 
    id, 
    title, 
    date, 
    time,
    status = 'upcoming',
    location,
    organization,
    type,
    description,
    registrationRequired = false
  } = activity;

  const statusConfig = {
    upcoming: {
      label: 'Akan Datang',
      className: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    },
    ongoing: {
      label: 'Berlangsung',
      className: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    },
    completed: {
      label: 'Selesai',
      className: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    },
    cancelled: {
      label: 'Dibatalkan',
      className: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    },
  };

  const typeConfig = {
    recruitment: { label: 'Recruitment', color: 'blue' },
    seminar: { label: 'Seminar', color: 'purple' },
    meeting: { label: 'Rapat', color: 'gray' },
    event: { label: 'Event', color: 'green' },
    workshop: { label: 'Workshop', color: 'orange' },
  };

  return (
    <Card 
      hover 
      onClick={onClick}
      className={`group ${className}`}
    >
      <Card.Body className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              {type && typeConfig[type] && (
                <span className={`px-3 py-1.5 bg-${typeConfig[type].color}-100 dark:bg-${typeConfig[type].color}-900 text-${typeConfig[type].color}-800 dark:text-${typeConfig[type].color}-200 rounded-lg text-xs font-medium`}>
                  {typeConfig[type].label}
                </span>
              )}
              {registrationRequired && (
                <span className="px-3 py-1.5 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-lg text-xs font-medium">
                  Daftar
                </span>
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-3">
              {title}
            </h3>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex items-center gap-1 shrink-0 ${statusConfig[status]?.className || statusConfig.upcoming.className}`}>
            {statusConfig[status]?.label || 'Akan Datang'}
          </span>
        </div>

        {/* Organization */}
        {showOrganization && organization && (
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Organisasi:</span> {organization}
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 leading-relaxed">
            {description}
          </p>
        )}

        {/* Details */}
        <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          {date && (
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <CalendarIcon className="w-5 h-5 text-gray-400 shrink-0" />
              <span>{time ? formatDateTime(`${date} ${time}`) : formatDate(date)}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <LocationIcon className="w-5 h-5 text-gray-400 shrink-0" />
              <span>{location}</span>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string,
    status: PropTypes.oneOf(Object.values(ACTIVITY_STATUS)),
    location: PropTypes.string,
    organization: PropTypes.string,
    type: PropTypes.oneOf(['recruitment', 'seminar', 'meeting', 'event', 'workshop']),
    description: PropTypes.string,
    registrationRequired: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func,
  showOrganization: PropTypes.bool,
  className: PropTypes.string,
};

export default ActivityCard;
