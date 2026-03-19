import { useState } from "react";
import { X, Facebook, Phone } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [nameError, setNameError] = useState(false);

  if (!isOpen) return null;

  const handleFacebookLogin = () => {
    if (!fullName.trim()) {
      setNameError(true);
      return;
    }
    // Simulate Facebook login and save user data
    localStorage.setItem("userName", fullName);
    localStorage.setItem("isAuthenticated", "true");
    setTimeout(() => {
      onLoginSuccess();
    }, 500);
  };

  const handlePhoneLogin = () => {
    if (!fullName.trim()) {
      setNameError(true);
      return;
    }
    if (!phoneNumber.trim()) {
      alert("Por favor ingresa tu número de teléfono");
      return;
    }
    setShowOTP(true);
  };

  const handleOTPComplete = (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      // Simulate OTP verification and save user data
      localStorage.setItem("userName", fullName);
      localStorage.setItem("isAuthenticated", "true");
      setTimeout(() => {
        onLoginSuccess();
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Iniciar sesión</h2>
          <p className="text-gray-600 text-sm">
            Ingresa tus datos para acceder a todas las funciones
          </p>
        </div>

        {!showOTP ? (
          <>
            {/* Full Name Input */}
            <div className="mb-6">
              <Label htmlFor="fullName" className="text-gray-700 mb-2 block">
                Nombre completo *
              </Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setNameError(false);
                }}
                placeholder="Ingresa tu nombre completo"
                className={`w-full ${nameError ? 'border-red-500 border-2 focus:border-red-500' : ''}`}
              />
              {nameError && (
                <p className="text-red-500 text-sm mt-1">
                  Por favor ingresa tu nombre completo
                </p>
              )}
            </div>

            {/* Authentication Methods */}
            <div className="space-y-3 mb-6">
              <p className="text-sm text-gray-600 mb-3">Método de autenticación:</p>

              {/* Facebook Login */}
              <button
                onClick={handleFacebookLogin}
                className="w-full py-3 px-4 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-3 shadow-md"
              >
                <Facebook className="w-5 h-5" />
                Continuar con Facebook
              </button>

              {/* Phone Login */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-gray-300" />
                  <span className="text-xs text-gray-500">o</span>
                  <div className="flex-1 h-px bg-gray-300" />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700 mb-2 block text-sm">
                    Número de teléfono
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+52 33 1234 5678"
                    className="w-full mb-3"
                  />
                </div>

                <button
                  onClick={handlePhoneLogin}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-3 shadow-md"
                >
                  <Phone className="w-5 h-5" />
                  Continuar con Teléfono
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="mb-6">
            <div className="text-center mb-6">
              <p className="text-gray-700 mb-2">Código enviado a:</p>
              <p className="font-semibold text-gray-900">{phoneNumber}</p>
            </div>

            <Label className="text-gray-700 mb-3 block text-center">
              Ingresa el código de 6 dígitos
            </Label>
            <div className="flex justify-center mb-4">
              <InputOTP maxLength={6} value={otp} onChange={handleOTPComplete}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <button
              onClick={() => setShowOTP(false)}
              className="w-full text-center text-sm text-purple-600 hover:text-purple-700"
            >
              ← Volver
            </button>
          </div>
        )}

        {/* Terms and Conditions */}
        <div className="text-center">
          <button className="text-xs text-gray-600 hover:text-gray-800 underline">
            Acepto los Términos y Condiciones
          </button>
        </div>
      </div>
    </div>
  );
}