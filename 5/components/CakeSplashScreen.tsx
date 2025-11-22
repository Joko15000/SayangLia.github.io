
import React, { useState, useEffect, useRef } from 'react';

interface CakeProps {
  onFinished: () => void;
  partnerName: string;
  partnerAge: number;
}

const CakeSplashScreen: React.FC<CakeProps> = ({ onFinished, partnerName, partnerAge }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [audioPermission, setAudioPermission] = useState<boolean | null>(null);
  const animationFrameRef = useRef<number>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    // Initialize microphone detection
    const initMicrophone = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioPermission(true);
        
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        
        analyser.fftSize = 256;
        microphone.connect(analyser);
        
        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        microphoneRef.current = microphone;

        detectBlow();
      } catch (error) {
        console.log("Microphone access denied or not supported.");
        setAudioPermission(false);
      }
    };

    initMicrophone();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const detectBlow = () => {
    if (!analyserRef.current || candlesBlown) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    // Calculate average volume
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    const average = sum / bufferLength;

    // Threshold for "blowing" (adjust as needed)
    if (average > 50) { 
      handleBlow();
    } else {
      animationFrameRef.current = requestAnimationFrame(detectBlow);
    }
  };

  const handleBlow = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    
    // Wait for smoke animation then finish
    setTimeout(() => {
      onFinished();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-blue-100 z-50 overflow-hidden">
      <style>{`
        .flame {
          width: 15px;
          height: 35px;
          background: radial-gradient(ellipse at bottom, #ffd700 0%, #ff4500 60%, transparent 100%);
          border-radius: 50% 50% 20% 20%;
          position: absolute;
          top: -35px;
          left: 50%;
          transform: translateX(-50%);
          animation: flicker 0.5s infinite alternate;
          transform-origin: center bottom;
          box-shadow: 0 0 10px #ff4500;
        }
        
        @keyframes flicker {
          0% { transform: translateX(-50%) scale(1); opacity: 1; }
          100% { transform: translateX(-50%) scale(1.1) rotate(2deg); opacity: 0.8; }
        }

        .smoke {
          width: 10px;
          height: 30px;
          background: rgba(100, 100, 100, 0.1);
          border-radius: 50%;
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          animation: smokeRise 1.5s forwards ease-out;
        }

        @keyframes smokeRise {
          0% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-50px) scale(3); }
        }
      `}</style>

      <div className="text-center mb-12 z-10 px-4">
        <h1 className="text-3xl md:text-5xl font-lobster text-blue-600 mb-4 animate-bounce">
          Happy Birthday ke-{partnerAge}!
        </h1>
        <p className="text-blue-400 text-lg mt-2">
          {audioPermission === false
            ? "Yah, kamu menolak akses mikrofon 😢" 
            : "Tiup ke arah layar/mikrofon untuk mematikan lilin! 🎂💨"}
        </p>
        {audioPermission === false ? (
            <div className="mt-4">
                <p className="text-sm text-gray-500 mb-4">Fitur tiup lilin butuh akses mikrofon, sayang.</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-blue-400 text-white rounded-full font-bold hover:bg-blue-500 transition-all shadow-lg"
                >
                    Coba Lagi (Refresh)
                </button>
            </div>
        ) : (
           <p className="text-xs text-blue-300 mt-2 animate-pulse">(Pastikan mikrofon aktif dan tiup yang kuat ya!)</p>
        )}
      </div>

      {/* Cake Container - Removed onClick and cursor-pointer since only mic works */}
      <div className="relative mt-8 transform hover:scale-105 transition-transform duration-500">
        
        {/* Candles */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex gap-4">
            {/* Render Numeric Candles based on age */}
            {partnerAge.toString().split('').map((digit, idx) => (
                 <div key={idx} className="relative w-8 h-16 bg-sky-300 border-2 border-white rounded-md flex items-center justify-center shadow-md">
                    <span className="font-bold text-white text-xl shadow-sm">{digit}</span>
                    {/* Wick */}
                    <div className="absolute -top-2 left-1/2 w-1 h-2 bg-gray-700 -translate-x-1/2"></div>
                    {/* Flame or Smoke */}
                    {!candlesBlown ? (
                        <div className="flame"></div>
                    ) : (
                        <div className="smoke"></div>
                    )}
                 </div>
            ))}
        </div>

        {/* Cake Top Layer */}
        <div className="w-64 h-24 bg-blue-300 rounded-t-full relative z-10 border-b-4 border-blue-400">
            {/* Icing drips */}
            <div className="absolute top-full w-full flex">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-8 h-6 bg-blue-300 rounded-b-full -mt-1"></div>
                ))}
            </div>
        </div>
        
        {/* Cake Bottom Layer */}
        <div className="w-64 h-32 bg-white rounded-b-2xl shadow-xl relative -z-10 flex items-center justify-center border-b-8 border-gray-100">
             <div className="text-blue-300 font-lobster text-2xl opacity-50">
                {partnerName}
             </div>
        </div>
        
        {/* Plate */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-80 h-6 bg-gray-200 rounded-full shadow-lg -z-20"></div>
      </div>

    </div>
  );
};

export default CakeSplashScreen;
