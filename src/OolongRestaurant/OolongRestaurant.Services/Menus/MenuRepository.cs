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

namespace OolongRestaurant.Services.Menus
{
    public class MenuRepository : IMenuRepository
    {
        private readonly RestaurantDbContext _context;
        private readonly IMemoryCache _memoryCache;

        public MenuRepository(
            RestaurantDbContext context,
            IMemoryCache memoryCache)
        { 
            _context = context;
            _memoryCache = memoryCache;
        }

        public async Task<bool> IsMenuSlugExistedAsync(
            int id,
            string slug,
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<Menu>()
                .AnyAsync(x => x.Id != id && x.UrlSlug == slug,
                cancellationToken);
        }

        public async Task<IList<Menu>> GetMenusAsync(
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<Menu>()
                .ToListAsync(cancellationToken);
        }

        public async Task<Menu> GetMenuByIdAsync(
            int id,
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<Menu>()
                .Where(m => m.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<Menu> GetMenuBySlugAsync(
            string slug,
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<Menu>()
                .Where(m => m.UrlSlug == slug)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<Menu> GetCachedMenuByIdAsync(
           int id,
           CancellationToken cancellationToken = default)
        {
            return await _memoryCache.GetOrCreateAsync(
                $"menu.by-id.{id}",
                async (entry) =>
                {
                    entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30);
                    return await GetMenuByIdAsync(id, cancellationToken);
                });
        }

        public async Task<bool> AddOrUpdateMenuAsync(
            Menu menu,
            CancellationToken cancellationToken = default)
        {
            if (menu.Id > 0)
            {
                _context.Menus.Update(menu);
                _memoryCache.Remove($"menu.by-id.{menu.Id}");
            }
            else
            {
                _context.Menus.Add(menu);
            }

            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<IPagedList<Menu>> GetPagedMenuAsync(
            IPagingParams pagingParams,
            CancellationToken cancellationToken = default)
        {
            IQueryable<Menu> menuQuery = _context.Set<Menu>();
            return await menuQuery
                .ToPagedListAsync(
                pagingParams,
                cancellationToken);
        }

        public async Task<IPagedList<Menu>> GetPagedMenuAsync(
            int pageNumber = 1,
            int pageSize = 10,
            CancellationToken cancellationToken = default)
        {
            IQueryable<Menu> menuQuery = _context.Set<Menu>();
            return await menuQuery
                .ToPagedListAsync(
                pageNumber, pageSize,
                nameof(Menu.Name), "DESC",
                cancellationToken);
        }

        public async Task<bool> DeleteMenuByIdAsync(
            int id,
            CancellationToken cancellationToken = default)
        {
            var menu = await _context.Set<Menu>().FindAsync(id);

            if (menu is null) return false;

            _context.Set<Menu>().Remove(menu);
            var rowsCount = await _context.SaveChangesAsync(cancellationToken);

            return rowsCount > 0;
        }

        public async Task<IPagedList<Food>> GetPagedFoodAsync(
            IPagingParams pagingParams,
            CancellationToken cancellationToken = default)
        {
            IQueryable<Food> foodQuery = _context.Set<Food>();
            return await foodQuery
                .ToPagedListAsync(
                pagingParams,
                cancellationToken);
        }

        public async Task<IPagedList<Food>> GetPagedFoodAsync(
            int pageNumber = 1,
            int pageSize = 10,
            CancellationToken cancellationToken = default)
        {
            IQueryable<Food> foodQuery = _context.Set<Food>();
            return await foodQuery
                .ToPagedListAsync(
                pageNumber, pageSize,
                nameof(Food.Name), "DESC",
                cancellationToken);
        }
    }
}
