using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;

namespace AlunosCursosApi.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        
        public DbSet<AlunosModel> Alunos {get; set;}
        public DbSet<CursosModel> Cursos { get; set; }

        public DbSet<MatriculasModel> Matriculas {get; set;}


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {   
            modelBuilder.Entity<AlunosModel>()
                .HasKey(m => m.AlunoId);

            modelBuilder.Entity<CursosModel>()
                .HasKey(m => m.CursoId);
            
            modelBuilder.Entity<MatriculasModel>()
                .HasKey(m => new {m.AlunoId, m.CursoId}); //chave composta
            
            modelBuilder.Entity<MatriculasModel>()
                .HasOne(m => m.Aluno)
                .WithMany(a => a.Matriculas)
                .HasForeignKey(m => m.AlunoId);

            modelBuilder.Entity<MatriculasModel>()
                .HasOne(m => m.Curso)
                .WithMany(c => c.Matriculas)
                .HasForeignKey(m => m.CursoId);
        }
    }
}