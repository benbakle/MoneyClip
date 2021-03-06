﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using MoneyClip.EntityFramework;
using System;

namespace EntityFramework.Migrations
{
    [DbContext(typeof(ApplicationDataContext))]
    [Migration("20181221045249_ShortenIDFieldNameRevert")]
    partial class ShortenIDFieldNameRevert
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

                    b.Property<decimal>("Amount");

                    b.Property<string>("Description");

                    b.HasKey("IncomeID");

                    b.ToTable("Incomes");
                });

            modelBuilder.Entity("MoneyClip.Models.StoredValues", b =>
                {
                    b.Property<int>("StoredValuesId")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("BankBalance");

                    b.HasKey("StoredValuesId");

                    b.ToTable("Options");
                });

            modelBuilder.Entity("MoneyClip.Models.Transaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("Amount");

                    b.Property<DateTime>("Date");

                    b.Property<string>("Description");

                    b.HasKey("Id");

                    b.ToTable("Transactions");
                });
#pragma warning restore 612, 618
        }
    }
}
