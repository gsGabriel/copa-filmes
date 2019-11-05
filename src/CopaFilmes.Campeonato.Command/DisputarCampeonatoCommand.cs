using CopaFilmes.Campeonato.Command.Results;
using MediatR;
using System.Collections.Generic;

namespace CopaFilmes.Campeonato.Command
{
    public class DisputarCampeonatoCommand : IRequest<DisputarCampeonatoCommandResult>
    {
        public DisputarCampeonatoCommand(IEnumerable<DisputarCampeonatoFilmesCommand> filmes)
        {
            Filmes = filmes;
        }

        public IEnumerable<DisputarCampeonatoFilmesCommand> Filmes { get; }
    }
}
