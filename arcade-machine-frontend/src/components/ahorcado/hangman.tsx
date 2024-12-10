interface HangmanProps {
  errors: number;
}

export function Hangman({ errors }: HangmanProps) {
  return (
    <svg height="250" width="200" className="border border-gray-300">
      {/* Base */}
      {errors > 0 && (
        <line x1="20" y1="230" x2="100" y2="230" stroke="black" />
      )}

      {/* Poste vertical */}
      {errors > 1 && (
        <line x1="60" y1="20" x2="60" y2="230" stroke="black" />
      )}

      {/* Viga superior */}
      {errors > 2 && (
        <line x1="60" y1="20" x2="140" y2="20" stroke="black" />
      )}

      {/* Cuerda */}
      {errors > 3 && (
        <line x1="140" y1="20" x2="140" y2="50" stroke="black" />
      )}

      {/* Cabeza */}
      {errors > 4 && (
        <circle cx="140" cy="70" r="20" stroke="black" fill="none" />
      )}

      {/* Cuerpo */}
      {errors > 5 && (
        <line x1="140" y1="90" x2="140" y2="150" stroke="black" />
      )}

      {/* Brazo izquierdo */}
      {errors > 6 && (
        <line x1="140" y1="120" x2="120" y2="100" stroke="black" />
      )}

      {/* Brazo derecho */}
      {errors > 7 && (
        <line x1="140" y1="120" x2="160" y2="100" stroke="black" />
      )}

      {/* Pierna izquierda */}
      {errors > 8 && (
        <line x1="140" y1="150" x2="120" y2="180" stroke="black" />
      )}

      {/* Pierna derecha */}
      {errors > 9 && (
        <line x1="140" y1="150" x2="160" y2="180" stroke="black" />
      )}
    </svg>
  )
}

