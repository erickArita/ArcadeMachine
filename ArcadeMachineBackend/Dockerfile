# Use the .NET 7 SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

# Set the working directory
WORKDIR /app

# Copy the project file and restore dependencies
COPY ArcadeMachine.csproj .
RUN dotnet restore

# Copy the entire source code
COPY ./ .

# Build the application in Release mode
RUN dotnet build --configuration Release

# Publish the application for production
RUN dotnet publish --configuration Release --output /out

# Use the .NET 7 runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final

# Set the working directory
WORKDIR /app

# Copy the published files from the build stage
COPY --from=build /out .

# Expose port 80
EXPOSE 80

# Set the entry point to run the application
ENTRYPOINT ["dotnet", "ArcadeMachine.dll"]