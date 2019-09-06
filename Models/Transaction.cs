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
        public Type Type { get; set; }
        public Category Category { get; set; }
    }
}
