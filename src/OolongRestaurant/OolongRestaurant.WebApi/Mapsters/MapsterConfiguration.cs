using Mapster;
using OolongRestaurant.Core.Entities;
using OolongRestaurant.WebApi.Models.Contact;

namespace OolongRestaurant.WebApi.Mapsters
{
    public class MapsterConfiguration : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            //// Author
            //config.NewConfig<Author, AuthorDto>();
            //config.NewConfig<Author, AuthorItem>()
            //    .Map(dest => dest.PostCount,
            //        src => src.Posts == null ? 0 : src.Posts.Count);

            //config.NewConfig<AuthorEditModel, Author>();


            //// Category
            //config.NewConfig<Category, CategoryDto>();
            //config.NewConfig<Category, CategoryItem>()
            //    .Map(dest => dest.PostCount,
            //        src => src.Posts == null ? 0 : src.Posts.Count);

            //config.NewConfig<CategoryEditModel, Category>();

            //// Contact
            //config.NewConfig<Contact, ContactDto>();
            //config.NewConfig<Contact, ContactItem>();

            //config.NewConfig<ContactEditModel, Category>();


            //// Tag
            //config.NewConfig<Tag, TagDto>();
            //config.NewConfig<Tag, TagItem>()
            //    .Map(dest => dest.PostCount,
            //        src => src.Posts == null ? 0 : src.Posts.Count);

            //config.NewConfig<TagEditModel, Tag>();


            config.NewConfig<Contact, ContactDto>();
            config.NewConfig<ContactEditModel, Contact>();


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