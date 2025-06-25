import BirthdayCard from '../_components/birthday-card';
import BirthdayCard2 from '../_components/birthday-card2';
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
            <BirthdayCard2 />
          </section>
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        <div className=" font-extrabold text-xl">Удахгүй болох үйл явдлууд</div>
        <div className=" flex flex-col gap-4">
          <section>
            <BirthdayCard />
          </section>
          <section className=" flex justify-between gap-7">
            <MiniEventCard
              title="game night"
              caption="Caption"
              date="2025 06 13"
              imageUrl="https://res.cloudinary.com/dxkgrtted/image/upload/v1750845146/GameNight_s81lsw.png"
            />
            <MiniEventCard
              title="Garchig"
              caption="Caption"
              date="2025 07 23"
              imageUrl="/envelope.png"
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
