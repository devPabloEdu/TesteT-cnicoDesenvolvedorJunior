using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AlunosCursosApi.Models
{
    public class AlunosModel
    {
        public int AlunoId { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public DateTime Nascimento { get; set; }

        public List<MatriculasModel> Matriculas { get; set; }
    }
}