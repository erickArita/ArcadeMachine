using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace ArcadeMachine.Domain.Entities;

[Table("partidas")]
public class Partida
{
    public Guid Id { get; set; }
    [ForeignKey(nameof(usuario1Id))] 
    [Required] public string usuario1Id { get; set; }
    [ForeignKey(nameof(usuario2Id))] 
    [Required] public string usuario2Id { get; set; }
    [Required] public int puntajeUsuario1 { get; set; }
    [Required] public int puntajeUsuario2 { get; set; }
    [Required] public Guid juegoId { get; set; }
    public IdentityUser usuario1 { get; set; }
    public IdentityUser usuario2 { get; set; }
    public MiniJuego juego { get; set; }
    public DateTime fechaPartida { get; set; }
}