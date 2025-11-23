import PropTypes from 'prop-types';
import Card from './Card';
import { formatDate } from '../../utils/helpers';
import { ANNOUNCEMENT_CATEGORIES } from '../../utils/constants';

/**
 * Announcement Card Component
 * Menampilkan pengumuman dari WR3 & Kemahasiswaan
 */
const AnnouncementCard = ({ 
  announcement, 
  onClick,
  showCategory = true,
  className = '' 
}) => {
  const { 
    id, 
    title, 
    category, 
    date, 
    author,
    isUrgent = false,
    excerpt,
    organization
  } = announcement;

  const categoryColors = {
    'Pengumuman': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    'Event': 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    'Informasi': 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    'Penting': 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
  };

  return (
    <Card 
      hover 
      onClick={onClick}
      className={`group ${isUrgent ? 'ring-2 ring-red-500 dark:ring-red-400' : ''} ${className}`}
    >
      <Card.Body>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {isUrgent && (
                <span className="px-2 py-0.5 bg-red-500 text-white rounded text-xs font-bold animate-pulse">
                  URGENT
                </span>
              )}
              {showCategory && category && (
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[category] || categoryColors['Informasi']}`}>
                  {category}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {title}
            </h3>
          </div>
        </div>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {excerpt}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {author && (
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{author}</span>
              </div>
            )}
            {organization && (
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>{organization}</span>
              </div>
            )}
          </div>
          {date && (
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(date)}</span>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

AnnouncementCard.propTypes = {
  announcement: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.oneOf(ANNOUNCEMENT_CATEGORIES),
    date: PropTypes.string.isRequired,
    author: PropTypes.string,
    isUrgent: PropTypes.bool,
    excerpt: PropTypes.string,
    organization: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  showCategory: PropTypes.bool,
  className: PropTypes.string,
};

export default AnnouncementCard;

