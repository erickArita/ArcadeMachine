# Establecer la imagen base para la fase de compilación
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copiar solo el archivo del proyecto para restaurar las dependencias
COPY ArcadeMachine.csproj ./
RUN dotnet restore

# Copiar el resto de los archivos del proyecto
COPY . ./

# Publicar la aplicación en el directorio /app/out
RUN dotnet publish -c Release -o /app/out

# Establecer la imagen base para la fase de ejecución
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Copiar los archivos publicados desde la fase de compilación
COPY --from=build /app/out .

# Exponer el puerto en el que la aplicación escuchará
EXPOSE 80

# Establecer la variable de entorno para producción
ENV ASPNETCORE_ENVIRONMENT=Production

# Comando para ejecutar la aplicación
ENTRYPOINT ["dotnet", "ArcadeMachine.dll"]
