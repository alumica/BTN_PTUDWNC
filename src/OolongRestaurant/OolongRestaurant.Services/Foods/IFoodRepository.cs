namespace OolongRestaurant.Services.Foods
{
    public interface IFoodRepository
    {
        Task<int> GetTotalFoodAsync(
            CancellationToken cancellationToken = default);
    }
}