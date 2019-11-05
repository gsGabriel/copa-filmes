namespace CopaFilmes.Campeonato.Command.Results
{
    public class DisputarCampeonatoCommandResult
    {
        public DisputarCampeonatoCommandResult(string campeao, string viceCampeao)
        {
            Campeao = campeao;
            ViceCampeao = viceCampeao;
        }

        public string Campeao { get; }
        public string ViceCampeao { get; }
    }
}
