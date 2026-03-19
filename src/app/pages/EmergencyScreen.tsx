import { useNavigate } from "react-router";
import { Phone, MapPin, AlertTriangle, ArrowLeft } from "lucide-react";
import { useState } from "react";

export function EmergencyScreen() {
  const navigate = useNavigate();
  const [municipality] = useState("Guadalajara"); // In real app, this would be detected

  const handleEmergencyCall = () => {
    // In a real app, this would trigger the phone dialer
    window.location.href = "tel:911";
  };

  const emergencyContacts = [
    {
      name: "Policía Municipal",
      number: "33-3668-0660",
      icon: "🚓",
    },
    {
      name: "Bomberos",
      number: "33-3619-5241",
      icon: "🚒",
    },
    {
      name: "Cruz Roja",
      number: "33-3613-1550",
      icon: "🏥",
    },
    {
      name: "Protección Civil",
      number: "33-3030-3030",
      icon: "⚠️",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
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
            <h1 className="font-bold text-gray-900">Emergencias</h1>
            <p className="text-xs text-gray-600">Ayuda inmediata</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        {/* Location Info */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6 flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-xl">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Tu ubicación detectada:</p>
            <p className="font-semibold text-gray-900">{municipality}, Jalisco</p>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-red-900 mb-1">
              Usa solo en emergencias reales
            </h3>
            <p className="text-sm text-red-700">
              El uso indebido de servicios de emergencia es un delito.
            </p>
          </div>
        </div>

        {/* Primary Emergency Button */}
        <button
          onClick={handleEmergencyCall}
          className="w-full mb-8 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-2">Llamar 911</h2>
              <p className="text-red-100">Emergencias generales</p>
            </div>
            <Phone className="w-16 h-16" />
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-sm text-white/90">
              ⚡ Respuesta inmediata 24/7
            </p>
          </div>
        </button>

        {/* Other Emergency Contacts */}
        <div className="mb-4">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>Otros números de emergencia</span>
          </h3>

          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <a
                key={index}
                href={`tel:${contact.number.replace(/-/g, "")}`}
                className="block bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all transform hover:scale-[1.01]"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{contact.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {contact.name}
                    </h4>
                    <p className="text-sm text-gray-600">{contact.number}</p>
                  </div>
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mt-6">
          <h3 className="font-bold text-gray-900 mb-3">
            Consejos de seguridad
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Mantén la calma y habla claro</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Proporciona tu ubicación exacta</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Describe la situación brevemente</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>No cuelgues hasta que te lo indiquen</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
