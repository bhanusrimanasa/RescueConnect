import { useState, useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import { 
  Camera, 
  Send, 
  ShieldAlert, 
  Bot, 
  User, 
  HeartPulse, 
  X
} from "lucide-react";

function AnimalHealthAIAssistant({ isOpen, onClose, initialImage = null }) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am your 24/7 AI Animal Health & Emergency Assistant. If you found an injured or distressed animal, upload a photo or describe their symptoms, and I will guide you through immediate first-aid steps while you wait for volunteers or vets.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState(initialImage);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  const quickPrompts = [
    "🩹 Bleeding / Open Wound First Aid",
    "⚠️ Possible Poisoning / Ingestion",
    "🚗 Hit by car - How to move safely",
    "🍼 Found newborn abandoned kitten/puppy",
    "🌡️ Heatstroke symptoms & cooling"
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (textToSend) => {
    const userText = textToSend || inputText;
    if (!userText.trim() && !selectedImage) return;

    const userMessage = {
      sender: "user",
      text: userText,
      image: selectedImage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    const currentImage = selectedImage;
    setSelectedImage(null);
    setIsAnalyzing(true);

    try {
      // Safely check if API key exists
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("VITE_GEMINI_API_KEY is missing from your .env file.");
      }

      const ai = new GoogleGenAI({ apiKey });

      let contents = [];

      if (currentImage) {
        const matches = currentImage.match(/^data:(.+);base64,(.+)$/);
        if (matches) {
          contents.push({
            inlineData: {
              mimeType: matches[1],
              data: matches[2]
            }
          });
        }
      }

      contents.push(userText || "Please analyze this animal condition and provide emergency first-aid steps.");

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: contents,
        config: {
          systemInstruction: `You are an expert veterinary emergency triage and first-aid assistant built for an animal rescue and adoption platform. 
          Provide clear, calm, immediate, and safe stop-gap first-aid steps volunteers or finders can take before a veterinarian arrives. Warn against dangerous actions and add a brief professional veterinary disclaimer. Use clean bullet points.`,
          temperature: 0.4,
        }
      });

      const aiResponseText = response.text || "Please ensure the animal is kept in a safe, quiet environment and contact a veterinarian immediately.";

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (error) {
      console.error("Detailed Gemini API Error:", error);
      
      // Fallback response so the user still gets helpful first aid info even if the API key fails
      const fallbackText = `⚠️ **Emergency First-Aid Guide (Offline Mode):**\n1. Keep the animal calm, warm, and in a quiet low-stress area.\n2. Avoid sudden movements or giving human medication.\n3. If there is bleeding, apply firm pressure with a clean cloth.\n\n*(Note: Check your browser console; the live AI connection encountered an issue: ${error.message || "Network/Key error"}). Please contact a local vet directly.*`;

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
              <HeartPulse size={22} />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg flex items-center gap-2">
                RescueGuard AI Health & Emergency Vet Advisor
                <span className="text-[10px] bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Gemini Powered
                </span>
              </h2>
              <p className="text-slate-400 text-xs">Instant triage, injury assessment, and pre-arrival first aid protocols</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 flex items-start gap-3 text-rose-800 text-xs sm:text-sm">
            <ShieldAlert size={20} className="text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Medical Disclaimer:</strong> This AI provides preliminary emergency first-aid advice only. Always consult a licensed veterinarian or dispatch a certified shelter rescuer for critical cases.
            </div>
          </div>

          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === "user" ? "bg-slate-900 text-white" : "bg-pink-600 text-white shadow-sm"
              }`}>
                {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>

              <div className={`max-w-[80%] sm:max-w-[70%] rounded-2xl p-4 text-xs sm:text-sm shadow-sm space-y-2 ${
                msg.sender === "user" 
                  ? "bg-slate-900 text-white rounded-tr-none" 
                  : "bg-white border border-slate-200/80 text-slate-800 rounded-tl-none leading-relaxed whitespace-pre-line"
              }`}>
                {msg.image && (
                  <div className="rounded-lg overflow-hidden border border-white/20 mb-2 max-h-48">
                    <img src={msg.image} alt="Uploaded attachment" className="w-full h-full object-cover" />
                  </div>
                )}
                <p>{msg.text}</p>
                <span className={`block text-[10px] text-right ${msg.sender === "user" ? "text-slate-400" : "text-slate-400"}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isAnalyzing && (
            <div className="flex items-center gap-3 text-slate-400 text-xs italic">
              <Bot size={16} className="text-pink-600 animate-pulse" />
              <span>Gemini AI is analyzing animal condition & veterinary guidelines...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-4 py-2.5 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto shrink-0">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">Quick Triage:</span>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition cursor-pointer shrink-0 border border-slate-200/60"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
          {selectedImage && (
            <div className="mb-3 relative inline-block">
              <img src={selectedImage} alt="Preview" className="w-16 h-16 object-cover rounded-xl border border-slate-200 shadow-sm" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-rose-600 text-white rounded-full flex items-center justify-center text-xs shadow cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-3 rounded-xl transition cursor-pointer flex items-center justify-center shrink-0 border border-slate-200"
              title="Upload Photo / Scan Injury"
            >
              <Camera size={18} className="text-slate-600" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Describe symptoms or injury (e.g., 'dog limping with swollen paw')..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition"
            />

            <button
              type="button"
              onClick={() => handleSendMessage()}
              className="bg-pink-600 hover:bg-pink-500 text-white px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
            >
              <Send size={16} />
              <span>Ask AI</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AnimalHealthAIAssistant;