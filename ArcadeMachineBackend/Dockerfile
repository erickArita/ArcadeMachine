# Usamos la imagen del SDK de .NET 7 para compilar la aplicación
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

# Definimos el directorio de trabajo
WORKDIR /app

# Copiamos el archivo del proyecto (esto incluye todas las carpetas dentro de ArcadeMachine)
COPY ArcadeMachine.csproj .

# Restauramos las dependencias de NuGet
RUN dotnet restore

# Copiamos todo el código fuente
COPY . .

# Compilamos la aplicación en modo Release
RUN dotnet build --configuration Release --no-restore

# Publicamos la aplicación para optimizarla y dejarla lista para producción
RUN dotnet publish --configuration Release --no-build --output /out

# Usamos la imagen de runtime de .NET 7 para ejecutar la aplicación
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final

# Definimos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos publicados desde el contenedor de build
COPY --from=build /out .

# Exponemos el puerto 80 (o el que utilice tu app)
EXPOSE 80

# Indicamos el comando para ejecutar la aplicación
ENTRYPOINT ["dotnet", "ArcadeMachine.dll"]
