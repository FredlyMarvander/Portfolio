"use client";

import Certificate from "@/components/certificate";
import Navbar from "@/components/navbar";
import { Experience, Project, Skill } from "@/type";
import {
  Brain,
  GraduationCap,
  Laptop,
  Linkedin,
  MapPin,
  Target,
} from "lucide-react";
import Image from "next/image";
import { cache, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [openToWork, setOpenToWork] = useState(false);
  const [sentence, setSentence] = useState("");

  const getAbout = async () => {
    try {
      const data = await fetch("/api/about");
      const json = await data.json();
      setOpenToWork(json[0].openToWork);
      setSentence(json[0].sentence);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      message,
    };

    try {
      setLoading(true);
      const response = await fetch("/api/nodemailer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message || "Something went wrong!",
          background: "#0f172a", // slate-900
          color: "#ffffff",
          confirmButtonColor: "#22d3ee", // cyan-400
          confirmButtonText: "Try Again",
          iconColor: "#ef4444", // red-500
          customClass: {
            popup: "rounded-xl border border-red-500/30",
            title: "text-white font-bold",
            htmlContainer: "text-gray-300",
          },
        });

        return;
      }

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for reaching out. I'll get back to you soon!",
        background: "#0f172a", // slate-900
        color: "#ffffff",
        confirmButtonColor: "#22d3ee", // cyan-400
        confirmButtonText: "Great!",
        iconColor: "#22d3ee", // cyan-400
        timerProgressBar: true,
        customClass: {
          popup:
            "rounded-xl border border-cyan-400/30 shadow-[0_0_25px_rgba(34,211,238,0.3)]",
          title: "text-cyan-400 font-bold",
          htmlContainer: "text-gray-300",
          confirmButton:
            "bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-semibold px-6 py-2.5 rounded-lg transition-all",
          timerProgressBar: "bg-cyan-400",
        },
      });

      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      const response = await fetch("/api/experience");
      const data = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };

  const getProjects = async () => {
    try {
      const response = await fetch("/api/project");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const getSkills = async () => {
    try {
      const response = await fetch("/api/skill");
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    getData();
    getProjects();
    getSkills();
    getAbout();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0");
            entry.target.classList.add("animate-fadeInUp");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".opacity-0");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="flex flex-col items-center justify-center min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-slate-900"
        id="home"
      >
        <div className="w-full max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white opacity-0 animate-fadeInUp delay-100">
            Hi, I'm <span className="text-cyan-400">Fredly Marvander.</span>
          </h2>
          <h3 className="text-2xl sm:text-3xl mt-5 mb-5 text-gray-400 font-bold opacity-0 animate-fadeInUp delay-200">
            Software Developer
          </h3>
          <p className="text-base sm:text-lg text-white opacity-0 animate-fadeInUp delay-300">
            I love building meaningful web experiences and helping others grow
            through technology. From designing clean interfaces to writing
            efficient backend logic, I'm always ready to build, learn, and
            share.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-7 opacity-0 animate-fadeInUp delay-400">
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-500 transition-all flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail-icon lucide-mail inline mr-2"
              >
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
              Email Me
            </a>
            <a
              href="https://ik.imagekit.io/gjxojqzr6/CV%20Fredly%20Marvander.pdf?updatedAt=1759679612281"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg border border-cyan-400 text-cyan-400 font-semibold hover:text-white hover:bg-cyan-500/20 shadow-[0_0_15px_#22d3ee] transition-all flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-user-icon lucide-file-user inline mr-2"
              >
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M15 18a3 3 0 1 0-6 0" />
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
                <circle cx="12" cy="13" r="2" />
              </svg>
              View CV
            </a>
          </div>
        </div>
      </div>
      <div
        className="h-full min-w-screen bg-slate-800 flex items-center justify-center px-4 sm:px-6 lg:px-8"
        id="about"
      >
        <div className="w-full max-w-4xl mx-auto h-full py-12 sm:py-16 lg:py-20 opacity-0 animate-fadeInUp delay-100">
          <div className="group relative inline-block cursor-pointer mb-8">
            <h1 className="text-white font-bold text-2xl mb-5 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user-icon lucide-user inline mr-3 text-cyan-400 bg-slate-900 rounded-lg w-10 h-10 p-2"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              About Me
            </h1>
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-cyan-400 rounded-full transition-all duration-300 group-hover:w-43"></span>
          </div>

          {/* Point 1 - Education */}
          <div className="group/item mb-6 p-4 sm:p-5 bg-slate-900 hover:bg-slate-900/50 rounded-xl border border-transparent hover:border-cyan-400/30 transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="p-2.5 bg-cyan-400/10 rounded-lg group-hover:item:bg-cyan-400/20 transition-colors flex-shrink-0">
                <GraduationCap className="text-cyan-400 w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white mb-2 group-hover:item:text-cyan-400 transition-colors">
                  IT Undergraduate
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Currently studying{" "}
                  <span className="text-cyan-400 font-semibold">
                    Information Technology
                  </span>{" "}
                  at
                  <span className="text-white font-medium">
                    {" "}
                    Universitas Internasional Batam (UIB)
                  </span>{" "}
                  while building real-world software development experience.
                </p>
              </div>
            </div>
          </div>

          {/* Point 2 - Bootcamp */}
          <div className="group/item mb-6 p-4 sm:p-5 bg-slate-900 hover:bg-slate-900/50 rounded-xl border border-transparent hover:border-cyan-400/30 transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="p-2.5 bg-cyan-400/10 rounded-lg group-hover:item:bg-cyan-400/20 transition-colors flex-shrink-0">
                <Laptop className="text-cyan-400 w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white mb-2 group-hover:item:text-cyan-400 transition-colors">
                  Intensive Training (Hacktiv8)
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                  Graduate of{" "}
                  <span className="text-cyan-400 font-semibold">
                    Full-Stack JavaScript Bootcamp
                  </span>
                  . Hands-on experience with modern tech stack in real-world
                  collaborative projects.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "Node.js",
                    "Express",
                    "REST API",
                    "JWT",
                    "Git",
                  ].map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-cyan-400/10 text-cyan-400 text-xs font-medium rounded-md border border-cyan-400/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Point 3 - Working Style */}
          <div className="group/item mb-6 p-4 sm:p-5 bg-slate-900 hover:bg-slate-900/50 rounded-xl border border-transparent hover:border-cyan-400/30 transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="p-2.5 bg-cyan-400/10 rounded-lg group-hover:item:bg-cyan-400/20 transition-colors flex-shrink-0">
                <Brain className="text-cyan-400 w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white mb-2 group-hover:item:text-cyan-400 transition-colors">
                  Working Style & Mindset
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                  Balance rigor with{" "}
                  <span className="text-cyan-400 font-semibold">
                    real-world delivery
                  </span>{" "}
                  — ship reliable features, communicate clearly, adapt fast, and
                  keep learning.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Continuous Improver",
                    "Fast Learner",
                    "Team Collaborator",
                    "Agile Mindset",
                  ].map((trait, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-gray-400"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-cyan-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{trait}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Point 4 - Career Objectives */}
          <div className="group/item mb-6 p-4 sm:p-5 bg-slate-900 hover:bg-slate-900/50 rounded-xl border border-transparent hover:border-cyan-400/30 transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="p-2.5 bg-cyan-400/10 rounded-lg group-hover:item:bg-cyan-400/20 transition-colors flex-shrink-0">
                <Target className="text-cyan-400 w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white mb-2 group-hover:item:text-cyan-400 transition-colors">
                  Career Objectives
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Contribute as a{" "}
                  <span className="text-cyan-400 font-semibold">
                    Full-Stack Developer
                  </span>{" "}
                  on user-centric, high-impact products while growing
                  technically and professionally.
                </p>
              </div>
            </div>
          </div>

          {/* Point 5 - Availability */}
          <div
            className={`group/item mb-6 p-4 sm:p-5 rounded-xl border transition-all duration-300 ${
              openToWork
                ? "bg-gradient-to-r from-cyan-400/10 to-transparent border-cyan-400/40 hover:border-cyan-400"
                : "bg-slate-900 hover:bg-slate-900/50 border-transparent hover:border-cyan-400/30"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div
                className={`p-2.5 rounded-lg transition-colors flex-shrink-0 ${
                  openToWork
                    ? "bg-cyan-400/20 group-hover/item:bg-cyan-400/30"
                    : "bg-cyan-400/10 group-hover/item:bg-cyan-400/20"
                }`}
              >
                <MapPin className="text-cyan-400 w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white mb-2 group-hover:item:text-cyan-400 transition-colors">
                  Availability & Location
                </h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Remote only or on-site in Batam (no relocation at this time).
                </p>
                {openToWork && (
                  <div className="mt-3 p-3 bg-cyan-400/5 rounded-lg border border-cyan-400/30">
                    <p className="text-xs text-cyan-400 font-semibold flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {sentence}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="h-full min-w-screen bg-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8"
        id="experience"
      >
        <div className="w-full max-w-4xl mx-auto h-full py-12 sm:py-16 lg:py-20 opacity-0 animate-fadeInUp delay-100">
          <div className="group relative inline-block cursor-pointer">
            <h1 className="text-white font-bold text-2xl mb-5 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user-icon lucide-user inline mr-3 text-cyan-400 bg-slate-900 rounded-lg w-10 h-10 p-2"
              >
                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                <rect width="20" height="14" x="2" y="6" rx="2" />
              </svg>
              Experience
            </h1>
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-cyan-400 rounded-full transition-all duration-300 group-hover:w-48"></span>
          </div>
          <div className="group w-full border-2 flex flex-col sm:flex-row border-cyan-400 mt-6 rounded-lg hover:scale-[1.02] hover:shadow-[0_0_15px_#22d3ee] transition-all overflow-hidden">
            <Image
              src="/image.png"
              alt="Experience"
              width={200}
              height={300}
              className="filter grayscale group-hover:grayscale-0 transition-all duration-300 w-full sm:w-auto h-18 sm:h-55 object-cover"
            />
            <div className="p-4 sm:ml-4 sm:mt-3 flex-1 flex flex-col ">
              <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-2 sm:gap-0">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Frontend Developer Intern
                  </h2>
                  <p className="text-md text-gray-400 mt-1">ClickBooth</p>
                </div>

                <h3 className="text-cyan-400 text-lg flex items-center whitespace-nowrap">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-briefcase-icon lucide-briefcase text-cyan-400 inline mr-2 text-md"
                  >
                    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    <rect width={20} height={14} x={2} y={6} rx={2} />
                  </svg>
                  2025-2025
                </h3>
              </div>
              <p className="text-sm sm:text-base text-white mt-4">
                Contributed to building responsive web interfaces using modern
                frontend technologies. Collaborated with design and backend
                teams to deliver user-friendly features.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="h-full min-w-screen bg-slate-800 flex items-center justify-center px-4 sm:px-6 lg:px-8"
        id="projects"
      >
        <div className="w-full max-w-6xl mx-auto h-full py-12 sm:py-16 lg:py-20 opacity-0 animate-fadeInUp delay-100">
          <div className="group relative inline-block cursor-pointer">
            <h1 className="text-white font-bold text-2xl mb-5 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-folder-kanban-icon lucide-folder-kanban inline mr-3 text-cyan-400 bg-slate-900 rounded-lg w-10 h-10 p-2"
              >
                <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                <path d="M8 10v4" />
                <path d="M12 10v2" />
                <path d="M16 10v6" />
              </svg>
              Projects
            </h1>
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-cyan-400 rounded-full transition-all duration-300 group-hover:w-39"></span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group w-full border-1 border-cyan-400 rounded-lg hover:scale-[1.02] hover:shadow-[0_0_15px_#22d3ee] transition-all bg-slate-900 flex flex-col h-[500px]"
              >
                <img
                  src={project.image}
                  alt="Project 1"
                  className="w-full rounded-t-lg object-cover h-48 hover:scale-105 transition-all duration-300 flex-shrink-0"
                />
                <div className="p-4 flex flex-col flex-1 overflow-hidden">
                  <h3 className="text-lg font-bold text-white mb-2 flex-shrink-0">
                    {project.title}
                  </h3>
                  <p className="text-md text-gray-300 mb-4 line-clamp-3 flex-shrink-0">
                    {project.description}
                  </p>

                  <div className="flex-1 mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.map((perSkill, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-700 w-fit px-2 py-1 rounded-full flex justify-center items-center"
                        >
                          <p className="text-xs text-cyan-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-chevrons-left-right-icon lucide-chevrons-left-right inline mr-1 w-4 h-4"
                            >
                              <path d="m9 7-5 5 5 5" />
                              <path d="m15 7 5 5-5 5" />
                            </svg>
                            {perSkill}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-600 flex-shrink-0">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:bg-cyan-400/20 py-1 font-semibold rounded transition-all"
                    >
                      View Project
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right inline ml-2 text-cyan-400 w-4 h-4"
                      >
                        <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                        <path d="m21 3-9 9" />
                        <path d="M15 3h6v6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Certificate />

      <div
        className="h-full min-w-screen bg-slate-800 flex items-center justify-center px-4 sm:px-6 lg:px-8"
        id="skills"
      >
        <div className="w-full max-w-6xl mx-auto h-full py-12 sm:py-16 lg:py-20 opacity-0 animate-fadeInUp delay-100">
          <div className="group relative inline-block cursor-pointer mb-8">
            <h1 className="text-white font-bold text-2xl mb-5 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-cpu-icon lucide-cpu inline mr-3 text-cyan-400 bg-slate-900 rounded-lg w-10 h-10 p-2"
              >
                <path d="M12 20v2" />
                <path d="M12 2v2" />
                <path d="M17 20v2" />
                <path d="M17 2v2" />
                <path d="M2 12h2" />
                <path d="M2 17h2" />
                <path d="M2 7h2" />
                <path d="M20 12h2" />
                <path d="M20 17h2" />
                <path d="M20 7h2" />
                <path d="M7 20v2" />
                <path d="M7 2v2" />
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="8" y="8" width="8" height="8" rx="1" />
              </svg>
              Skills & Technologies
            </h1>
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-cyan-400 rounded-full transition-all duration-300 group-hover:w-78"></span>
          </div>

          {/* Skills Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const itemsPerColumn = 5;
              const leftItems = skill.items.slice(0, itemsPerColumn);
              const rightItems = skill.items.slice(itemsPerColumn);
              const hasMultipleColumns = skill.items.length > itemsPerColumn;

              // Icon variants for different categories
              const getIconPath = (idx: number) => {
                const iconIndex = idx % 3;
                if (iconIndex === 0) {
                  return <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />; // Code icon
                } else if (iconIndex === 1) {
                  return (
                    <>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2v20M2 12h20" />
                    </>
                  ); // Globe
                } else {
                  return (
                    <>
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </>
                  ); // Monitor
                }
              };

              return (
                <div
                  key={index}
                  className="group/card bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-cyan-400/30 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b border-cyan-400/20">
                    <div className="p-2 bg-cyan-400/10 rounded-lg group-hover/card:bg-cyan-400/20 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-cyan-400"
                      >
                        {getIconPath(index)}
                      </svg>
                    </div>
                    <h2 className="text-lg font-bold text-white group-hover/card:text-cyan-400 transition-colors">
                      {skill.title}
                    </h2>
                  </div>

                  {hasMultipleColumns ? (
                    <div className="grid grid-cols-2 gap-4">
                      <ul className="space-y-2.5">
                        {leftItems.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-gray-300 group/item hover:text-cyan-400 transition-colors"
                          >
                            <svg
                              className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <ul className="space-y-2.5">
                        {rightItems.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-gray-300 group/item hover:text-cyan-400 transition-colors"
                          >
                            <svg
                              className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <ul className="space-y-2.5">
                      {skill.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm text-gray-300 group/item hover:text-cyan-400 transition-colors"
                        >
                          <svg
                            className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className="h-full min-w-screen bg-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8"
        id="posts"
      >
        <div className="w-full max-w-4xl mx-auto h-full py-12 sm:py-16 lg:py-20 opacity-0 animate-fadeInUp delay-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 sm:gap-0">
            <div className="group relative inline-block cursor-pointer">
              <h1 className="text-white font-bold text-2xl mb-5 flex items-center">
                <Linkedin className="inline mr-3 text-cyan-400 bg-slate-900 rounded-lg w-10 h-10 p-2" />
                Recent Posts
              </h1>
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-cyan-400 rounded-full transition-all duration-300 group-hover:w-53"></span>
            </div>
            <a
              href="#"
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2 transition-all"
            >
              See All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                <path d="m21 3-9 9" />
                <path d="M15 3h6v6" />
              </svg>
            </a>
          </div>

          {/* Posts Grid */}
          <div className="space-y-6">
            {/* Post 1 */}
            <div className="group/post bg-slate-900 p-4 sm:p-6 rounded-xl border border-cyan-400/30 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] transition-all duration-300">
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-400 rounded-full flex items-center justify-center text-slate-900 font-bold flex-shrink-0 text-sm sm:text-base">
                  PK
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg group-hover/post:text-cyan-400 transition-colors">
                    Priambodo Kurniawan
                  </h3>
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    2w
                  </p>
                </div>
              </div>

              <h4 className="text-white font-semibold mb-3 flex items-center gap-2 text-sm sm:text-base">
                ✨ Langsung kejadian...
              </h4>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                Kemarin 10 April, saya berdiri di depan dua grup yang baru saja
                menyelesaikan final project terakhir mereka. 🎓{" "}
                <span className="text-cyan-400 font-semibold">
                  Graduation day
                </span>{" "}
                — momen yang selalu penuh emosi. Ada rasa bangga, harapan, dan
                puas melihat hasil perjuangan mereka.
              </p>

              <div className="mb-4 rounded-lg overflow-hidden">
                <img
                  src="https://media.licdn.com/dms/image/v2/D5622AQEHVkqBKnIrYw/feedshare-shrink_800/B56ZPzoLqC8IAg-/0/1744615506664?e=1747872000&v=beta&t=g_pBkQ3-VCJiC3S-v5WRr5J9bQm7SYV7QXg7UDyN3Ew"
                  alt="Graduation"
                  className="w-full h-auto object-cover group-hover/post:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-700 gap-4 sm:gap-0">
                <div className="flex items-center gap-4 sm:gap-6 text-gray-400 text-xs sm:text-sm">
                  <span className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 10v12" />
                      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                    </svg>
                    27
                  </span>
                  <span className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                    </svg>
                    2
                  </span>
                  <span className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="17 1 21 5 17 9" />
                      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                      <polyline points="7 23 3 19 7 15" />
                      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                    </svg>
                    1
                  </span>
                </div>
                <a
                  href="#"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold text-xs sm:text-sm transition-all"
                >
                  View Post
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline ml-1"
                  >
                    <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                    <path d="m21 3-9 9" />
                    <path d="M15 3h6v6" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Post 2 */}
            <div className="group/post bg-slate-900 p-4 sm:p-6 rounded-xl border border-cyan-400/30 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] transition-all duration-300">
              <div className="flex items-start gap-3 sm:gap-4 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-400 rounded-full flex items-center justify-center text-slate-900 font-bold flex-shrink-0 text-sm sm:text-base">
                  PK
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg group-hover/post:text-cyan-400 transition-colors">
                    Priambodo Kurniawan
                  </h3>
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    3mo
                  </p>
                </div>
              </div>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                Congratulations on this incredible achievement Yotam Putra &
                teams! 🎉 Your hard work and dedication truly paid off, and
                Pawtopia is a great example of your creativity and technical
                skills.
              </p>

              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Proud to see you ready to tackle the next chapter in your
                career—keep shining and inspiring! 🚀
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-700 mt-4 gap-4 sm:gap-0">
                <div className="flex items-center gap-4 sm:gap-6 text-gray-400 text-xs sm:text-sm">
                  <span className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 10v12" />
                      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                    </svg>
                    20
                  </span>
                  <span className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                    </svg>
                    0
                  </span>
                  <span className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="17 1 21 5 17 9" />
                      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                      <polyline points="7 23 3 19 7 15" />
                      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                    </svg>
                    1
                  </span>
                </div>
                <a
                  href="#"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold text-xs sm:text-sm transition-all"
                >
                  View Post
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline ml-1"
                  >
                    <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                    <path d="m21 3-9 9" />
                    <path d="M15 3h6v6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="h-full min-w-screen bg-slate-800 flex items-center justify-center px-4 sm:px-6 lg:px-8"
        id="contact"
      >
        <div className="w-full max-w-3xl mx-auto h-full py-12 sm:py-16 lg:py-20 opacity-0 animate-fadeInUp delay-100">
          <div className="group relative inline-block cursor-pointer">
            <h1 className="text-white font-bold text-2xl mb-5 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-square-icon lucide-message-square inline mr-2 text-cyan-400 bg-slate-900 rounded-lg w-11 h-11 p-2"
              >
                <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
              </svg>
              Let's Connect
            </h1>
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-cyan-400 rounded-full transition-all duration-300 group-hover:w-56"></span>
          </div>
          <p className="text-sm sm:text-base text-white mt-6 max-w-3xl">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision. Feel free to reach out
            using the form below or connect with me on social media.
          </p>
          <div className="mt-6 w-full flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-cyan-400 focus:border-cyan-400"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-cyan-400 focus:border-cyan-400"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <textarea
                    id="message"
                    rows={6}
                    className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-cyan-400 focus:border-cyan-400 resize-none"
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-cyan-400 text-slate-900 font-semibold rounded-md hover:bg-cyan-500 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-cyan-400"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-900"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="m22 2-7 20-4-9-9-4Z" />
                        <path d="M22 2 11 13" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
            <div className="flex-1 space-y-6">
              <div className="bg-slate-900 border border-gray-600 rounded-md py-5 px-5">
                <h1 className="text-white font-bold text-base sm:text-lg">
                  Connect with me
                </h1>
                {/* Social Media Icons */}
                <div className="flex gap-4 mt-4">
                  <a
                    href="https://github.com/FredlyMarvander?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={23}
                      height={23}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-cyan-400"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/fredly-marvander-1883a2372"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={23}
                      height={23}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-cyan-400"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width={4} height={12} x={2} y={9} />
                      <circle cx={4} cy={4} r={2} />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/fredly_fm?igsh=cjZ5Nno2dXBlNmV5&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={23}
                      height={23}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-cyan-400"
                    >
                      <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="bg-slate-900 border border-gray-600 rounded-md py-5 px-5">
                <h1 className="text-white font-bold text-base sm:text-lg">
                  Email
                </h1>
                <a
                  href="mailto:fredlymarvander@example.com"
                  className="text-cyan-400 hover:text-cyan-300 transition-all mt-3 block text-sm sm:text-base break-all"
                >
                  fredly210307@gmail.com
                </a>
              </div>
              <div className="bg-slate-900 border border-gray-600 rounded-md py-5 px-5">
                <h1 className="text-white font-bold text-base sm:text-lg">
                  Based in
                </h1>
                <p className="text-white mt-3 text-sm sm:text-base">
                  Batam, Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full py-6 sm:py-8 bg-slate-900 text-gray-400 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 w-full max-w-7xl mx-auto">
          <div className="flex items-center text-center sm:text-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-globe-icon lucide-globe inline mr-2 text-cyan-400 w-4 h-4"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            <p className="inline text-xs sm:text-sm">
              &copy; 2025 Fredly Marvander. All rights reserved.
            </p>
          </div>
          <div className="flex gap-3 sm:gap-4">
            <a
              href="https://github.com/FredlyMarvander?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github-icon lucide-github hover:cursor-pointer hover:text-cyan-400 transition-all w-6 h-6"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/fredly-marvander-1883a2372"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin-icon lucide-linkedin hover:cursor-pointer hover:text-cyan-400 transition-all w-6 h-6"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width={4} height={12} x={2} y={9} />
                <circle cx={4} cy={4} r={2} />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/fredly_fm?igsh=cjZ5Nno2dXBlNmV5&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram-icon lucide-instagram hover:cursor-pointer hover:text-cyan-400 transition-all w-6 h-6"
              >
                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            <a href="mailto:fredly210307@gmail.com">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail-icon lucide-mail hover:cursor-pointer hover:text-cyan-400 transition-all w-6 h-6"
              >
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x={2} y={4} width={20} height={16} rx={2} />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
