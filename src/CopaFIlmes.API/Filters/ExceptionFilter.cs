using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.WebUtilities;

namespace CopaFilmes.API.Filters
{
    public class ExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var problemDetails = new ProblemDetails
            {
                Type = $"https://httpstatuses.com/{400}",
                Title = ReasonPhrases.GetReasonPhrase(400),
                Detail = context.Exception.Message,
                Instance = "about:blank",
                Status = 400
            };

            context.ExceptionHandled = true;
            context.Result = new ObjectResult(problemDetails)
            {
                StatusCode = 400,
                DeclaredType = context.Exception.GetType()
            };
        }
    }
}
