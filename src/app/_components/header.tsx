import Image from 'next/image';
import CurrentUser from './current-user';
import Link from 'next/link';

const Header = () => {
  return (
    <div className=" fixed top-0 left-0 w-full z-50 bg-white h-20 flex justify-between items-center p-4 px-24 shadow">
      <Link href={'/dashboard'}>
        {' '}
        <div>
          <Image src={'/Thankly.png'} alt="logo" width={70} height={47} />
        </div>
      </Link>

      <div className=" flex whitespace-nowrap items-center justify-center">
        <CurrentUser />
      </div>
    </div>
  );
};

export default Header;