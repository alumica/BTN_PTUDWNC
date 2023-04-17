using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OolongRestaurant.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OolongRestaurant.Data.Mappings
{
    public class UserMap : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.FullName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.UserName)
                .IsRequired()
                .HasMaxLength(20);

            builder.Property(x => x.Password)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(x => x.Email)
                .HasMaxLength(150);

            builder.Property(x => x.ImageUrl)
                .HasMaxLength(500);

            builder.Property(x => x.TypeUser)
                .IsRequired()
                .HasDefaultValue(false);
        }
    }
}
