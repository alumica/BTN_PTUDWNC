using Mapster;
using OolongRestaurant.Core.Contracts;
using OolongRestaurant.Core.Entities;
using OolongRestaurant.WebApi.Models.Contact;
using OolongRestaurant.WebApi.Models.Food;
using OolongRestaurant.WebApi.Models.Menu;

namespace OolongRestaurant.WebApi.Mapsters
{
    public class MapsterConfiguration : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<Menu, MenuDto>()
                .Map(dest => dest.FoodCount,
                    src => src.Foods == null ? 0 : src.Foods.Count);
            config.NewConfig<MenuEditModel, Menu>();

            config.NewConfig<Contact, ContactDto>();
            config.NewConfig<ContactEditModel, Contact>();

            config.NewConfig<Food, FoodDto>();
            config.NewConfig<IList<Food>, IList<FoodDto>>();
            config.NewConfig<FoodEditModel, Food>();

            

           
            


            //// Comment
            //config.NewConfig<Comment, CommentDto>();

            //config.NewConfig<CommentEditModel, Comment>();


            //// Post
            //config.NewConfig<Post, PostDto>();
            //config.NewConfig<Post, PostDetail>();

            //config.NewConfig<PostFilterModel, PostQuery>()
            //    .Map(dest => dest.PublishedOnly, src => false);

            //config.NewConfig<IList<Post>, IList<PostDto>>();
        }
    }
}