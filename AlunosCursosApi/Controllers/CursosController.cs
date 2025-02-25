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
    public class CursosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CursosController (AppDbContext context)
        {
            _context = context;
        }

        //listar todos os cursos existentes
        [HttpGet ("/ListarCursos")]
        public async Task<ActionResult<List<CursosModel>>> GetCursos()
        {
            return await _context.Cursos.ToListAsync();
        }
        [HttpGet ("{CursoId}/ObterCursoPorId")]
        public async Task<ActionResult<CursosModel>> ObterCursoPeloId(int CursoId)
        {
            var cursoObtido = await _context.Cursos.FindAsync(CursoId);
            return cursoObtido;
        }

        //Criar um curso
        [HttpPost ("/CriarCurso")]
        public async Task<ActionResult> PostCurso([FromBody] CursosModel curso)
        {
            _context.Cursos.Add(curso);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(ObterCursoPeloId), new {CursoId = curso.CursoId}, curso);
        }

        //Editar um Curso existente
        [HttpPut ("{CursoId}")]
        public async Task<ActionResult<CursosModel>> EditarCurso(int CursoId, [FromBody] CursosModel curso)
        {
            var cursoObtido = await _context.Cursos.FindAsync(CursoId);
            //Após encontrar o curso pelo ID ele busca o id no banco de dados
            _context.Cursos.Attach(cursoObtido);
            
            cursoObtido.Nome = curso.Nome;
            cursoObtido.Descricao = curso.Descricao;

            _context.Entry(cursoObtido).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //Deletar um curso
        [HttpDelete ("{CursoId}")]
        public async Task<ActionResult> DeletarCurso(int CursoId)
        {
            var cursoDeletado = await _context.Cursos.FindAsync(CursoId);
            _context.Cursos.Remove(cursoDeletado);
            await _context.SaveChangesAsync();
            return NoContent();

        }
    }
}