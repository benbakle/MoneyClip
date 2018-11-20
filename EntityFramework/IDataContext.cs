using MoneyClip.Models;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyClip.EntityFramework
{
    public interface IDataContext
    {
        //T Add<T>(T item) where T : class;
        IQueryable<T> Query<T>() where T : class;
        //Task<int> Save();
        //Task<int> Save(string activity, object data = null);
    }
}
