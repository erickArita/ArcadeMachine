using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArcadeMachine.Infraestructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddMinihjuegoColors : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "minijuegos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ShadowColor",
                table: "minijuegos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "minijuegos");

            migrationBuilder.DropColumn(
                name: "ShadowColor",
                table: "minijuegos");
        }
    }
}
