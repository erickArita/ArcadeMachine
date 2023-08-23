using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArcadeMachine.Infraestructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddDateAndDeleteNoActionPartida : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_partidas_AspNetUsers_usuario1Id1",
                table: "partidas");

            migrationBuilder.DropForeignKey(
                name: "FK_partidas_AspNetUsers_usuario2Id1",
                table: "partidas");

            migrationBuilder.DropIndex(
                name: "IX_partidas_usuario1Id1",
                table: "partidas");

            migrationBuilder.DropIndex(
                name: "IX_partidas_usuario2Id1",
                table: "partidas");

            migrationBuilder.DropColumn(
                name: "usuario1Id1",
                table: "partidas");

            migrationBuilder.DropColumn(
                name: "usuario2Id1",
                table: "partidas");

            migrationBuilder.AlterColumn<string>(
                name: "usuario2Id",
                table: "partidas",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<string>(
                name: "usuario1Id",
                table: "partidas",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<DateTime>(
                name: "fechaPartida",
                table: "partidas",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_partidas_usuario1Id",
                table: "partidas",
                column: "usuario1Id");

            migrationBuilder.CreateIndex(
                name: "IX_partidas_usuario2Id",
                table: "partidas",
                column: "usuario2Id");

            migrationBuilder.AddForeignKey(
                name: "FK_partidas_AspNetUsers_usuario1Id",
                table: "partidas",
                column: "usuario1Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_partidas_AspNetUsers_usuario2Id",
                table: "partidas",
                column: "usuario2Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_partidas_AspNetUsers_usuario1Id",
                table: "partidas");

            migrationBuilder.DropForeignKey(
                name: "FK_partidas_AspNetUsers_usuario2Id",
                table: "partidas");

            migrationBuilder.DropIndex(
                name: "IX_partidas_usuario1Id",
                table: "partidas");

            migrationBuilder.DropIndex(
                name: "IX_partidas_usuario2Id",
                table: "partidas");

            migrationBuilder.DropColumn(
                name: "fechaPartida",
                table: "partidas");

            migrationBuilder.AlterColumn<Guid>(
                name: "usuario2Id",
                table: "partidas",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<Guid>(
                name: "usuario1Id",
                table: "partidas",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "usuario1Id1",
                table: "partidas",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "usuario2Id1",
                table: "partidas",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_partidas_usuario1Id1",
                table: "partidas",
                column: "usuario1Id1");

            migrationBuilder.CreateIndex(
                name: "IX_partidas_usuario2Id1",
                table: "partidas",
                column: "usuario2Id1");

            migrationBuilder.AddForeignKey(
                name: "FK_partidas_AspNetUsers_usuario1Id1",
                table: "partidas",
                column: "usuario1Id1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_partidas_AspNetUsers_usuario2Id1",
                table: "partidas",
                column: "usuario2Id1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
