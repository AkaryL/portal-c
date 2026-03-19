import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Building2, MapPin } from "lucide-react";

export function SelectionScreen() {
  const navigate = useNavigate();
  const { feature } = useParams<{ feature: string }>();

  const getFeatureTitle = () => {
    switch (feature) {
      case "salud":
        return "Salud";
      case "educacion":
        return "Educación";
      case "programas-sociales":
        return "Programas Sociales";
      default:
        return "";
    }
  };

  const handleSelection = (scope: "municipal" | "estatal") => {
    // Navigate to interstitial ad before showing content
    navigate(`/ad/${feature}/${scope}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="font-bold text-gray-900">{getFeatureTitle()}</h1>
            <p className="text-xs text-gray-600">Selecciona el alcance</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ¿Qué información deseas ver?
          </h2>
          <p className="text-gray-600">
            Selecciona entre información municipal o estatal
          </p>
        </div>

        <div className="space-y-4">
          {/* Municipal Option */}
          <button
            onClick={() => handleSelection("municipal")}
            className="w-full p-6 bg-white hover:bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] border-2 border-transparent hover:border-purple-200"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-xl">
                <MapPin className="w-8 h-8 text-purple-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Municipal</h3>
                <p className="text-gray-600 text-sm">
                  Información de tu municipio
                </p>
              </div>
            </div>
          </button>

          {/* Estatal Option */}
          <button
            onClick={() => handleSelection("estatal")}
            className="w-full p-6 bg-white hover:bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] border-2 border-transparent hover:border-orange-200"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-4 rounded-xl">
                <Building2 className="w-8 h-8 text-orange-700" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Estatal</h3>
                <p className="text-gray-600 text-sm">
                  Información de todo Jalisco
                </p>
              </div>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}
