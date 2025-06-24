'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import AddEventCard from '../_components/add-event-dialog';
import { Event } from '../../../../mongodb/models/event';
import { format } from 'date-fns';

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/api/company/events');
        if (res.data.success) {
          setEvents(res.data.data.events);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [refresh]);

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Тэмдэглэлт өдрүүд</h2>
        <AddEventCard setRefresh={setRefresh} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200/10 rounded-md">
          <thead className="bg-gray-50/5">
            <tr className="text-left text-gray-600 text-sm font-medium">
              <th className="px-4 py-2 text-gray-400">№</th>
              <th className="px-4 py-2 text-gray-400">Нэр</th>
              <th className="px-4 py-2 text-gray-400">Тэмдэглэлт өдөр</th>
              <th className="px-4 py-2 text-gray-400">Огноо</th>
              <th className="px-4 py-2 text-gray-400">Утас</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-500">
                  Уншиж байна...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-sm text-red-500">
                  Алдаа гарлаа. Сүлжээг шалгана уу.
                </td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-400">
                  Тэмдэглэлт өдөр бүртгэгдээгүй байна.
                </td>
              </tr>
            ) : (
              events.map((event, index) => (
                <tr key={event._id} className="border-t text-sm">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{event.name}</td>
                  <td className="px-4 py-2">
                    {event.type === 'birthday' ? 'Төрсөн өдөр' : 'Компаны ой'}
                  </td>
                  <td className="px-4 py-2">
                    {event.date ? format(new Date(event.date), 'yyyy/MM/dd') : ''}
                  </td>

                  <td className="px-4 py-2">{event.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Events;
