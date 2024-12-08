// FILE: speechUtil.ts
export const speak = (message: string) => {

  const synth = window.speechSynthesis;

  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = 'es-MX'; // Configura el idioma a español
  utterance.rate = 1; // Velocidad de la voz (0.1 a 10)
  utterance.pitch = 1; // Tono de la voz (0 a 2)
  utterance.volume = 1; // Volumen de la voz (0 a 1)
  synth.speak(utterance);

};