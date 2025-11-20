export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.03),transparent_50%)]"></div>

      <div className="relative text-center">
        {/* Main Loading Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div
            className="absolute inset-0 border-4 border-slate-700/30 rounded-full animate-spin"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute inset-0 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"
            style={{ animationDuration: "1s" }}
          ></div>
          <div
            className="absolute inset-2 border-2 border-cyan-400/50 border-b-transparent rounded-full animate-spin"
            style={{ animationDuration: "2s", animationDirection: "reverse" }}
          ></div>

          {/* Center rotating dot */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full animate-spin"
            style={{ animationDuration: "0.8s" }}
          ></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
            Loading Portfolio
          </h2>
          <p className="text-slate-400 text-sm animate-pulse">
            Please wait while we prepare your experience...
          </p>
        </div>

        {/* Rotating Loading Dots */}
        <div className="flex justify-center gap-1 mt-6">
          <div
            className="w-2 h-2 bg-cyan-400 rounded-full animate-spin"
            style={{ animationDelay: "0ms", animationDuration: "1.5s" }}
          ></div>
          <div
            className="w-2 h-2 bg-cyan-400 rounded-full animate-spin"
            style={{ animationDelay: "200ms", animationDuration: "1.5s" }}
          ></div>
          <div
            className="w-2 h-2 bg-cyan-400 rounded-full animate-spin"
            style={{ animationDelay: "400ms", animationDuration: "1.5s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
