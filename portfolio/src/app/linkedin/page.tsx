"use client";

import { LinkedIn } from "@/type";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LinkedInPage() {
  const router = useRouter();
  const [linkedIn, setLinkedIn] = useState<LinkedIn[]>([]);
  const [expandedPosts, setExpandedPosts] = useState<Record<number, boolean>>(
    {}
  );

  const togglePostExpansion = (index: number) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const truncateText = (text: string, maxLength: number = 200) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const getLinkedIn = async () => {
    try {
      const response = await fetch("/api/linkedin");
      const data = await response.json();
      setLinkedIn(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    getLinkedIn();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors group"
          >
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
              className="group-hover:-translate-x-1 transition-transform"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back
          </button>
          <div className="h-6 w-px bg-gray-700"></div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-cyan-400">
              LinkedIn Posts
            </h1>
            <p className="text-gray-400 mt-2">
              My professional journey and insights
            </p>
          </div>
        </div>

        {/* Posts Container */}
        <div className="space-y-6">
          {linkedIn.length === 0 ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400">Loading posts...</p>
            </div>
          ) : (
            linkedIn.map((post, index) => (
              <div
                key={index}
                className="group/post bg-slate-900 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300"
              >
                {/* Post Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <img
                      src={post.avatarUrl}
                      alt={post.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-600 group-hover/post:border-cyan-400/50 transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full border-2 border-slate-800 flex items-center justify-center">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg group-hover/post:text-cyan-400 transition-colors">
                      {post.name}
                    </h3>
                    <p className="text-gray-400 text-sm">Professional Update</p>
                  </div>
                </div>

                {/* Post Content */}
                {post.content && (
                  <div className="mb-6">
                    <p className="text-gray-200 leading-relaxed text-base">
                      {expandedPosts[index]
                        ? post.content
                        : truncateText(post.content, 200)}
                    </p>
                    {post.content.length > 200 && (
                      <button
                        onClick={() => togglePostExpansion(index)}
                        className="text-cyan-400 hover:text-cyan-300 font-medium text-sm mt-3 transition-colors inline-flex items-center gap-1"
                      >
                        {expandedPosts[index] ? "See Less" : "See More"}
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={`transition-transform ${
                            expandedPosts[index] ? "rotate-180" : ""
                          }`}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}

                {/* Post Image */}
                {post.urls && (
                  <div className="mb-6 rounded-xl overflow-hidden bg-slate-700/30">
                    <img
                      src={post.urls}
                      alt="Post content"
                      className="w-full h-auto object-cover group-hover/post:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Post Footer */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-slate-700/50 gap-4">
                  <div className="flex items-center gap-6 text-gray-400 text-sm">
                    <span className="flex items-center gap-2 hover:text-cyan-400 transition-colors cursor-pointer">
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
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-2 hover:text-cyan-400 transition-colors cursor-pointer">
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
                      {post.comments}
                    </span>
                    <span className="flex items-center gap-2 hover:text-cyan-400 transition-colors cursor-pointer">
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
                      {post.shares}
                    </span>
                  </div>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 hover:text-cyan-300 font-medium text-sm rounded-lg border border-cyan-600/30 hover:border-cyan-400/50 transition-all"
                  >
                    View on LinkedIn
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
                      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                      <path d="m21 3-9 9" />
                      <path d="M15 3h6v6" />
                    </svg>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
