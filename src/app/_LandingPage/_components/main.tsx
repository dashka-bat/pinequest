"use client";
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ClickSpark from './Effect';
import Image from 'next/image';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Main() {
  const pentagonRef = useRef<SVGSVGElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(pentagonRef.current, 
        { 
          x: -800, 
          y: -400, 
          rotation: 0,
          scale: 0.3,
          opacity: 0 
        },
        { 
          x: 0, 
          y: 0, 
          rotation: 90,
          scale: 1,
          opacity: 1,
          duration: 1.5, 
          ease: "power3.out" 
        }
      )
      .fromTo(triangleRef.current,
        {
          x: 400,
          y: -500,
          rotation: 0,
          scale: 0.3,
          opacity: 0
        },
        {
          x: 0,
          y: 0,
          rotation: 75,
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out"
        },
        "-=1.2"
      )
      .fromTo(starRef.current,
        {
          x: -600,
          y: 300,
          rotation: 0,
          scale: 0.3,
          opacity: 0
        },
        {
          x: 0,
          y: 0,
          rotation: 45,
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out"
        },
        "-=1.2"
      )
      .fromTo(circleRef.current,
        {
          x: 500,
          y: 500,
          scale: 0.3,
          opacity: 0
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out"
        },
        "-=1.2"
      );

      gsap.fromTo(heroContentRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "power2.out"
        }
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(pentagonRef.current, {
            x: -400,
            y: -200,
            scale: 0.3,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut"
          });
          
          gsap.to(triangleRef.current, {
            x: 200,
            y: -300,
            scale: 0.3,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut"
          });
          
          gsap.to(starRef.current, {
            x: -300,
            y: 200,
            scale: 0.3,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut"
          });
          
          gsap.to(circleRef.current, {
            x: 300,
            y: 300,
            scale: 0.3,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut"
          });
        },
        onLeave: () => {
        },
        onEnterBack: () => {
        },
        onLeaveBack: () => {
          gsap.to(pentagonRef.current, {
            x: 0,
            y: 0,
            rotation: 90,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
          });
          
          gsap.to(triangleRef.current, {
            x: 0,
            y: 0,
            rotation: 75,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
          });
          
          gsap.to(starRef.current, {
            x: 0,
            y: 0,
            rotation: 45,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
          });
          
          gsap.to(circleRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
          });
        }
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          if (sectionRef.current) {
            gsap.fromTo(sectionRef.current.children,
              {
                y: 60,
                opacity: 0
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
              }
            );
          }
        }
      });

      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 80%",
        onEnter: () => {
          if (footerRef.current) {
            gsap.fromTo(footerRef.current.querySelector('h1'),
              {
                y: 40,
                opacity: 0
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
              }
            );
          }
          
          if (footerRef.current) {
            gsap.fromTo(footerRef.current.querySelectorAll('.person-card'),
              {
                y: 60,
                opacity: 0,
                scale: 0.9
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                delay: 0.3,
                ease: "power2.out"
              }
            );
          }
        }
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <ClickSpark
        sparkColor="#000000"
        sparkSize={12}
        sparkRadius={50}
        sparkCount={10}
        duration={400}
      >
        <motion.div 
          className="flex relative items-center justify-between h-[66px] bg-white text-white"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="p-2">
            <Image src={'/miniLogo.png'} width={68} height={48} alt="logo" />
          </div>
        </motion.div>
        
        <div className="w-full h-[700px] relative flex items-center justify-center">
          <svg
            ref={pentagonRef}
            viewBox="0 0 100 100"
            className="absolute w-[600px] h-[600px] -top-6 drop-shadow-2xl right-[1400px] fill-yellow-300 rotate-90"
          >
            <polygon points="50,10 90,35 73,85 27,85 10,35" />
          </svg>
          
          <div 
            ref={triangleRef}
            className="-top-10 -right-[50px] absolute w-0 h-0 drop-shadow-2xl border-l-[200px] border-l-transparent border-r-[200px] border-r-transparent border-b-[400px] rotate-75 border-b-red-500" 
          />
          
          <div 
            ref={starRef}
            className="absolute right-[1400px] top-[500px] w-[600px] h-[600px] rotate-45 flex justify-center drop-shadow-2xl items-center"
          >
            <svg viewBox="0 0 24 24" className="w-[600px] h-[600px] fill-pink-400">
              <path d="M12 2l2.9 6.9L22 9.8l-5 5.2 1.2 7L12 18.3 5.8 22 7 15l-5-5.2 7.1-1L12 2z" />
            </svg>
          </div>
          
          <div 
            ref={circleRef}
            className="absolute top-[450px] left-[1400px] drop-shadow-2xl w-[500px] h-[500px] bg-green-500 rounded-full" 
          />
          
          <div ref={heroContentRef} className="flex flex-col items-center text-center space-y-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="rounded-2xl border" variant="secondary">
                <Sparkles className="mr-2" />
                Талархал
              </Button>
            </motion.div>
            
            <motion.h1 
              className="font-semibold text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Талархал бичье
            </motion.h1>
            
            <motion.h2 
              className="text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Нэгэндээ урам өгөөрэй
            </motion.h2>
            
            <motion.div 
              className="flex gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Link href="/auth/signin">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="bg-white border border-gray-600 shadow-2xl  text-black hover:bg-gray-100 text-xl w-[201px] h-[46px] rounded-3xl">
                    Нэвтрэх
                  </button>
                </motion.div>
              </Link>
              <Link href="/auth/signup">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="text-xl w-[201px] h-[46px] rounded-3xl">Бүртгүүлэх</Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
        
        <section ref={sectionRef} className="flex items-center justify-around gap-10 px-10 py-10  mt-[700px] mb-[300px] ">
          <div className="w-[660px]">
            <h1 className="font-semibold text-[64px] leading-[72px]">Таны хүссэн загвар</h1>
            <p className="mt-4 text-2xl">
              Өөрийн хүссэн загварыг гарган талархал илгээх боломжтой, мөн GIF, видео бичлэг, зураг,
              мессеж нэмээрэй.
            </p>
          </div>
          <div className="relative w-[300px] h-[200px]">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                className="absolute z-10 rounded-2xl shadow-2xl right-[300px]"
                src="/Template3.svg"
                width={300}
                height={200}
                alt="Template 1"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                className="absolute z-20 rounded-2xl shadow-2xl -top-[135px] right-[130px]"
                src="/Template2.svg"
                width={300}
                height={200}
                alt="Template 2"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                className="absolute z-30 rounded-2xl shadow-2xl -top-[30px] left-4"
                src="/Template1.svg"
                width={300}
                height={200}
                alt="Template 3"
              />
            </motion.div>
          </div>
        </section>
        
        <footer ref={footerRef} className="mt-[100px] mb-[200px]">
          <h1 className="text-[64px] flex justify-center font-semibold">Талархалын самбар</h1>
          <div className="flex flex-wrap justify-center mt-[126px] gap-20 ">
            <motion.div 
              className="person-card relative w-[400px] flex justify-end"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
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
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <div className="text-sm text-gray-600"> Энхтөр </div>
                </div>
                Амжилт өшөө илүү хичээгээрэй
              </motion.div>
            </motion.div>

            <motion.div 
              className="person-card relative w-[400px] flex justify-center"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
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
                Өдрийг сайхан өнгөрүүлээрэй
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
              transition={{ type: "spring", stiffness: 300 }}
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
                  scale: [1, 1.1, 1]
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
                Өдрийг сайхан өнгөрүүлээрэй
              </motion.div>
            </motion.div>
          </div>
        </footer>
      </ClickSpark>
    </div>
  );
}