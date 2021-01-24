using Microsoft.EntityFrameworkCore;

namespace WEBAPI.Models
{
    

    public class StoreContext : DbContext
    {
        public DbSet<Proizvod> Proizvodi {get; set;}
        public DbSet<Proizvodjac> Proizvodjaci{get; set;}
        public DbSet<Kategorija> Kategorije{get; set;}



        public StoreContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Entity<Proizvod>()
            //     .Property<string>("BojeCollection")
            //     .HasField("boje");

            modelBuilder.Entity<Proizvod>()
                .Property(e => e.Boje)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', System.StringSplitOptions.RemoveEmptyEntries)
                    );
                
        }
    }
}