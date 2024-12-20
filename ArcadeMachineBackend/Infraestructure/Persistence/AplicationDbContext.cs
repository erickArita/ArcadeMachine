﻿using System.Text.Json.Serialization;
using ArcadeMachine.Domain.Entities;
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

        modelBuilder.Entity<Partida>()
            .HasOne(p => p.usuario1)
            .WithMany()
            .HasForeignKey(p => p.usuario1Id)
            .OnDelete(DeleteBehavior.NoAction); // Configuración ON DELETE NO ACTION

        modelBuilder.Entity<Partida>()
            .HasOne(p => p.usuario2)
            .WithMany()
            .HasForeignKey(p => p.usuario2Id)
            .OnDelete(DeleteBehavior.NoAction);

        /* Owned Type Configurations */
        modelBuilder.Entity<MiniJuego>().OwnsOne(e => e.Metadata, a => { a.ToJson(); });
    }

    public DbSet<Partida> Partidas { get; set; }
    public DbSet<MiniJuego> Minijuegos { get; set; }
}