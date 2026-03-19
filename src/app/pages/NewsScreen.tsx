import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";

export function NewsScreen() {
  const navigate = useNavigate();
  const { type, scope } = useParams<{ type: string; scope?: string }>();

  const getTitle = () => {
    switch (type) {
      case "jalisco-tv":
        return "Jalisco TV";
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

  const getSubtitle = () => {
    if (!scope) return "Noticias del estado";
    return scope === "municipal"
      ? "Información Municipal"
      : "Información Estatal";
  };

  // Mock news data
  const newsItems = [
    {
      id: 1,
      title: "Nuevo programa de apoyo para estudiantes",
      date: "13 de marzo, 2026",
      location: scope === "municipal" ? "Guadalajara" : "Jalisco",
      excerpt:
        "El gobierno anuncia un nuevo programa de becas para estudiantes de educación superior.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Mejoras en servicios de salud",
      date: "12 de marzo, 2026",
      location: scope === "municipal" ? "Zapopan" : "Jalisco",
      excerpt:
        "Se anuncian mejoras significativas en la infraestructura de salud pública.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Programa de inclusión digital",
      date: "11 de marzo, 2026",
      location: scope === "municipal" ? "Tlaquepaque" : "Jalisco",
      excerpt:
        "Nuevas iniciativas para conectar a más ciudadanos con servicios digitales.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Eventos culturales del mes",
      date: "10 de marzo, 2026",
      location: scope === "municipal" ? "Tonalá" : "Jalisco",
      excerpt:
        "Descubre los eventos culturales y comunitarios programados para este mes.",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop",
    },
  ];

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
            <h1 className="font-bold text-gray-900">{getTitle()}</h1>
            <p className="text-xs text-gray-600">{getSubtitle()}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-4">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* News Image */}
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-orange-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* News Content */}
              <div className="p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{item.excerpt}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load more */}
        <div className="mt-6 text-center">
          <button className="px-6 py-3 bg-white text-purple-700 font-medium rounded-xl shadow-md hover:shadow-lg transition-all">
            Cargar más noticias
          </button>
        </div>
      </main>
    </div>
  );
}
