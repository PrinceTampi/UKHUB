import { useEffect, useState } from 'react';
import {
  fetchOrganizations,
  subscribeToOrganizationChanges,
} from '../services/organizationService';
import {
  getAll as getAllRooms,
  subscribeToRoomChanges,
} from '../services/roomService';
import {
  getAll as getAllAnnouncements,
  subscribeToAnnouncementChanges,
} from '../services/announcementService';
import {
  getAll as getAllActivities,
  subscribeToActivityChanges,
} from '../services/activityService';
import {
  getAll as getAllContacts,
  subscribeToContactChanges,
} from '../services/contactService';

const defaultStats = {
  organizations: 0,
  rooms: 0,
  announcements: 0,
  activities: 0,
  contacts: 0,
};

const useDashboardStats = () => {
  const [stats, setStats] = useState(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      try {
        const [orgs, rooms, announcements, activities, contacts] = await Promise.all([
          fetchOrganizations(),
          getAllRooms(),
          getAllAnnouncements(),
          getAllActivities(),
          getAllContacts(),
        ]);

        if (active) {
          setStats({
            organizations: orgs.length,
            rooms: rooms.length,
            announcements: announcements.length,
            activities: activities.length,
            contacts: contacts.length,
          });
        }
      } catch {
        if (active) {
          setStats(defaultStats);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();

    const unsubscribers = [
      subscribeToOrganizationChanges((snapshot) => {
        if (active) {
          setStats((prev) => ({ ...prev, organizations: snapshot.length }));
        }
      }),
      subscribeToRoomChanges((snapshot) => {
        if (active) {
          setStats((prev) => ({ ...prev, rooms: snapshot.length }));
        }
      }),
      subscribeToAnnouncementChanges((snapshot) => {
        if (active) {
          setStats((prev) => ({ ...prev, announcements: snapshot.length }));
        }
      }),
      subscribeToActivityChanges((snapshot) => {
        if (active) {
          setStats((prev) => ({ ...prev, activities: snapshot.length }));
        }
      }),
      subscribeToContactChanges((snapshot) => {
        if (active) {
          setStats((prev) => ({ ...prev, contacts: snapshot.length }));
        }
      }),
    ];

    return () => {
      active = false;
      unsubscribers.forEach((unsubscribe) => unsubscribe && unsubscribe());
    };
  }, []);

  return { stats, loading };
};

export default useDashboardStats;

