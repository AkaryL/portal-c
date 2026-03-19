import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { X } from "lucide-react";

export function Welcome() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    // Check if welcome has been shown before
    const welcomeShown = localStorage.getItem("welcomeShown");
    if (welcomeShown === "true") {
      navigate("/home", { replace: true });
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanSkip(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleContinue = () => {
    if (canSkip) {
      localStorage.setItem("welcomeShown", "true");
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Video Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Skip button */}
          {canSkip && (
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={handleContinue}
                className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Video Content */}
          <div className="relative aspect-square bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center p-8">
            <div className="text-center text-white">
              <div className="mb-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Video de Bienvenida
                </h2>
                <p className="text-white/90 text-sm">
                  Aquí se colocará el video explicativo
                </p>
              </div>

              {!canSkip && (
                <div className="text-sm">
                  Continuando en{" "}
                  <span className="font-bold text-xl">{countdown}</span>{" "}
                  segundos...
                </div>
              )}
            </div>
          </div>

          {/* Continue Button */}
          {canSkip && (
            <div className="p-6">
              <button
                onClick={handleContinue}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Continuar
              </button>
            </div>
          )}
        </div>

        {/* Bottom text */}
        <p className="text-center text-gray-500 text-xs mt-4">
          Este espacio se utilizará para el video de bienvenida
        </p>
      </div>
    </div>
  );
}