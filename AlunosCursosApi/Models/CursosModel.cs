using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace AlunosCursosApi.Models
{
    public class CursosModel
    {
        public int CursoId { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }

        public List<MatriculasModel> Matriculas { get; set; }
    }
}