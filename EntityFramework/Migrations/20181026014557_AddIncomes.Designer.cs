﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using MoneyClip.EntityFramework;

namespace MoneyClip.Migrations
{
    [DbContext(typeof(ApplicationDataContext))]
    [Migration("20181026014557_AddIncomes")]
    partial class AddIncomes
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.3-rtm-10026")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MoneyClip.Models.Income", b =>
                {
                    b.Property<int>("IncomeID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.HasKey("IncomeID");

                    b.ToTable("Incomes");
                });
#pragma warning restore 612, 618
        }
    }
}
