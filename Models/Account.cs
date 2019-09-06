namespace MoneyClip.Models
{
    public class Account
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Balance { get; set; } = 0;
        public string Url { get; set; }
        public AccountType Type { get; set; }
    }
}
