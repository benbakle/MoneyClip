using System.Linq;
using MoneyClip.Models;
using System.Threading.Tasks;

namespace MoneyClip.Api
{
    public interface IDataContext
    {
        //T Add<T>(T item) where T : class;
        IQueryable<T> Query<T>() where T : class;
        //Task<int> Save();
        //Task<int> Save(string activity, object data = null);
    }
}
