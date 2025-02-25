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
    public class MatriculasController : ControllerBase
    {
        private readonly AppDbContext _context;
        
        public MatriculasController (AppDbContext context)
        {
            _context = context;
        }

        //Matricular um aluno ou criar uma matricula
        [HttpPost ("MatricularAluno")]
        public async Task<ActionResult> MatricularAluno([FromBody] List<int> cursoIds,int alunoId)
        {
            var aluno = await _context.Alunos.FindAsync(alunoId);

            var matriculas = cursoIds.Select(cursoIds => new MatriculasModel
            {
                AlunoId = alunoId,
                CursoId = cursoIds,
                Aluno = aluno,
                Curso = _context.Cursos.Find(cursoIds)                
            }
            ).ToList();

            _context.Matriculas.AddRange(matriculas);
            await _context.SaveChangesAsync();

            return Ok("Aluno matriculado com sucesso!");
        }

        //Listar todas os alunos matriculados
        [HttpGet ("ListarMatriculas")]
        public async Task<ActionResult<List<MatriculasModel>>> ListarMatriculas()
        {
            var matriculas = await _context.Matriculas
                .Include(m => m.Aluno)
                .Include(m => m.Curso)
                .ToListAsync();

            return Ok(matriculas);
        }

        //Listar Alunos de um curso especifico
        [HttpGet ("{CursoId}/ListarAlunosDeUmCurso")]
        public async Task<ActionResult<List<MatriculasModel>>> ListarMatriculasDeUmCurso(int CursoId)
        {
            var matriculasDoCurso = await _context.Matriculas
                .Where(m => m.CursoId == CursoId)
                .Include(m => m.Aluno)
                .ToListAsync();

            return Ok(matriculasDoCurso);
        }

        //Remover aluno de um curso
        [HttpDelete ("RemoverAlunoDoCurso")]
        public async Task<ActionResult<MatriculasModel>> RemoverMatriculaDoCurso(int AlunoId, int CursoId)
        {
            var matriculaRemovida = await _context.Matriculas.FirstOrDefaultAsync(m => m.AlunoId == AlunoId && m.CursoId == CursoId);
            _context.Matriculas.Remove(matriculaRemovida);
            await _context.SaveChangesAsync();

            return Ok("Aluno removido com sucesso do curso"); 
        }       
    }
}