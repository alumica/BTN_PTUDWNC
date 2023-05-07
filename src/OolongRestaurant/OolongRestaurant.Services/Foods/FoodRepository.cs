using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using OolongRestaurant.Core.Contracts;
using OolongRestaurant.Core.Entities;
using OolongRestaurant.Data.Contexts;
using OolongRestaurant.Services.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OolongRestaurant.Services.Foods
{
    public class FoodRepository : IFoodRepository
    {
        private readonly RestaurantDbContext _context;
        private readonly IMemoryCache _memoryCache;


        public FoodRepository(RestaurantDbContext context, IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }

        public async Task<int> GetTotalFoodAsync(
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<Food>().CountAsync(cancellationToken);
        }

        public async Task<IPagedList<Food>> GetPagedFoodAsync(
            IPagingParams pagingParams,
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<Food>()
                .ToPagedListAsync(pagingParams, cancellationToken);
        }

        public async Task<IPagedList<Food>> GetPagedFoodAsync(
            int pageNumber = 1,
            int pageSize = 10,
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<Food>()
                .ToPagedListAsync(
                    pageNumber,
                    pageSize,
                    nameof(Food.Name),
                    "DESC", cancellationToken);
        }

        public async Task<IPagedList<Food>> GetPagedFoodAsync(
            int menuId,
            int pageNumber = 1,
            int pageSize = 10,
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<Food>()
                .Where(f => f.MenuId == menuId)
                .ToPagedListAsync(
                    pageNumber,
                    pageSize,
                    nameof(Food.Name),
                    "DESC", cancellationToken);
        }

        public async Task<IPagedList<Food>> GetPagedFoodAsync(
            string slug,
            int pageNumber = 1,
            int pageSize = 10,
            CancellationToken cancellationToken = default)
        {
            IQueryable<Food> query = _context.Set<Food>()
                .Include(f => f.Menu);

            return await query
                .Where(f => f.Menu.UrlSlug == slug)
                .ToPagedListAsync(
                    pageNumber,
                    pageSize,
                    nameof(Food.Name),
                    "DESC", cancellationToken);
        }

        public async Task<IPagedList<T>> GetPagedFoodAsync<T>(
            string slug,
            IPagingParams pagingParams,
            Func<IQueryable<Food>, IQueryable<T>> mapper,
            CancellationToken cancellationToken = default)
        {
            var foodList = _context.Set<Food>().Include(f => f.Menu).Where(f => f.Menu.UrlSlug == slug);
            var mapperList = mapper(foodList);
            return await mapperList
                .ToPagedListAsync(pagingParams, cancellationToken);
        }

        public async Task<Food> GetFoodByIdAsync(
            int id,
            CancellationToken cancellationToken = default)
        {
            var query = _context.Set<Food>();
            return await query
                .Where(f => f.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<Food> GetCachedFoodByIdAsync(
            int foodId,
            CancellationToken cancellationToken = default)
        {
            return await _memoryCache.GetOrCreateAsync(
                $"food.by-id.{foodId}",
                async (entry) =>
                {
                    entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30);
                    return await GetFoodByIdAsync(foodId, cancellationToken);
                });
        }

        public async Task<bool> AddOrUpdateFoodAsync(
            Food food,
            CancellationToken cancellationToken = default)
        {
            if (food.Id > 0)
            {
                _context.Foods.Update(food);
                _memoryCache.Remove($"food.by-id.{food.Id}");
            }
            else
            {
                _context.Foods.Add(food);
            }

            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> DeleteFoodByIdAsync(
            int id,
            CancellationToken cancellationToken = default)
        {
            var food = await _context.Set<Food>().FindAsync(id);

            if (food is null) return false;

            _context.Set<Food>().Remove(food);
            var rowsCount = await _context.SaveChangesAsync(cancellationToken);

            return rowsCount > 0;
        }

        public async Task<bool> SetImageUrlAsync(
            int id, string imageUrl,
            CancellationToken cancellationToken = default)
        {
            return await _context.Foods
                .Where(x => x.Id == id)
                .ExecuteUpdateAsync(x =>
                    x.SetProperty(a => a.ImageUrl, a => imageUrl),
                    cancellationToken) > 0;
        }
    }
}
