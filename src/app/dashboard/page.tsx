import Dashboard from './_featured/dashboard';
import GratitudeTab from './_featured/gratitude';
import NewCard from './_featured/new-card';
import EventsTab from './_featured/events';
import Users from './_featured/users';

import Profile from './_featured/profile';

import Posts from './_featured/posts';

// import Profile from './_featured/profile';
// import { User } from 'lucide-react';

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
  ) : tab === 'user' ? (
    <Users />

  ) : tab==="profile" ? (
    <Profile/> 
  ) : tab==="posts" ? (
    <Posts/>
  ) :
  (

    <Dashboard />
    
  );
};

export default Main;
