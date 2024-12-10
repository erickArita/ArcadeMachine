interface HangmanProps {
  errors: number;
}

export function Hangman({ errors }: HangmanProps) {
  return (
    <svg height="300" width="300" viewBox="0 0 300 300" className="border border-gray-300 bg-blue-50">
      {/* Base */}
      <line x1="60" y1="270" x2="240" y2="270" stroke="#8B4513" strokeWidth="10" />
      
      {/* Poste vertical */}
      {errors > 0 && (
        <line x1="100" y1="270" x2="100" y2="30" stroke="#8B4513" strokeWidth="8" />
      )}
      
      {/* Viga superior */}
      {errors > 1 && (
        <line x1="100" y1="30" x2="220" y2="30" stroke="#8B4513" strokeWidth="8" />
      )}
      
      {/* Cuerda */}
      {errors > 2 && (
        <line x1="220" y1="30" x2="220" y2="70" stroke="#A0522D" strokeWidth="4" />
      )}
      
      {/* Cabeza */}
      {errors > 3 && (
        <circle cx="220" cy="90" r="20" stroke="#000" strokeWidth="4" fill="#FFE4B5" />
      )}
      
      {/* Cuerpo */}
      {errors > 4 && (
        <line x1="220" y1="110" x2="220" y2="190" stroke="#000" strokeWidth="4" />
      )}
      
      {/* Brazo izquierdo */}
      {errors > 5 && (
        <line x1="220" y1="130" x2="190" y2="160" stroke="#000" strokeWidth="4" />
      )}
      
      {/* Brazo derecho */}
      {errors > 6 && (
        <line x1="220" y1="130" x2="250" y2="160" stroke="#000" strokeWidth="4" />
      )}
      
      {/* Pierna izquierda */}
      {errors > 7 && (
        <line x1="220" y1="190" x2="190" y2="230" stroke="#000" strokeWidth="4" />
      )}
      
      {/* Pierna derecha */}
      {errors > 8 && (
        <line x1="220" y1="190" x2="250" y2="230" stroke="#000" strokeWidth="4" />
      )}
      
      {/* Cara (ojos y boca triste) */}
      {errors > 9 && (
        <>
          <circle cx="213" cy="85" r="2" fill="#000" />
          <circle cx="227" cy="85" r="2" fill="#000" />
          <path d="M210 100 Q220 95 230 100" fill="none" stroke="#000" strokeWidth="2" />
        </>
      )}
    </svg>
  )
}

