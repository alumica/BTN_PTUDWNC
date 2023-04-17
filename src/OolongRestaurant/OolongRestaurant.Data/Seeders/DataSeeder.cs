using OolongRestaurant.Core.Entities;
using OolongRestaurant.Data.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OolongRestaurant.Data.Seeders
{
    public class DataSeeder : IDataSeeder
    {
        private readonly RestaurantDbContext _restaurantDbContext;

        public DataSeeder(RestaurantDbContext restaurantDbContext)
        {
            _restaurantDbContext = restaurantDbContext;
        }

        public void Initialize()
        {
            _restaurantDbContext.Database.EnsureCreated();

            if (_restaurantDbContext.Menus.Any()) return;

            var foods = AddFood();
            var menus = AddMenu();
            var users = AddUser();
        }

        private IList<Food> AddFood()
        {
            throw new NotImplementedException();
        }

        private IList<Menu> AddMenu()
        {
            throw new NotImplementedException();
        }

        private IList<User> AddUser()
        {
            throw new NotImplementedException();
        }
    }
}
