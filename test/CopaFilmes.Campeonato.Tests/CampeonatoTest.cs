using CopaFilmes.Campeonato.Command;
using CopaFilmes.Campeonato.CommandHandler;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace CopaFilmes.Campeonato.Tests
{
    public class CampeonatoTest
    {
        [Fact]
        public void DeveCriarInstanciaDoDisputarCampeonatoFilmesCommand()
        {
            var idEsperado = "tt3606756";
            var tituloEsperado = "Os Incríveis 2";
            var anoEsperado = 2018;
            var notaEsperada = 8.5;

            var command = new DisputarCampeonatoFilmesCommand(idEsperado, tituloEsperado, anoEsperado, notaEsperada);

            Assert.Equal(idEsperado, command.Id);
            Assert.Equal(tituloEsperado, command.Titulo);
            Assert.Equal(anoEsperado, command.Ano);
            Assert.Equal(notaEsperada, command.Nota);
        }

        [Fact]
        public void DeveCriarInstanciaDoDisputarCampeonatoCommand()
        {
            var filmes = new List<DisputarCampeonatoFilmesCommand>
            {
                new DisputarCampeonatoFilmesCommand("tt3606756", "Os Incríveis 2", 2018, 8.5)
            };

            var command = new DisputarCampeonatoCommand(filmes);

            Assert.Equal(filmes.Count(), command.Filmes.Count());
            Assert.Equal(filmes.First(), command.Filmes.First());
        }

        [Fact]
        public async Task NaoDeveDisputarCampeonatoNumeroDeFilmesNaoPermitido()
        {
            var filmes = new List<DisputarCampeonatoFilmesCommand>
            {
                new DisputarCampeonatoFilmesCommand("tt3606756", "Os Incríveis 2", 2018, 8.5)
            };

            await Assert.ThrowsAsync<InvalidOperationException>(() =>
                new DisputarCampeonatoCommandHandler().Handle(new DisputarCampeonatoCommand(filmes), new CancellationToken()));
        }

        [Fact]
        public async Task DeveDisputarCampeonatoETerUmCampeao()
        {
            var ganhadorEsperado = "Vingadores: Guerra Infinita";

            var filmes = new List<DisputarCampeonatoFilmesCommand>
            {
                new DisputarCampeonatoFilmesCommand("tt3606756", "Os Incríveis 2", 2018, 8.5),
                new DisputarCampeonatoFilmesCommand("tt4881806", "Jurassic World: Reino Ameaçado", 2018, 6.7),
                new DisputarCampeonatoFilmesCommand("tt5164214", "Oito Mulheres e um Segredo", 2018, 6.3),
                new DisputarCampeonatoFilmesCommand("tt7784604", "Hereditário", 2018, 7.8),
                new DisputarCampeonatoFilmesCommand("tt4154756", "Vingadores: Guerra Infinita",  2018,  8.8),
                new DisputarCampeonatoFilmesCommand("tt5463162", "Deadpool 2",  2018,  8.1),
                new DisputarCampeonatoFilmesCommand("tt3778644", "Han Solo: Uma História Star Wars",  2018,  7.2),
                new DisputarCampeonatoFilmesCommand("tt3501632", "Thor: Ragnarok",  2017,  7.9)
            };

            var command = new DisputarCampeonatoCommand(filmes);
            var commandResult = await new DisputarCampeonatoCommandHandler().Handle(command, new CancellationToken());

            Assert.NotNull(commandResult);
            Assert.Equal(ganhadorEsperado, commandResult.Campeao);
            Assert.NotEqual(ganhadorEsperado, commandResult.ViceCampeao);
        }
    }
}
