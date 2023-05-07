using System.ComponentModel;

namespace OolongRestaurant.WebApi.Models.Food
{
    public class FoodFilterModel : PagingModel
    {
        [DefaultValue(false)]
        public bool? IsPaged { get; set; }
    }
}
