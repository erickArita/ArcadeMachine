using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArcadeMachine.Infraestructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddImage2Minijuego : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Img",
                table: "minijuegos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Img",
                table: "minijuegos");
        }
    }
}
