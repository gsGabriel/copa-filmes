using CopaFilmes.Campeonato.Command;
using CopaFilmes.Campeonato.Command.Results;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CopaFilmes.Campeonato.CommandHandler
{
    public class DisputarCampeonatoCommandHandler : IRequestHandler<DisputarCampeonatoCommand, DisputarCampeonatoCommandResult>
    {
        public Task<DisputarCampeonatoCommandResult> Handle(DisputarCampeonatoCommand request, CancellationToken cancellationToken)
        {
            if (request.Filmes.Count() > 8 || request.Filmes.Count() < 8)
                throw new InvalidOperationException($"Foram selecionados {request.Filmes.Count()} filmes, porém o número para realização da copa é 8.");

            var filmes = request.Filmes.OrderBy(x => x.Titulo).ToList();

            //Enquanto não houver finalistas
            while (filmes.Count() != 2)
            {
                var partidas = GerarPartidas(filmes);

                var chave1 = new List<DisputarCampeonatoFilmesCommand>();
                var chave2 = new List<DisputarCampeonatoFilmesCommand>();
                foreach (var partida in partidas)
                {
                    var (ganhador, eliminado) = VerificarGanhador(partida.Value);

                    //Verifica se a chave da partida é impar ou par, pra manter a ordem do chaveamento
                    if (partida.Key % 2 == 0)
                        chave1.Add(ganhador);
                    else
                        chave2.Add(ganhador);
                }

                filmes.AddRange(chave1);
                filmes.AddRange(chave2);
            }

            var (primeiro, segundo) = VerificarGanhador(filmes);

            return Task.FromResult(new DisputarCampeonatoCommandResult(primeiro.Titulo, segundo.Titulo));
        }

        private (DisputarCampeonatoFilmesCommand primeiro, DisputarCampeonatoFilmesCommand segundo) VerificarGanhador(List<DisputarCampeonatoFilmesCommand> partida)
        {
            //O ganhador possui a maior nota, em caso de empate a ordem alfabetica deve ser levada em conta
            var ordenacao = partida.OrderByDescending(x => x.Nota).ThenBy(x => x.Titulo);
            return (ordenacao.First(), ordenacao.Last());
        }

        private Dictionary<int, List<DisputarCampeonatoFilmesCommand>> GerarPartidas(List<DisputarCampeonatoFilmesCommand> filmes)
        {
            var partidas = new Dictionary<int, List<DisputarCampeonatoFilmesCommand>>();

            int i = 0;
            while (filmes.Count() > 0)
            {
                var (primeiro, ultimo) = SortearPorPrimeiroUltimo(filmes);

                var timesEmPartida = new List<DisputarCampeonatoFilmesCommand> { primeiro, ultimo };

                partidas.Add(i++, timesEmPartida);

                filmes.Remove(primeiro);
                filmes.Remove(ultimo);
            }

            return partidas;
        }

        private (DisputarCampeonatoFilmesCommand primeiro, DisputarCampeonatoFilmesCommand ultimo) SortearPorPrimeiroUltimo(IEnumerable<DisputarCampeonatoFilmesCommand> filmes)
        {
            return (filmes.First(), filmes.Last());
        }
    }
}
