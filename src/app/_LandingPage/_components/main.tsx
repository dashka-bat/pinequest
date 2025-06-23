import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ClickSpark from './Effect';

export default function Main() {
  return (
    <div>
      <ClickSpark
        sparkColor="#000000"
        sparkSize={12}
        sparkRadius={50}
        sparkCount={10}
        duration={400}
      >
        <div className="bg-gray-700 w-full h-[700px] flex items-center justify-center">
          <div className="flex flex-col items-center text-center space-y-6">
            <Button className="rounded-2xl" variant="outline">
              <Sparkles className="mr-2" />
              Талархал
            </Button>
            <h1 className="font-semibold text-5xl">Талархал бичье</h1>
            <h2 className="text-lg">Нэгэндээ урам өгөөрэй</h2>
            <div className="flex gap-4 mt-4">
              <Link href="/auth/signin">
                <Button className="bg-white text-black hover:bg-gray-100 text-xl w-[201px] h-[46px] rounded-3xl">
                  Нэвтрэх
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="text-xl w-[201px] h-[46px] rounded-3xl">Бүртгүүлэх</Button>
              </Link>
            </div>
          </div>
        </div>
        <section className="bg-red-200 w-full h-screen  "></section>
      </ClickSpark>
    </div>
  );
}
