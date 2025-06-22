import Image from 'next/image';
import CurrentUser from './current-user';

const Header = () => {
  return (
    <div className=" h-20 flex justify-between items-center p-4 px-24">
      <div>
        <Image src={`/logo.png`} alt="logo" width={70} height={47} />
      </div>
      <div className=" flex whitespace-nowrap items-center justify-center">
        <Image src={`/notification.png`} alt="notification" width={60} height={60} />
        {/* <Image src={`/placeholder-pfp.png`} alt="pfp" width={40} height={40} /> */}
        <CurrentUser />
      </div>
    </div>
  );
};

export default Header;
