'use client';
import { useEffect, useState } from 'react';

import BirthdayCard from '../_components/birthday-card';
import BirthdayCard2 from '../_components/birthday-card2';
import MiniEventCard from '../_components/mini-event-card';
import MiniEventCard2 from '../_components/mini-event-card2';
import Link from 'next/link';

type BirthdayData = {
  name: string;
  message: string;
  date?: string;
  phone?: string;
  imageUrl?: string;
};

type Event = {
  name: string;
  type: string;
  date: string;
  phone: string;
  imageUrl1?: string;
  imageUrl2?: string;
};

const Dashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [birthday, setBirthday] = useState<BirthdayData | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/company/events', {
          method: 'GET',
          credentials: 'include',
        });

        const contentType = res.headers.get('content-type');
        if (!res.ok || !contentType?.includes('application/json')) {
          const errorText = await res.text();
          console.error('API JSON биш:', errorText);
          return;
        }

        const json = await res.json();

        if (json.success && json.data?.events) {
          const companyEvents = json.data.events
            .filter((event: Event) => event.type !== 'birthday')
            .sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 2);

          setEvents(companyEvents);
          console.log('Company Events:', companyEvents);
        } else {
          console.error('Амжилтгүй хүсэлт:', json.message);
        }
      } catch (err) {
        console.error('Fetch алдаа:', err);
      }
    };

    const fetchBirthday = async () => {
      try {
        const res = await fetch('/api/birthday', {
          method: 'GET',
          credentials: 'include',
        });

        const contentType = res.headers.get('content-type');
        if (!res.ok || !contentType?.includes('application/json')) {
          const errorText = await res.text();
          console.error('Birthday API JSON биш:', errorText);
          return;
        }

        const data = await res.json();
        setBirthday(data);
        console.log('🎂 Birthday:', data);
      } catch (err) {
        console.error('Birthday fetch алдаа:', err);
      }
    };

    fetchEvents();
    fetchBirthday();
  }, []);

  return (
    <div className="flex flex-col gap-10 px-40 pt-10">
      <div className="flex flex-col gap-4">
        <div className="font-extrabold text-xl">Өнөөдөр</div>

        <div className="flex flex-col gap-4">

          <Link href={"/dashboard?tab=posts"}><section>
            {birthday ? (
              <BirthdayCard birthday={birthday} />
            ) : (
              <p className="text-sm text-gray-500">Төрсөн өдрийн мэдээлэл ачааллаж байна...</p>
            )}
          </section></Link>


          <div className="font-extrabold text-xl mt-10">Удахгүй болох үйл явдлууд</div>
        </div>

        <div className="bg-gray-50 p-6 rounded-3xl space-y-6">
          <section>
            <BirthdayCard2 />
          </section>

          <div className="flex flex-col">
            <section className="flex justify-center items-center gap-8 rounded-lg">
              {events.length >= 1 && (
                <MiniEventCard
                  title={events[0].name}
                  caption={events[0].type}
                  date={new Date(events[0].date).toLocaleDateString('mn-MN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  weekday={new Date(events[0].date).toLocaleDateString('mn-MN', {
                    weekday: 'long',
                  })}
                  imageUrl={events[0].imageUrl1 || '/key.png'}
                />
              )}

              {events.length >= 2 && (
                <MiniEventCard2
                  title={events[1].name}
                  caption={events[1].type}
                  date={new Date(events[1].date).toLocaleDateString('mn-MN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  weekday={new Date(events[1].date).toLocaleDateString('mn-MN', {
                    weekday: 'long',
                  })}
                  imageUrl1={events[1].imageUrl1 || '/Vector 1.png'}
                  imageUrl2={events[1].imageUrl2 || '/img2.png'}
                />
              )}

              {events.length === 0 && (
                <p className="text-[#27296D] text-sm">Компанийн үйл явдал олдсонгүй</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
