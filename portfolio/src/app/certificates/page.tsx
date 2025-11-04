"use client";

import { Certificate } from "@/type";
import {
  Award,
  ExternalLink,
  Calendar,
  Shield,
  Star,
  ArrowLeft,
} from "lucide-react";
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

export default function CertificatesPage() {
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

  const router = useRouter();
  return (
    <div className="min-h-screen bg-slate-900 pt-20 md:pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12 opacity-0 animate-fadeInUp">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium mb-6 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </button>

          <p className="text-gray-400 text-sm sm:text-base max-w-3xl">
            Complete collection of my professional certifications, courses, and
            achievements in software development and technology.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="group/cert relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300 hover:-translate-y-1 overflow-hidden opacity-0 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Decorative Top Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400/0 via-cyan-400/60 to-cyan-400/0 group-hover/cert:via-cyan-400 transition-all duration-300"></div>

              {/* Certificate Content */}
              <div className="p-6">
                {/* Header */}
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

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover/cert:text-cyan-400 transition-colors line-clamp-2 leading-tight">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="text-cyan-400 font-medium text-sm mb-3">
                  {cert.issuer}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
                  {cert.description}
                </p>

                {/* Action Button */}
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

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5 group-hover/cert:opacity-10 transition-opacity pointer-events-none">
                <div className="absolute top-4 right-4 w-20 h-20 border border-cyan-400 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 border border-cyan-400 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
