import React, { useEffect, useState } from 'react';
import { alunoService } from '../Services/AlunoService';
import { cursoService } from '../Services/CursoService';
import { matriculaService } from '../Services/MatriculaService';

const MatriculaForm: React.FC<{ onSave: () => void }> = ({ onSave }) => {
  const [alunos, setAlunos] = useState<any[]>([]);
  const [cursos, setCursos] = useState<any[]>([]);
  const [selectedAlunoId, setSelectedAlunoId] = useState<number | null>(null);
  const [selectedCursos, setSelectedCursos] = useState<number[]>([]);

  // Carregar alunos e cursos ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      const alunosData = await alunoService.listarAlunos();
      const cursosData = await cursoService.listarCursos();
      setAlunos(alunosData);
      setCursos(cursosData);
    };
    fetchData();
  }, []);

  // Alterar cursos selecionados
  const handleCursoChange = (cursoId: number) => {
    setSelectedCursos((prevState) =>
      prevState.includes(cursoId)
        ? prevState.filter((id) => id !== cursoId)
        : [...prevState, cursoId]
    );
  };

  // Realizar a matrícula
  const handleMatricula = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAlunoId && selectedCursos.length > 0) {
      await matriculaService.matricularAluno(selectedAlunoId, selectedCursos);
      onSave(); // Notifica que a matrícula foi realizada
    } else {
      alert('Selecione um aluno e pelo menos um curso');
    }
  };

  return (
    <form onSubmit={handleMatricula}>
      <div>
        <label>Aluno:</label>
        <select
          value={selectedAlunoId ?? ''}
          onChange={(e) => setSelectedAlunoId(Number(e.target.value))}
        >
          <option value="">Selecione um aluno</option>
          {alunos.map((aluno) => (
            <option key={aluno.AlunoId} value={aluno.AlunoId}>
              {aluno.Nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Cursos:</label>
        {cursos.map((curso) => (
          <div key={curso.CursoId}>
            <input
              type="checkbox"
              checked={selectedCursos.includes(curso.CursoId)}
              onChange={() => handleCursoChange(curso.CursoId)}
            />
            <label>{curso.Nome}</label>
          </div>
        ))}
      </div>

      <button type="submit">Matricular</button>
    </form>
  );
};

export default MatriculaForm;
