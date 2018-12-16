using Microsoft.EntityFrameworkCore.ChangeTracking;
using MoneyClip.Models;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyClip.EntityFramework
{
    public interface IDataContext
    {
        T Add<T>(T item) where T : class;
        T Remove<T>(T item) where T : class;
        IQueryable<T> Query<T>() where T : class;
        Task<int> Save();
        EntityEntry<T> Entry<T>(T entity) where T : class;
    }
}
