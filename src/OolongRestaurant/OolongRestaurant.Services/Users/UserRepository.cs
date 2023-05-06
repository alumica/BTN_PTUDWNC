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

namespace OolongRestaurant.Services.Users
{
    public class UserRepository : IUserRepository
    {
        private readonly RestaurantDbContext _context;
        private readonly IMemoryCache _memoryCache;

        public UserRepository(
            RestaurantDbContext context,
            IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }

        public async Task<int> GetTotalUserAsync(
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<User>().CountAsync(cancellationToken);
        }

        public async Task<User> GetUserByIdAsync(
            int id,
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<User>()
                .Where(m => m.Id == id)
                .FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<User> GetCachedUserByIdAsync(
           int id,
           CancellationToken cancellationToken = default)
        {
            return await _memoryCache.GetOrCreateAsync(
                $"user.by-id.{id}",
                async (entry) =>
                {
                    entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30);
                    return await GetUserByIdAsync(id, cancellationToken);
                });
        }

        public async Task<bool> AddOrUpdateUserAsync(
            User user,
            CancellationToken cancellationToken = default)
        {
            if (user.Id > 0)
            {
                _context.Users.Update(user);
                _memoryCache.Remove($"user.by-id.{user.Id}");
            }
            else
            {
                _context.Users.Add(user);
            }

            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<IPagedList<User>> GetPagedUserAsync(
            IPagingParams pagingParams,
            CancellationToken cancellationToken = default)
        {
            IQueryable<User> userQuery = _context.Set<User>();
            return await userQuery
                .ToPagedListAsync(
                pagingParams,
                cancellationToken);
        }

        public async Task<IPagedList<User>> GetPagedUserAsync(
            int pageNumber = 1,
            int pageSize = 10,
            CancellationToken cancellationToken = default)
        {
            IQueryable<User> userQuery = _context.Set<User>();
            return await userQuery
                .ToPagedListAsync(
                pageNumber, pageSize,
                nameof(User.Email), "DESC",
                cancellationToken);
        }

        public async Task<IPagedList<T>> GetPagedUserAsync<T>(
            IPagingParams pagingParams,
            Func<IQueryable<User>, IQueryable<T>> mapper,
            string name = null,
            CancellationToken cancellationToken = default)
        {
            var userQuery = _context.Set<User>().AsNoTracking();

            if (!string.IsNullOrEmpty(name))
            {
                userQuery = userQuery.Where(x => x.FullName.Contains(name));
            }

            return await mapper(userQuery)
                .ToPagedListAsync(pagingParams, cancellationToken);
        }

        public async Task<bool> DeleteUserByIdAsync(
            int id,
            CancellationToken cancellationToken = default)
        {
            var user = await _context.Set<User>().FindAsync(id);
            if (user is null) return false;

            _context.Set<User>().Remove(user);
            var rowsCount = await _context.SaveChangesAsync(cancellationToken);

            return rowsCount > 0;
        }
    }
}
