using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace EntityFramework.Migrations
{
    public partial class ShortenIdFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StoredValuesId",
                table: "Options",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "IncomeID",
                table: "Incomes",
                newName: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Options",
                newName: "StoredValuesId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Incomes",
                newName: "IncomeID");
        }
    }
}
