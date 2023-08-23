using ArcadeMachine.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ArcadeMachine.Infraestructure.Persistence;

public class AplicationDbContext : IdentityDbContext
{
    public AplicationDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AplicationDbContext).Assembly);

        modelBuilder.Entity<Partida>().HasOne(p => p.usuario1).WithMany().HasForeignKey(p => p.usuario1Id);
        modelBuilder.Entity<Partida>().HasOne(p => p.usuario2).WithMany().HasForeignKey(p => p.usuario2Id);
        
       
        
    }
    

    public DbSet<Partida> Partidas { get; set; }
    public DbSet<MiniJuego> Minijuegos { get; set; }
    
}