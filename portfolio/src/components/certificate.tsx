"use client";

import type { Certificate } from "@/type";
import { Award, ExternalLink, Calendar, Shield, Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getCategoryIcon = (issuer: string) => {
  if (issuer.toLowerCase().includes("hacktiv8")) {
    return <Award className="w-5 h-5 text-cyan-400" />;
  } else if (
    issuer.toLowerCase().includes("udemy") ||
    issuer.toLowerCase().includes("coursera")
  ) {
    return <Star className="w-5 h-5 text-cyan-400" />;
  } else {
    return <Shield className="w-5 h-5 text-cyan-400" />;
  }
};

export default function Certificate() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const getCertificates = async () => {
    try {
      const data = await fetch("/api/certificate");
      const json = await data.json();

      setCertificates(json.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCertificates();
  }, []);

  return (
    <div
      className="h-full min-w-screen bg-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8"
      id="certificates"
    >
      <div className="w-full max-w-6xl mx-auto h-full py-12 sm:py-16 lg:py-20 opacity-0 animate-fadeInUp delay-100">
        {/* Section Header */}
        <div className="mb-12">
          <div className="group relative inline-block cursor-pointer mb-6">
            <h1 className="text-white font-bold text-2xl mb-5 flex items-center">
              <Award className="inline mr-3 text-cyan-400 bg-slate-900 rounded-lg w-10 h-10 p-2" />
              Certificates & Achievements
            </h1>
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-cyan-400 rounded-full transition-all duration-300 group-hover:w-98"></span>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.slice(0, 6).map((cert, index) => (
            <div
              key={index}
              className="group/cert relative bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Decorative Top Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400/0 via-cyan-400/60 to-cyan-400/0 group-hover/cert:via-cyan-400 transition-all duration-300"></div>

              {/* Certificate Content */}
              <div className="p-6">
                {/* Header with Icon and Date */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-400/10 rounded-lg group-hover/cert:bg-cyan-400/20 transition-colors">
                      {getCategoryIcon(cert.issuer)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {cert.month} {cert.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Certificate Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover/cert:text-cyan-400 transition-colors line-clamp-2 leading-tight">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="text-cyan-400 font-medium text-sm mb-3">
                  {cert.issuer}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
                  {cert.description}
                </p>

                {/* View Certificate Button */}
                <div className="pt-4 border-t border-slate-700/50">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-white group/link transition-colors"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Subtle Background Pattern */}
              <div className="absolute inset-0 opacity-5 group-hover/cert:opacity-10 transition-opacity pointer-events-none">
                <div className="absolute top-4 right-4 w-24 h-24 border-2 border-cyan-400 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 border border-cyan-400 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <Link href="/certificates">
          <div className="flex justify-center mt-12">
            <button className="group px-8 py-3 bg-transparent border-2 border-cyan-400/70 hover:border-cyan-400 text-cyan-400 hover:text-slate-900 font-semibold rounded-xl hover:bg-cyan-400 transition-all flex items-center gap-3 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Award className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>View All Certificates</span>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
