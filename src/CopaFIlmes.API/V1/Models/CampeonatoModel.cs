using CopaFilmes.Campeonato.Command.Results;
using MediatR;
using System.Collections.Generic;

namespace CopaFilmes.API.V1.Models
{
    public class CampeonatoModel : IRequest<DisputarCampeonatoCommandResult>
    {
        public IEnumerable<FilmesModel> Filmes { get; set; }
    }
}
