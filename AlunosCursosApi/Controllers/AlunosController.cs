using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AlunosCursosApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlunosCursosApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlunosController : ControllerBase
    {
        private readonly AppDbContext _context;
        
        public AlunosController (AppDbContext context)
        {
            _context = context;
        }

        //Listar Alunos
        [HttpGet ("ListarAlunos")]
        public async Task<ActionResult<List<AlunosModel>>> ListarAlunos()
        {
            return await _context.Alunos.ToListAsync();
        }

        //Buscar um aluno por ID
        [HttpGet ("{AlunoId}/ObterAlunoPorId")]
        public async Task<ActionResult<AlunosModel>> BuscarAlunoPeloID(int AlunoId)
        {
            var alunoObtido = await _context.Alunos.FindAsync(AlunoId);
            return alunoObtido;
        }

        //Criar um aluno
        [HttpPost ("CriarAluno")]
        public async Task<ActionResult> CriarAluno([FromBody] AlunosModel aluno)
        {
            if(aluno.VerificarIdade())
            {
                return BadRequest("O aluno deve possuir mais de 18 anos");
            }
            
            _context.Alunos.Add(aluno);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(BuscarAlunoPeloID), new {AlunoId = aluno.AlunoId}, aluno);
        }

        //Editar um Aluno
        [HttpPut ("{AlunoId}")]
        public async Task<ActionResult<AlunosModel>> EditarAluno(int AlunoId, [FromBody] AlunosModel aluno)
        {
            var alunoObtido = await _context.Alunos.FindAsync(AlunoId);
            _context.Alunos.Attach(alunoObtido);

            alunoObtido.Nome = aluno.Nome;
            alunoObtido.Email = aluno.Email;
            alunoObtido.Nascimento = aluno.Nascimento;

            _context.Entry(alunoObtido).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //Deletar um aluno
        [HttpDelete ("{AlunoId}")]
        public async Task<ActionResult> DeletarAluno(int AlunoId)
        {
            var alunoDeletado = await _context.Alunos.FindAsync(AlunoId);
            _context.Alunos.Remove(alunoDeletado);

            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}