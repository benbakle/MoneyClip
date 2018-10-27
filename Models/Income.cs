using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoneyClip.Models
{
    public class Income
    {
        public int IncomeID { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; } = 0;
    }
}
