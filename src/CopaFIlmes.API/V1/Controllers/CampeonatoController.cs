using CopaFilmes.API.V1.Models;
using CopaFilmes.Campeonato.Command;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Linq;
using System.Threading.Tasks;

namespace CopaFilmes.API.V1.Controllers
{
    [ApiController, ApiVersion("1.0"), Route("api/v{version:apiVersion}/[controller]")]
    public class CampeonatoController : ControllerBase
    {
        private readonly IMediator mediator;

        public CampeonatoController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Gera a disputa do campeonato com os filmes selecionados")]
        [SwaggerResponse(200, "Resultado do campeonato")]
        [SwaggerResponse(400, "Número de filmes excedente ou inferior a 8")]
        public async Task<IActionResult> Post([FromBody] CampeonatoModel command)
        {
            return Ok(await mediator.Send(new DisputarCampeonatoCommand(command.Filmes.Select(x => new DisputarCampeonatoFilmesCommand(x.Id, x.Titulo, x.Ano, x.Nota)))));
        }
    }
}