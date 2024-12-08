// FILE: speechUtil.ts
export const speak = (message: string) => {
  try {
    
    const synth = window.speechSynthesis;
    console.log(synth);
    
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'es-ES'; // Configura el idioma a español
    utterance.rate = 1; // Velocidad de la voz (0.1 a 10)
    utterance.pitch = 0.4; // Tono de la voz (0 a 2)
    utterance.volume = 1; // Volumen de la voz (0 a 1)
    synth.speak(utterance);
  } catch (error) {
   console.log("Error al intentar hablar", error);
    
  }
};