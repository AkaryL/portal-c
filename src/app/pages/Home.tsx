import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Tv, Heart, GraduationCap, Users, Wifi, Construction } from "lucide-react";
import { FeatureCard } from "../components/FeatureCard";
import { LoginModal } from "../components/LoginModal";
import logo from "figma:asset/d7fe9ebf1b9c2e23955e09ddb01f13f92ceb5f9b.png";

export function Home() {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  
  // Auth state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  // Load auth state from localStorage on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const savedUserName = localStorage.getItem("userName");
    
    if (authStatus === "true" && savedUserName) {
      setIsAuthenticated(true);
      setUserName(savedUserName);
    }
  }, []);

  const handleCardClick = (feature: string, isLocked: boolean) => {
    if (isLocked && !isAuthenticated) {
      setSelectedFeature(feature);
      setIsLoginModalOpen(true);
    } else {
      // Navigate based on feature
      if (feature === "jalisco-tv") {
        navigate("/news/jalisco-tv");
      } else if (feature === "emergency") {
        navigate("/emergency");
      } else {
        // For other features, show selection screen
        navigate(`/selection/${feature}`);
      }
    }
  };

  const handleLoginSuccess = () => {
    // Reload user data from localStorage
    const savedUserName = localStorage.getItem("userName");
    if (savedUserName) {
      setUserName(savedUserName);
    }
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
    // Navigate to the selected feature
    if (selectedFeature) {
      navigate(`/selection/${selectedFeature}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <img src={logo} alt="RED Jalisco" className="h-12" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-2 pb-16">
        {/* Greeting for logged in users */}
        {isAuthenticated && userName && (
          <div className="mb-2.5 p-3 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl">
            <p className="text-purple-900 text-sm font-medium">
              ¡Hola, {userName}! 👋
            </p>
            <p className="text-purple-700 text-xs mt-0.5">
              Bienvenido a RED Jalisco
            </p>
          </div>
        )}

        {/* Feature Cards Grid */}
        <div className="space-y-2.5">
          <FeatureCard
            title="Jalisco TV"
            subtitle="Entretenimiento y cultura"
            icon={<Tv className="w-6 h-6" />}
            onClick={() => handleCardClick("jalisco-tv", false)}
            isLocked={false}
            image="https://images.unsplash.com/photo-1717295248358-4b8f2c8989d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWxldmlzaW9uJTIwc3RyZWFtaW5nJTIwZW50ZXJ0YWlubWVudHxlbnwxfHx8fDE3NzM0Mjc2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          />

          <FeatureCard
            title="Salud"
            subtitle="Servicios médicos y bienestar"
            icon={<Heart className="w-6 h-6" />}
            onClick={() => handleCardClick("salud", true)}
            isLocked={!isAuthenticated}
            image="https://images.unsplash.com/photo-1517120026326-d87759a7b63b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMGhvc3BpdGFsfGVufDF8fHx8MTc3MzM2NDc4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
          />

          <FeatureCard
            title="Educación"
            subtitle="Recursos educativos"
            icon={<GraduationCap className="w-6 h-6" />}
            onClick={() => handleCardClick("educacion", true)}
            isLocked={!isAuthenticated}
            image="https://images.unsplash.com/photo-1759922378123-a1f4f1e39bae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBzdHVkZW50cyUyMGxlYXJuaW5nfGVufDF8fHx8MTc3MzMyMTI5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
          />

          <FeatureCard
            title="Programas Sociales"
            subtitle="Apoyo y beneficios"
            icon={<Users className="w-6 h-6" />}
            onClick={() => handleCardClick("programas-sociales", true)}
            isLocked={!isAuthenticated}
            image="https://images.unsplash.com/photo-1761250027507-c0be614c0254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBwZW9wbGUlMjBoZWxwaW5nfGVufDF8fHx8MTc3MzQwNjE3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
          />

          <FeatureCard
            title="Infraestructura"
            subtitle="Obras y desarrollo urbano"
            icon={<Construction className="w-6 h-6" />}
            onClick={() => handleCardClick("infraestructura", true)}
            isLocked={!isAuthenticated}
            image="https://images.unsplash.com/photo-1767884161909-1abc7d766341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZyYXN0cnVjdHVyZSUyMGNvbnN0cnVjdGlvbiUyMHJvYWRzJTIwYnJpZGdlc3xlbnwxfHx8fDE3NzM4NTI0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          />

          {/* Emergency Button */}
          <button
            onClick={() => handleCardClick("emergency", false)}
            className="w-full p-4 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-lg font-bold mb-0.5">Botón de Pánico</h3>
                <p className="text-red-100 text-xs">Emergencias 911</p>
              </div>
              <div className="text-4xl font-bold">911</div>
            </div>
          </button>
        </div>
      </main>

      {/* Bottom Internet Connection Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-2.5">
          <button className="w-full py-3 px-5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]">
            <Wifi className="w-5 h-5" />
            Conectar a Internet
          </button>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}