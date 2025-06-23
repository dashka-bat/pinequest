import BirthdayCard from '../_components/birthday-card';
import MiniEventCard from '../_components/mini-event-card';

const Dashboard = () => {
  return (
    <div className=" flex flex-col gap-20">
      <div className=" flex flex-col gap-2">
        <div className=" font-extrabold text-xl">Өнөөдөр</div>
        <div className=" flex flex-col gap-4">
          <section>
            <BirthdayCard />
          </section>
          <section>
            <BirthdayCard />
          </section>
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        <div className=" font-extrabold text-xl">Удахгүй болох үйл явдлууд</div>
        <div className=" flex flex-col gap-4">
          <section>
            <BirthdayCard />
          </section>
          <section className=" flex justify-between">
            <MiniEventCard
              title="Garchig"
              caption="Caption"
              date="2025 06 23"
              imageUrl="/envelope.png"
            />
            <MiniEventCard
              title="Garchig"
              caption="Caption"
              date="2025 06 23"
              imageUrl="/envelope.png"
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
