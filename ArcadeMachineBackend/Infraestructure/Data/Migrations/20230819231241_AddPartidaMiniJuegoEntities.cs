using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArcadeMachine.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddPartidaMiniJuegoEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "minijuegos",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    nombre = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_minijuegos", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "partidas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    usuario1Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    usuario2Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    puntajeUsuario1 = table.Column<int>(type: "int", nullable: false),
                    puntajeUsuario2 = table.Column<int>(type: "int", nullable: false),
                    usuario1Id1 = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    usuario2Id1 = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    juegoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_partidas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_partidas_AspNetUsers_usuario1Id1",
                        column: x => x.usuario1Id1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_partidas_AspNetUsers_usuario2Id1",
                        column: x => x.usuario2Id1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_partidas_minijuegos_juegoId",
                        column: x => x.juegoId,
                        principalTable: "minijuegos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_partidas_juegoId",
                table: "partidas",
                column: "juegoId");

            migrationBuilder.CreateIndex(
                name: "IX_partidas_usuario1Id1",
                table: "partidas",
                column: "usuario1Id1");

            migrationBuilder.CreateIndex(
                name: "IX_partidas_usuario2Id1",
                table: "partidas",
                column: "usuario2Id1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "partidas");

            migrationBuilder.DropTable(
                name: "minijuegos");
        }
    }
}
