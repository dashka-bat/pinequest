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

  const columns = ['№', 'Нэр', 'Тэмдэглэлт өдөр', 'Огноо', 'Утас'];

  return (
    <div className="p-4 md:p-8 ">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Тэмдэглэлт өдрүүд</h2>
        <AddEventCard setRefresh={setRefresh} />
      </div>
      <div className=" rounded-[20px] shadow-sm overflow-hidden text-sm bg-gray-50 p-[10px]">
        <div className="grid grid-cols-5  text-gray-400 font-normal px-4 py-3 border-b border-gray-100 rounded-[8px] bg-white ">
          {columns.map((col, idx) => (
            <div key={idx}>{col}</div>
          ))}
        </div><div className='bg-white w-auto h-auto rounded-lg mt-[10px]'>
        {loading ? (
          <div className="text-center text-gray-400 py-6">Уншиж байна...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-6">Алдаа гарлаа. Сүлжээг шалгана уу.</div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-400 py-6">Тэмдэглэлт өдөр бүртгэгдээгүй байна.</div>
        ) : (
          events.map((event, index) => (

            <div
              key={event._id}
              className="grid grid-cols-5 px-4 py-3 border-t border-gray-100 text-gray-900 "
            >
              <div>{index + 1}</div>
              <div>{event.name || '⏳'}</div>
              <div>
                {{
                  birthday: 'Төрсөн өдөр',
                  company: 'Компаны ой',
                  naadam: 'Наадам',
                  humanitarian: 'Хүмүүнлэгийн өдөр',
                  youth: 'Залуучуудын өдөр',
                  psychology: 'Сэтгэл зүйн өдөр',
                }[event.type] || event.type || '⏳'}
              </div>
              <div>{event.date ? format(new Date(event.date), 'M-р сарын d') : ''}</div>
              <div>{event.phone || ''}</div>
            </div>

          ))
        )}</div>
      </div>
    </div>
  );
};

export default Events;
