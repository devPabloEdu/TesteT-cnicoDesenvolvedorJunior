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
    }
}