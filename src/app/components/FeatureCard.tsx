import { Lock } from "lucide-react";
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  onClick: () => void;
  isLocked: boolean;
  image?: string;
}

export function FeatureCard({
  title,
  subtitle,
  icon,
  onClick,
  isLocked,
  image,
}: FeatureCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full h-28 bg-gradient-to-br from-orange-400 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
    >
      {/* Background image */}
      {image && (
        <>
          <img 
            src={image} 
            alt={title} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay to keep text readable */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/80 via-orange-600/70 to-purple-600/80 backdrop-blur-[0.5px]" />
          
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
        </>
      )}

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        <div className="flex items-start gap-3">
          <div className="bg-white/25 backdrop-blur-sm p-2 rounded-lg shadow-lg">
            {icon}
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-base font-bold mb-0.5 drop-shadow-md">{title}</h3>
            <p className="text-white/95 text-xs drop-shadow-md">{subtitle}</p>
          </div>
          {isLocked && (
            <div className="bg-white/25 backdrop-blur-sm p-2 rounded-lg shadow-lg">
              <Lock className="w-5 h-5" />
            </div>
          )}
        </div>
      </div>
    </button>
  );
}