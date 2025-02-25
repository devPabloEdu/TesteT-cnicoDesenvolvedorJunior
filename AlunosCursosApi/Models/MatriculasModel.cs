using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace AlunosCursosApi.Models
{
    public class MatriculasModel
    {
        public int AlunoId { get; set; }
        [JsonIgnore]
        public AlunosModel Aluno { get; set; }
        public int CursoId { get; set; }
        [JsonIgnore]
        public CursosModel Curso { get; set; }
    }
}