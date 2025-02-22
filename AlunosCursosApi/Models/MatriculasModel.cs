using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlunosCursosApi.Models
{
    public class MatriculasModel
    {
        public int AlunoId { get; set; }
        public AlunosModel Aluno { get; set; }
        public int CursoId { get; set; }
        public CursosModel Curso { get; set; }
    }
}