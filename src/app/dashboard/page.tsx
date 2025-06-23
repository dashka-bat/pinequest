import Dashboard from './_featured/dashboard';
import GratitudeTab from './_featured/gratitude';
import NewCard from './_featured/new-card';
import UpcomingTab from './_featured/upcoming';

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
  ) : tab === 'upcoming' ? (
    <UpcomingTab />
  ) : (
    <Dashboard />
  );
};

export default Main;
