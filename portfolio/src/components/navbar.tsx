"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import {
  User,
  Briefcase,
  FolderOpen,
  Code,
  MessageCircle,
  Menu,
  X,
  Home,
  Award,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      // Detect active section
      const sections = [
        "home",
        "about",
        "experience",
        "projects",
        "certificates",
        "skills",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("header")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const navItems = [
    { name: "Home", link: "#home", icon: <Home className="w-4 h-4 mr-1" /> },
    { name: "About", link: "#about", icon: <User className="w-4 h-4 mr-1" /> },
    {
      name: "Experience",
      link: "#experience",
      icon: <Briefcase className="w-4 h-4 mr-1" />,
    },
    {
      name: "Projects",
      link: "#projects",
      icon: <FolderOpen className="w-4 h-4 mr-1" />,
    },
    {
      name: "Certificates",
      link: "#certificates",
      icon: <Award className="w-4 h-4 mr-1" />,
    },
    {
      name: "Skills",
      link: "#skills",
      icon: <Code className="w-4 h-4 mr-1" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: <MessageCircle className="w-4 h-4 mr-1" />,
    },
  ];

  const handleNavClick = (link: string) => {
    const targetId = link.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const offset =
        targetId === "home" ? 0 : targetId === "contact" ? 50 : 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out navbar-entrance
          ${
            scrolled
              ? "w-[98%] sm:w-[95%] md:w-[80%] lg:w-[88%] xl:w-[85%] bg-slate-900/95 border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.3)] rounded-full backdrop-blur-xl py-2 sm:py-3"
              : "w-[98%] sm:w-full bg-slate-900/50 border-none shadow-none rounded-2xl sm:rounded-none py-3 sm:py-4 backdrop-blur-sm"
          }
          ${
            isOpen
              ? "md:bg-slate-900/95 md:border md:border-cyan-400/30 md:shadow-[0_0_15px_rgba(34,211,238,0.3)] md:rounded-full bg-transparent border-none shadow-none"
              : ""
          }`}
      >
        <div
          className={`container mx-auto flex items-center justify-between px-3 sm:px-4 ${
            scrolled ? "text-white" : "text-white"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#home")}
            className="flex items-center space-x-2 font-semibold text-white hover:text-cyan-400 transition-colors"
          >
            <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight">
              <span className="text-cyan-400 sm:hidden">FM</span>
              <span className="hidden sm:inline">
                Fredly <span className="text-cyan-400">Marvander</span>
              </span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.link.replace("#", "");
              return (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item.link)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm xl:text-base font-medium transition-all ${
                    isActive
                      ? "text-cyan-400 bg-cyan-400/10"
                      : "text-white hover:text-cyan-400 hover:bg-slate-800/50"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Tablet Navigation - Icon Only */}
          <nav className="hidden md:flex lg:hidden items-center gap-1 ">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.link.replace("#", "");
              return (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item.link)}
                  className={`flex items-center justify-center p-2.5 rounded-lg transition-all ${
                    isActive
                      ? "text-cyan-400 bg-cyan-400/10"
                      : "text-white hover:text-cyan-400 hover:bg-slate-800/50"
                  }`}
                  title={item.name}
                >
                  <span className="w-4 h-4">{item.icon}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-white hover:text-cyan-400 hover:bg-slate-800/50 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation */}
      <div
        className={`fixed top-16 left-1/2 -translate-x-1/2 w-[98%] md:hidden z-50 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-slate-900/98 backdrop-blur-md border border-cyan-400/30 rounded-2xl shadow-[0_0_15px_rgba(34,211,238,0.3)]">
          <nav className="flex flex-col p-4 space-y-1">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.link.replace("#", "");
              return (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item.link)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left transition-all ${
                    isActive
                      ? "text-cyan-400 bg-cyan-400/10 border-l-4 border-cyan-400"
                      : "text-white hover:text-cyan-400 hover:bg-slate-800/50 border-l-4 border-transparent"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
