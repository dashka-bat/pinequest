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
          <div className=" font-extrabold text-xl mt-10">Удахгүй болох үйл явдлууд</div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg space-y-8">
          <section>
            <BirthdayCard2 />
          </section>

          <div className="flex flex-col">
            <section className="flex justify-between">
              <MiniEventCard
                title="game night"
                caption="Caption"
                date="2023-10-01"
                imageUrl="./Group 50.png"
                />
              <MiniEventCard
                title="Байгууллагын өдөрлөг"
                caption="Талархаж явдаг хүндээ захидал бичих өдөр"
                date="2023-10-15"
                imageUrl="/Group 50.png"
              />
             
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
