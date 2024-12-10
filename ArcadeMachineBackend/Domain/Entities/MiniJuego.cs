using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ArcadeMachine.Domain.Entities;

[Table("minijuegos")]
public class MiniJuego
{
    [Column("id")] public Guid Id { get; set; }
    [Required] [Column("nombre")] public string Nombre { get; set; }
    [Required] public string Img { get; set; }
    [Required] public string Color { get; set; }
    [Required] public string ShadowColor { get; set; }
    [Required] public string Slug { get; set; }
    public Metadata Metadata { get; set; } = new();
}

public class Metadata
{
    public bool Ia { get; set; }
}