using Microsoft.EntityFrameworkCore;
using OolongRestaurant.Core.Contracts;
using OolongRestaurant.Core.Entities;
using OolongRestaurant.Services.Extensions;
using System.Threading.Tasks;

namespace OolongRestaurant.Services.Foods
{
    public interface IFoodRepository
    {
        Task<int> GetTotalFoodAsync(
            CancellationToken cancellationToken = default);

        Task<IPagedList<Food>> GetPagedFoodAsync(
            IPagingParams pagingParams,
            CancellationToken cancellationToken = default);

        Task<IPagedList<Food>> GetPagedFoodAsync(
            int pageNumber = 1,
            int pageSize = 10,
            CancellationToken cancellationToken = default);

        Task<IPagedList<Food>> GetPagedFoodAsync(
            int menuId,
            int pageNumber = 1,
            int pageSize = 10,
            CancellationToken cancellationToken = default);

        Task<IPagedList<Food>> GetPagedFoodAsync(
            string slug,
            int pageNumber = 1,
            int pageSize = 10,
            CancellationToken cancellationToken = default);

        Task<IPagedList<T>> GetPagedFoodAsync<T>(
            string slug, 
            IPagingParams pagingParams,
            Func<IQueryable<Food>, IQueryable<T>> mapper,
            CancellationToken cancellationToken = default);


        Task<Food> GetFoodByIdAsync(
            int id,
            CancellationToken cancellationToken = default);

        Task<Food> GetCachedFoodByIdAsync(
            int foodId,
            CancellationToken cancellationToken = default);

        Task<bool> AddOrUpdateFoodAsync(
            Food food,
            CancellationToken cancellationToken = default);

        Task<bool> DeleteFoodByIdAsync(
            int id,
            CancellationToken cancellationToken = default);

        Task<bool> SetImageUrlAsync(
            int id, string imageUrl,
            CancellationToken cancellationToken = default);
    }
}