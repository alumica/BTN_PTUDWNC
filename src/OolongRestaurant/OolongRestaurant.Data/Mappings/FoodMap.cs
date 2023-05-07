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
    public class FoodMap : IEntityTypeConfiguration<Food>
    {
        public void Configure(EntityTypeBuilder<Food> builder)
        {
            builder.ToTable("Foods");

            builder.HasKey(f => f.Id);

            builder.Property(f => f.Name)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(f => f.Description)
                .HasMaxLength(500);

            builder.Property(f => f.Price)
                .IsRequired()
                .HasColumnType("float");

            builder.HasOne(f => f.Menu)
                .WithMany(m => m.Foods)
                .HasForeignKey(f => f.MenuId)
                .HasConstraintName("FK_Foods_Menus")
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
