using OolongRestaurant.Core.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OolongRestaurant.Core.Entities
{
    public class Food : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        public int MenuId { get; set; }

        public Menu Menu { get; set; }
    }
}
