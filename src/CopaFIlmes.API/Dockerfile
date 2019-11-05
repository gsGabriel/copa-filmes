FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /src
COPY ["src/CopaFilmes.API/CopaFilmes.API.csproj", "src/CopaFilmes.API/"]
RUN dotnet restore "src/CopaFilmes.API/CopaFilmes.API.csproj"
COPY . .
WORKDIR "/src/src/CopaFilmes.API"
RUN dotnet build "CopaFilmes.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CopaFilmes.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CopaFilmes.API.dll"]
