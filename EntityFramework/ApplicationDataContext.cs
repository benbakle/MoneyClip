using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using MoneyClip.Models;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyClip.EntityFramework
{
    public class ApplicationDataContext : DbContext, IDataContext
    {
        public DbSet<Income> Incomes { get; set; }
        public DbSet<StoredValues> Options { get; set; }
        public DbSet<Transaction> Transactions { get; set; }

        public ApplicationDataContext(DbContextOptions<ApplicationDataContext> options) : base(options)
        {

        }
        IQueryable<T> IDataContext.Query<T>()
        {
            return Set<T>();
        }
        T IDataContext.Add<T>(T item)
        {
            return base.Add(item).Entity;
        }

        T IDataContext.Remove<T>(T item)
        {
            return base.Remove(item).Entity;
        }
        public async Task<int> Save()
        {
            ChangeTracker.DetectChanges();
            var result = await base.SaveChangesAsync();
            return result;
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
