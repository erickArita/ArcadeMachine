using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ArcadeMachine.Infraestructure.Persistence;

public class AplicationDbContext : IdentityDbContext
{
    public AplicationDbContext(DbContextOptions options) : base(options)
    {
    }
}