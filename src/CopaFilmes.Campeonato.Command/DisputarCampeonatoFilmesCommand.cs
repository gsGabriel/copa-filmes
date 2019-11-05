namespace CopaFilmes.Campeonato.Command
{
    public class DisputarCampeonatoFilmesCommand 
    {
        public DisputarCampeonatoFilmesCommand(string id, string titulo, int ano, double nota)
        {
            Id = id;
            Titulo = titulo;
            Ano = ano;
            Nota = nota;
        }

        public string Id { get; }
        public string Titulo { get; }
        public int Ano { get; }
        public double Nota { get; }
    }
}
