using Microsoft.EntityFrameworkCore;
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
            var contacts = AddContact();
        }

        private IList<Contact> AddContact()
        {
            var contacts = new List<Contact>()
            {
                new()
                {
                    FullName = "Huỳnh Tấn Thanh",
                    Email = "thanhht@gmail.com",
                    Subject = "Hello",
                    Description = "Thanks"
                },
                new()
                {
                    FullName = "Đặng Ngọc Thắng",
                    Email = "thangdn@gmail.com",
                    Subject = "Super good",
                    Description = "Thanks"
                },
                new()
                {
                    FullName = "Nguyễn Tuấn Kiệt",
                    Email = "kietnt@gmail.com",
                    Subject = "Nice",
                    Description = "Thanks"
                },
            };


            foreach (var contact in contacts)
            {
                if (!_restaurantDbContext.Contacts.Any(a => a.Email == contact.Email))
                    _restaurantDbContext.Contacts.Add(contact);
            }

            _restaurantDbContext.SaveChanges();

            return contacts;
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
