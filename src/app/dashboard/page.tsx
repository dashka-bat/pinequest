import Dashboard from './_featured/dashboard';
import GratitudeTab from './_featured/gratitude';
import NewCard from './_featured/new-card';
import EventsTab from './_featured/events';

type MainProps = {
  searchParams: Promise<{
    tab?: string;
  }>;
};

const Main = async ({ searchParams }: MainProps) => {
  const { tab } = await searchParams;

  return tab === 'new-card' ? (
    <NewCard />
  ) : tab === 'gratitude' ? (
    <GratitudeTab />
  ) : tab === 'events' ? (
    <EventsTab />
  ) : (
    <Dashboard />
  );
};

export default Main;
