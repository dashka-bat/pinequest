import BirthdayCard from '../_components/birthday-card';
import BirthdayCard2 from '../_components/birthday-card2';

const Dashboard = () => {
  return (
    <div className=" flex flex-col gap-20">
      <div className=" flex flex-col gap-2">
        <div className=" font-extrabold text-xl">Өнөөдөр</div>
        <div className=" flex flex-col gap-4">
          <section>
            <BirthdayCard />
          </section>
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        <div className=" font-extrabold text-xl">Удахгүй болох үйл явдлууд</div>
        <div className=" flex flex-col gap-4">
          <section>
            <BirthdayCard2 />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
