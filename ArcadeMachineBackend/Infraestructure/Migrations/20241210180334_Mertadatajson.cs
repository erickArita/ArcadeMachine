using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArcadeMachine.Infraestructure.Migrations
{
    /// <inheritdoc />
    public partial class Mertadatajson : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Metadata",
                table: "minijuegos",
                type: "jsonb",
                nullable: false,
                defaultValue: "{}");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Metadata",
                table: "minijuegos");
        }
    }
}
