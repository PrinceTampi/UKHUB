import PropTypes from 'prop-types';
import Card from './Card';
import { BuildingIcon, LocationIcon, UsersIcon, ClockIcon } from '../icons';

/**
 * Room Card Component
 * Menampilkan informasi ruangan organisasi
 */
const RoomCard = ({ 
  room, 
  onClick,
  showOrganization = false,
  className = '' 
}) => {
  const { 
    id, 
    name, 
    building, 
    location, 
    facilities = [], 
    accessHours,
    capacity,
    organization,
    status = 'available'
  } = room;

  const statusConfig = {
    available: {
      label: 'Tersedia',
      className: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    },
    occupied: {
      label: 'Terpakai',
      className: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    },
    maintenance: {
      label: 'Maintenance',
      className: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    },
  };

  return (
    <Card 
      hover 
      onClick={onClick}
      className={`group ${className}`}
    >
      <Card.Body className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <BuildingIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                {name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                <BuildingIcon className="w-4 h-4" />
                <span>{building}</span>
              </div>
              {location && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <LocationIcon className="w-4 h-4" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${statusConfig[status]?.className || statusConfig.available.className}`}>
            {statusConfig[status]?.label || 'Tersedia'}
          </span>
        </div>

        {/* Organization Info */}
        {showOrganization && organization && (
          <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Organisasi:</span> {organization}
            </p>
          </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {capacity && (
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <UsersIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span>{capacity} orang</span>
            </div>
          )}
          {accessHours && (
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <ClockIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <span>{accessHours}</span>
            </div>
          )}
        </div>

        {/* Facilities */}
        {facilities.length > 0 && (
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">Fasilitas</p>
            <div className="flex flex-wrap gap-2">
              {facilities.slice(0, 4).map((facility, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium"
                >
                  {facility}
                </span>
              ))}
              {facilities.length > 4 && (
                <span className="px-3 py-1.5 text-gray-500 dark:text-gray-400 text-xs">
                  +{facilities.length - 4} lainnya
                </span>
              )}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

RoomCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    building: PropTypes.string.isRequired,
    location: PropTypes.string,
    facilities: PropTypes.arrayOf(PropTypes.string),
    accessHours: PropTypes.string,
    capacity: PropTypes.number,
    organization: PropTypes.string,
    status: PropTypes.oneOf(['available', 'occupied', 'maintenance']),
  }).isRequired,
  onClick: PropTypes.func,
  showOrganization: PropTypes.bool,
  className: PropTypes.string,
};

export default RoomCard;
