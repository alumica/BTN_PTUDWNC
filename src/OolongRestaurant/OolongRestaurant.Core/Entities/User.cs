using OolongRestaurant.Core.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OolongRestaurant.Core.Entities
{
    public class User : IEntity
    {
        public int Id { get; set; }

        public string FullName { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string ImageUrl { get; set; }

        public bool TypeUser { get; set; }
    }
}
