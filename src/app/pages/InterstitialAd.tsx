import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { X } from "lucide-react";

export function InterstitialAd() {
  const navigate = useNavigate();
  const { feature, scope } = useParams<{ feature: string; scope: string }>();
  const [countdown, setCountdown] = useState(10);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    // Countdown timer
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
  }, []);

  const handleContinue = () => {
    if (canSkip) {
      navigate(`/news/${feature}/${scope}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Ad Container */}
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

          {/* Ad Content */}
          <div className="relative aspect-square bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center p-8">
            <div className="text-center text-white">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  Anuncio del Gobierno
                </h2>
                <p className="text-white/90 text-sm">
                  Información de servicio público
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold mb-2">
                  Mantente Informado
                </h3>
                <p className="text-sm text-white/90">
                  RED Jalisco conecta a todos los ciudadanos con servicios
                  digitales del gobierno estatal.
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
          Este espacio se utiliza para anuncios de servicio público
        </p>
      </div>
    </div>
  );
}