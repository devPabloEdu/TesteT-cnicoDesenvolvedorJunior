using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AlunosCursosApi.Models
{
    public class AlunosModel
    {
        public int AlunoId { get; set; } 
        public string Nome { get; set; }
        public string  Email { get; set; }
        public DateTime Nascimento { get; set; }

        public List<MatriculasModel>? Matriculas { get; set; }

        //Metodo para validar se o aluno é menor de idade
        public bool VerificarIdade()
        {
            int idade = CalcularNascimento(Nascimento);
            return idade < 18;
        }

        private int CalcularNascimento(DateTime Nascimento)
        {
            int idade = DateTime.Now.Year - Nascimento.Year;

            if(DateTime.Now.Month < Nascimento.Month)
            {
                idade--;
            }

            return idade;
        } 
    }
}