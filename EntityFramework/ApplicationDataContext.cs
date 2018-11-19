using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using MoneyClip.Models;
using System.IO;

namespace MoneyClip.EntityFramework
{
    public class ApplicationDataContext : DbContext
    {
        public DbSet<Income> Incomes { get; set; }

        public ApplicationDataContext(DbContextOptions<ApplicationDataContext> options) : base(options)
        {
            
        }
    }
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ApplicationDataContext>
    {
        public ApplicationDataContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var builder = new DbContextOptionsBuilder<ApplicationDataContext>();
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            builder.UseSqlServer(connectionString);
            return new ApplicationDataContext(builder.Options);
        }
    }
}
