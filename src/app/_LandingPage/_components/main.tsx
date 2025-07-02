'use client';

import React, { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ClickSpark from './Effect';
import Image from 'next/image';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const cards = [
  { id: 'A', src: '/Template1.svg' },
  { id: 'B', src: '/Template2.svg' },
  { id: 'C', src: '/Template3.svg' },
  { id: 'D', src: '/Template4.svg' },
];

const CARD_WIDTH = 364;
const CARD_SPACING = 40;
const TOTAL_WIDTH = CARD_WIDTH + CARD_SPACING;

export default function Main() {
  const card1 = useRef<HTMLDivElement>(null);
  const card2 = useRef<HTMLDivElement>(null);
  const card3 = useRef<HTMLDivElement>(null);
  const card4 = useRef<HTMLDivElement>(null);
  const card5 = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        card1.current,
        {
          x: -800,
          y: -400,
          rotation: 0,
          scale: 0.3,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          rotation: -10,
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
        }
      )
        .fromTo(
          card2.current,
          {
            x: 400,
            y: -500,
            rotation: 0,
            scale: 0.3,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            rotation: 45,
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
          },
          '-=1.2'
        )
        .fromTo(
          card3.current,
          {
            x: -600,
            y: 300,
            rotation: 0,
            scale: 0.3,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            rotation: -30,
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
          },
          '-=1.2'
        )
        .fromTo(
          card4.current,
          {
            x: 500,
            y: 500,
            scale: 0.3,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
          },
          '-=1.2'
        )
        .fromTo(
          card5.current,
          {
            x: 500,
            y: -500,
            rotation: 0,
            scale: 0.3,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            rotation: -15,
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
          },
          '-=1.2'
        );

      gsap.fromTo(
        heroContentRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: 'power2.out',
        }
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          gsap.to([card1.current, card2.current, card3.current, card4.current], {
            x: (i) => (i % 2 === 0 ? -400 : 200),
            y: (i) => (i % 2 === 0 ? -200 : -300),
            scale: 0.3,
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
          });
        },
        onLeaveBack: () => {
          gsap.to(card1.current, {
            x: 0,
            y: 0,
            rotation: -10,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
          });
          gsap.to(card2.current, {
            x: 0,
            y: 0,
            rotation: 30,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
          });
          gsap.to(card3.current, {
            x: 0,
            y: 0,
            rotation: -15,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
          });
          gsap.to(card4.current, {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
          });
          gsap.to(card5.current, {
            x: 0,
            y: 0,
            rotation: -15,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const extendedCards = [...cards, ...cards]; // for infinite loop

  const x = useMotionValue(0);

  useEffect(() => {
    const pauseTime = 2; // seconds pause on each card
    const slideTime = 0.8; // seconds sliding time
    const totalCards = cards.length;

    // keyframes for sliding: positions for each card step (including loop)
    const keyframes = [];
    for (let i = 0; i <= totalCards; i++) {
      keyframes.push(-i * TOTAL_WIDTH);
    }

    const totalDuration = totalCards * (pauseTime + slideTime);

    const controls = animate(x, keyframes, {
      duration: totalDuration,
      ease: 'easeInOut',
      times: keyframes.map((_, i) => i / keyframes.length),
      repeat: Infinity,
    });

    return () => controls.stop();
  }, [x]);

  return (
    <div className="w-full">
      <ClickSpark sparkColor="#000" sparkSize={12} sparkRadius={50} sparkCount={10} duration={400}>
        <div className="flex justify-between w-[80%] items-center mx-auto mb-[50px]">
          <motion.div
            className="flex relative items-center justify-between h-[66px]"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="p-2">
              <Image src="/miniLogo.png" width={68} height={48} alt="logo" />
            </div>
          </motion.div>

          <motion.div
            className="flex gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Link href="/auth/signin">
              <button className="bg-white text-black text-[16px] w-[91px] h-[36px]">Нэвтрэх</button>
            </Link>
            <Link href="/auth/signup">
              <button className="text-[16px] w-[110px] h-[36px] rounded-3xl bg-[#FD8E8E] text-white">
                Бүртгүүлэх
              </button>
            </Link>
          </motion.div>
        </div>

        <div className="w-full h-[700px] relative flex items-center justify-center">
          <div
            ref={card1}
            style={{ transform: 'translate(400px, -500px) scale(0.3)', opacity: 0 }}
            className="absolute left-[100px] top-[370px] w-[267px] h-[177px] rotate-45"
          >
            <Image src="/Template1.svg" alt="template1" width={267} height={177} />
          </div>

          <div
            ref={card2}
            style={{ transform: 'translate(400px, -500px) scale(0.3)', opacity: 0 }}
            className="absolute right-[240px] top-[1px] w-[267px] h-[177px] rotate-45"
          >
            <Image src="/Template2.svg" alt="template1" width={267} height={177} />
          </div>

          <div
            ref={card3}
            style={{ transform: 'translate(-600px, 300px) rotate(0deg) scale(0.3)', opacity: 0 }}
            className="absolute left-[179px] top-[57px] w-[267px] h-[177px] rotate-45"
          >
            <Image src="/Template3.svg" alt="template1" width={267} height={177} />
          </div>

          <div
            ref={card4}
            style={{ transform: 'translate(500px, 500px) scale(0.3)', opacity: 0 }}
            className="absolute top-[270px] right-[72px] w-[267px] h-[177px]"
          >
            <Image src="/Template4.svg" alt="template1" width={267} height={177} />
          </div>

          <div
            ref={card5}
            style={{ transform: 'translate(500px, -500px) scale(0.3)', opacity: 0 }}
            className="absolute right-[564px] top-[500px] w-[267px] h-[177px] rotate-45"
          >
            <Image src="/Template5.svg" alt="template5" width={267} height={177} />
          </div>

          <div ref={heroContentRef} className="flex flex-col items-center text-center space-y-6">
            <Button className="rounded-2xl border" variant="secondary">
              <Sparkles className="mr-2" /> Талархал
            </Button>
            <h1 className="font-semibold text-7xl">Талархал бичье</h1>
            <h2 className="text-lg">Нэгэндээ урам өгөөрэй</h2>
          </div>
        </div>

        <section
          ref={sectionRef}
          className="flex items-center justify-around gap-10 px-10 py-10  mt-[200px] mb-[300px] flex-col bg-[#EEF7FD] h-screen"
        >
          <div className="w-[83%] ">
            <h1 className="font-semibold text-[36px] leading-[72px]">Таны хүссэн загвар</h1>
            <p className="mt-4 text-[20px] w-[580px]">
              Өөрийн хүссэн загварыг гарган талархал илгээх боломжтой, мөн GIF, видео бичлэг, зураг,
              мессеж нэмээрэй.
            </p>
          </div>
          <div className="overflow-hidden w-full flex justify-center items-center">
            <div className="w-full">
              <ClickSpark
                sparkColor="#000"
                sparkSize={12}
                sparkRadius={50}
                sparkCount={10}
                duration={400}
              >
                <section
                  ref={sectionRef}
                  className="flex items-center justify-around gap-10 px-10 py-10 mt-[200px] mb-[300px] flex-col bg-[#EEF7FD] h-screen"
                >
                  <div className="overflow-hidden w-full flex justify-center items-center">
                    <div className="overflow-hidden w-[calc(3*364px+2*40px)] mx-auto">
                      <motion.div
                        className="flex"
                        style={{
                          x,
                          gap: `${CARD_SPACING}px`,
                        }}
                      >
                        {extendedCards.map((card, i) => {
                          const cardCenter = i * TOTAL_WIDTH + CARD_WIDTH / 2;
                          const viewCenter = TOTAL_WIDTH * 1.5;
                          const distanceFromCenter = useTransform(x, (latestX) => {
                            return Math.abs(cardCenter + latestX - viewCenter);
                          });
                          const scale = useTransform(
                            distanceFromCenter,
                            [0, TOTAL_WIDTH],
                            [1, 0.85],
                            { clamp: true }
                          );

                          return (
                            <motion.div
                              key={`${card.id}-${i}`}
                              style={{
                                flex: '0 0 auto',
                                width: `${CARD_WIDTH}px`,
                                height: '320px',
                                scale,
                                borderRadius: '12px',
                                overflow: 'hidden',
                                userSelect: 'none',
                                backgroundColor: 'white',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                              }}
                            >
                              <div>
                              {card.id === 'A' && (
                                  <div className="flex flex-col items-center gap-2 pt-4">
                                    <div className="text-[20px] text-[#000000] font-semibold">
                                    Бэлэн загварууд
                                    </div>
                                    <div className="relative h-[280px] w-[100%] ">
                                      <Image
                                        src="/Template1.svg"
                                        alt="chuluu"
                                        width={139}
                                        height={221}
                                        className="w-[139px] h-[221px] absolute left-[40px] top-10"
                                      />
                                      <Image
                                        src="/Template3.svg"
                                        alt="chuluu"
                                        width={139}
                                        height={221}
                                        className="w-[139px] h-[221px] absolute right-[110px] -top-[10px]"
                                      />
                                      <Image
                                        src="/Template4.svg"
                                        alt="chuluu"
                                        width={139}
                                        height={221}
                                        className="w-[139px] h-[221px] absolute right-[40px] top-10"
                                      />
                                    </div>
                                  </div>
                                )}
                                {card.id === 'B' && (
                                  <div className="flex flex-col items-center gap-5 pt-4">
                                    <div className="text-[20px] text-[#000000] font-semibold">
                                      Карт
                                    </div>
                                    <div className="relative h-[250px] w-[100%] ">
                                      <Image
                                        src="/aaaa.png"
                                        alt="chuluu"
                                        width={194}
                                        height={241}
                                        className="w-[194px] h-[241px] absolute left-[80px] top-[20px]"
                                      />
                                       <div className="relative w-40 h-40">
  <motion.div
    initial={{ rotate: -8 }}
    animate={{ rotate: [-8, -10, -8] }}
    transition={{ repeat: Infinity, duration: 3 }}
    className="
      absolute bottom-4 left-4
      w-24 h-24
      bg-[url('/puujin.png')] bg-cover bg-no-repeat
      rounded-xl
      border-2 border-white
      shadow-lg
    "
  />
</div>
                                       <Image
                                        src="/zurh.png"
                                        alt="chuluu"
                                        width={80}
                                        height={80}
                                        className="w-[80px] h-[80px] absolute right-[25px] bottom-4"
                                      />
                                      <Image
                                        src="/choice.png"
                                        alt="chuluu"
                                        width={163}
                                        height={66}
                                        className="w-[163px] h-[66px] absolute right-[80px] -top-4"
                                      />
                                    </div>
                                  </div>
                                )}
                                {card.id === 'C' && (
                                  <div className="flex flex-col items-center gap-5 pt-4">
                                    <div className="text-[20px] text-[#000000] font-semibold">
                                      Зураг болон бичлэг
                                    </div>
                                    <div className="relative h-[250px] w-[100%] ">
                                      <Image
                                        src="/chuluu.png"
                                        alt="chuluu"
                                        width={139}
                                        height={221}
                                        className="w-[139px] h-[221px] absolute left-[80px] top-4"
                                      />
                                      <Image
                                        src="/Container.png"
                                        alt="chuluu"
                                        width={139}
                                        height={221}
                                        className="w-[139px] h-[221px] absolute right-[80px] top-0"
                                      />
                                    </div>
                                  </div>
                                )}
                                {card.id === 'D' && (
                                  <div className="flex flex-col items-center gap-5 pt-4">
                                    <div className="text-[20px] text-[#000000] font-semibold">
                                    Бэлэн загварууд
                                    </div>
                                    <div className="relative h-[250px] w-[100%] ">
                                      <Image
                                        src="/note.png"
                                        alt="chuluu"
                                        width={139}
                                        height={120}
                                        className="w-[139px] h-[180px] absolute left-[40px] top-6"
                                      />
                                      <Image
                                        src="/noote.png"
                                        alt="chuluu"
                                        width={139}
                                        height={120}
                                        className="w-[139px] h-[180px] absolute right-[40px] top-6"
                                      />
                                      <Image
                                        src="/zuragta.png"
                                        alt="chuluu"
                                        width={139}
                                        height={221}
                                        className="w-[139px] h-[221px] absolute right-[110px] top-0"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    </div>
                  </div>
                </section>
              </ClickSpark>
            </div>
          </div>
        </section>

        <footer ref={footerRef} className="mt-[100px] mb-[200px]">
          <h1 className="text-[64px] flex justify-center font-semibold">Талархалын самбар</h1>
          <div className="flex flex-wrap justify-center mt-[126px] gap-20 ">
            <motion.div
              className="person-card relative w-[400px] flex justify-end"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="/person1.jpg"
                width={303}
                height={261}
                alt="person"
                className="object-cover rounded-[8px]"
              />
              <motion.div
                className="absolute text-[64px] -top-[40px] -right-[30px]"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                👏🏻
              </motion.div>
              <motion.div
                className="absolute -bottom-[30px] right-[70px] border border-gray inline-flex flex-col items-start gap-2 p-2.5 px-5 rounded-lg bg-white shadow-[4px_4px_6px_0_rgba(0,0,0,0.12)]"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="/pro1.png" />
                  </Avatar>
                  <div className="text-sm text-gray-600">Болор-эрдэнэ</div>
                </div>
                Чиний амжилт бидний бахархал 🙌🏻
              </motion.div>
            </motion.div>

            <motion.div
              className="person-card relative w-[400px] flex justify-center"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="/person2.jpg"
                width={303}
                height={261}
                alt="person"
                className=" object-cover rounded-[8px]"
              />
              <motion.div
                className=" absolute -top-[40px] -right-[1px] border-black inline-flex flex-col items-start gap-2 p-2.5 px-5 rounded-lg bg-white shadow-[4px_4px_6px_0_rgba(0,0,0,0.12)]"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <div className="text-sm text-gray-600"> Дариа </div>
                </div>
                Чамд баярлалаа, чи үнэхээр гайхалтай шүү🎈
              </motion.div>
              <motion.div
                className="absolute text-[64px] -bottom-[30px] left-[20px]"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              >
                🎉
              </motion.div>
            </motion.div>

            <motion.div
              className="person-card relative w-[400px] flex justify-start"
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src="/person3.jpg"
                width={303}
                height={261}
                alt="person"
                className="object-cover rounded-[8px]"
              />
              <motion.div
                className="absolute text-[64px] -top-[40px] -left-[30px] "
                animate={{
                  rotate: [-45, -35, -55, -45],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
              >
                🏆
              </motion.div>
              <motion.div
                className="absolute -bottom-[30px] left-[70px] inline-flex flex-col items-start gap-2 p-2.5 px-5 rounded-lg bg-white shadow-[4px_4px_6px_0_rgba(0,0,0,0.12)]"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <p className="text-sm text-gray-600"> Энхтөр </p>
                </div>
                Өдрийг сайхан өнгөрүүлээрэй 🙋🏻‍♀️
              </motion.div>
            </motion.div>
          </div>
        </footer>
      </ClickSpark>
    </div>
  );
}
