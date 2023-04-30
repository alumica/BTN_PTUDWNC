using Microsoft.EntityFrameworkCore;
using OolongRestaurant.Core.Entities;
using OolongRestaurant.Data.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OolongRestaurant.Data.Contexts
{
    public class RestaurantDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Tag> Tags { get; set; }

        public DbSet<Menu> Menus { get; set; }

        public DbSet<Food> Foods { get; set; }

        public DbSet<Contact> Contacts { get; set; }

        public RestaurantDbContext() { }

        public RestaurantDbContext(DbContextOptions<RestaurantDbContext> options) : base(options)
        { }

        protected override void OnConfiguring(
            DbContextOptionsBuilder optionsBuilder)
        {
            // Bạn phải thay đổi chuổi kết nối cho phù hợp
            optionsBuilder.UseSqlServer(@"Data Source=LAPTOP-OF-KIET\SQLEXPRESS;Initial Catalog=OolongRestaurant;Integrated Security=True;TrustServerCertificate=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(
                typeof(MenuMap).Assembly);
        }
    }
}
