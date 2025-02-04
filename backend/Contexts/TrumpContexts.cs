#nullable disable

using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Contexts;

public class TrumpContexts : DbContext
{
    // Vi klargjør for konstruktør "injections".
    public TrumpContexts(DbContextOptions<TrumpContexts> options)
        :base(options){};

    public DbSet<TrumpMerch> TrumpMerches {get; set;}
    public DbSet<TrumpStaff> TrumpStaffers {get; set;}

}
