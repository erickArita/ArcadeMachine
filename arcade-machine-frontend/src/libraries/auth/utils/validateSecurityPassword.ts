import { FieldValues, UseFormSetError } from 'react-hook-form'

export const validateSecurityPassword = (
  setError: UseFormSetError<FieldValues>,
  password1: string,
  password2: string
): boolean => {
  // Validaciones longitud de la contraseña
  if (password1.length < 8) {
    setError('newPassword', {
      message: 'La contraseña debe tener al menos 8 caracteres.',
    })

    return false
  }

  // Validar que exista un numero en la contraseña
  if (!/\d/.test(password1)) {
    setError('newPassword', {
      message: 'La contraseña debe tener al menos un número.',
    })

    return false
  }

  // Validar que exista una letra mayuscula en la contraseña
  if (!/[A-Z]/.test(password1)) {
    setError('newPassword', {
      message: 'La contraseña debe tener al menos una letra mayúscula.',
    })

    return false
  }

  // Validar que exista un caracter especial en la contraseña
  if (!/[!@#$%^&*]/.test(password1)) {
    setError('newPassword', {
      message: 'La contraseña debe tener al menos un caracter especial.',
    })

    return false
  }

  // Validar que las contraseñas coincidan
  if (password1 !== password2) {
    setError('newPassword2', {
      message: 'Las contraseñas no coinciden.',
    })

    return false
  }

  return true
}
