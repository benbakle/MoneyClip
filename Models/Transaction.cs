using System;

namespace MoneyClip.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public string Number { get; set; }
        public bool Cleared { get; set; }
    }
}
