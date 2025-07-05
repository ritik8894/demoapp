"use client";
import { useState, useEffect } from "react";
import { Command, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';


const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  let { theme, resolvedTheme } = useTheme();
  theme = mounted ? (theme === "light" || (theme === "system" && resolvedTheme === "light")) ? "light" : "dark" : "light";
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'testimonials') {
      const testimonialSection = document.querySelector('.animate-marquee');
      if (testimonialSection) {
        const yOffset = -100;
        const y = testimonialSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else if (sectionId === 'cta') {
      const ctaSection = document.querySelector('.button-gradient');
      if (ctaSection) {
        const yOffset = -100;
        const y = ctaSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { name: "Features", href: "#features", onClick: () => scrollToSection('features') },
    { name: "Prices", href: "#pricing", onClick: () => scrollToSection('pricing') },
    { name: "Testimonials", href: "#testimonials", onClick: () => scrollToSection('testimonials') },
  ];

  return (
    <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&display=swap');

      .font-space {
        font-family: 'Space Grotesk', sans-serif;
      }

      @keyframes gradient-bg {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .animate-gradient-bg {
        background: linear-gradient(270deg, #00C853, #2979FF, #AA00FF);
        background-size: 300% 300%;
        animation: gradient-bg 5s ease infinite;
      }

      .gradient-glow {
        box-shadow: 0 0 15px rgba(0, 200, 83, 0.5),
                    0 0 15px rgba(41, 121, 255, 0.4),
                    0 0 10px rgba(170, 0, 255, 0.3);
      }
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&display=swap');

      .font-space {
        font-family: 'Space Grotesk', sans-serif;
      }

      @keyframes gradient-bg {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .animate-gradient-bg {
        background: linear-gradient(270deg, #00C853, #2979FF, #AA00FF);
        background-size: 300% 300%;
        animation: gradient-bg 10s ease infinite;
      }

      .gradient-glow {
        box-shadow: 0 0 15px rgba(0, 200, 83, 0.5),
                    0 0 15px rgba(41, 121, 255, 0.4),
                    0 0 10px rgba(170, 0, 255, 0.3);
      }

      @property --border-angle {
        syntax: '<angle>';
        inherits: false;
        initial-value: 0deg;
      }

      @keyframes border-rotate {
        to {
          --border-angle: 360deg;
        }
      }

      .animate-rotate-border {
        animation: border-rotate 10s linear infinite;
      }

      .border-gradient {
        background: conic-gradient(
          from var(--border-angle),
          #000 0deg,
          #22c55e 120deg,
          #000 240deg,
          #22c55e 360deg
        );
      }
    `}</style>
    <div
      className={`fixed top-4.5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl border-5px rounded-full p-px animate-rotate-border border-gradient ${
        isScrolled ? 'scale-95 w-[90%] max-w-2xl' : ''
      }`}
    >
      <header
        className={`h-14 w-full rounded-full transition-all duration-300 px-2 backdrop-blur-3xl bg-[#000000]}`}
      >
        <div className="mx-auto h-full px-6">
          <nav className="flex items-center justify-between h-full">
            <div className="flex items-center gap-2">
              <Command className="text-white w-5 h-5" />
              <span className={`font-bold text-base text-white`}>CryptoTrade</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.onClick) item.onClick();
                  }}
                  className={`text-base font-semibold tracking-wide transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:bg-clip-text hover:text-transparent text-white`}
                >
                  {item.name}
                </a>
              ))}
              <Button
                radius="full"
                variant="shadow"
                isLoading={isPending}
                className="px-6 py-2 rounded-full font-semibold text-white text-base tracking-wide shadow-lg animate-gradient-bg gradient-glow font-space"
                onPress={() => {
                  // scrollToSection('cta');
                  startTransition(() => {
                    router.push('/authenticate?type=sign-up&redirect_url=/dashboard');
                  });
                }}
              >
                Dashboard
              </Button>
            </div>

            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="bordered" className="glass">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className={'bg-white'}>
                  <div className="flex flex-col gap-4 mt-8">
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`text-lg hover:text-foreground transition-colors text-black`}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsMobileMenuOpen(false);
                          if (item.onClick) item.onClick();
                        }}
                      >
                        {item.name}
                      </a>
                    ))}
                    <Button
                      radius="full"
                      variant="shadow"
                      isLoading={isPending}
                      className="px-6 py-2 rounded-full font-semibold text-white text-base tracking-wide shadow-lg animate-gradient-bg gradient-glow font-space"
                      onPress={() => {
                        // setIsMobileMenuOpen(false);
                        startTransition(() => {
                          router.push('/authenticate?type=sign-up&redirect_url=/dashboard');
                        });
                        // scrollToSection('cta');
                      }}
                    >
                      DashBoard
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </nav>
        </div>
      </header>
    </div>
    </>
  );
};

export default Navigation;

