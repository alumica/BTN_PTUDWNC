using Microsoft.EntityFrameworkCore;
using OolongRestaurant.Core.Entities;
using OolongRestaurant.Data.Contexts;
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

        public FoodRepository(RestaurantDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetTotalFoodAsync(
            CancellationToken cancellationToken = default)
        {
            return await _context.Set<Food>().CountAsync(cancellationToken);
        }
    }
}
