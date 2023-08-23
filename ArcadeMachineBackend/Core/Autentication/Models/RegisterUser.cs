using System.ComponentModel.DataAnnotations;

namespace ArcadeMachine.Core.Autentication.Models;

public class RegisterUser
{
    [Required(ErrorMessage = "El nombre de usuario es requerido")]
    public string? Username { get; set; }
    [EmailAddress]
    [Required(ErrorMessage = "El email es requerido")]
    public string? Email { get; set; }
    [Required(ErrorMessage = "La contraseña es requerida")]
    public string? Password { get; set; }
}