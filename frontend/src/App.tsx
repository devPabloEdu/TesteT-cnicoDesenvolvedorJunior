import React, { useState, useEffect } from 'react';
import MatriculaForm from "./Components/MatriculaForm";
import MatriculaList from "./Components/MatriculaList";
import CursoForm from "./Components/CursoForm";
import CursoList from "./Components/CursoList";
import AlunoForm from "./Components/AlunoForm";
import AlunoList from "./Components/AlunoList";
import axios from 'axios';

const App: React.FC = () => {
  const [alunos, setAlunos] = useState<any[]>([]);
  const [alunoEditado, setAlunoEditado] = useState<any | null>(null);
  const [isEditingMatricula, setIsEditingMatricula] = useState(false);

  // Função para carregar os alunos
  const carregarAlunos = async () => {
    try {
      const response = await axios.get('http://localhost:5097/api/Alunos/ListarAlunos');
      setAlunos(response.data);
    } catch (error) {
      console.error('Erro ao carregar alunos', error);
    }
  };

  // Função para editar um aluno
  const editarAluno = (aluno: any) => {
    setAlunoEditado(aluno);
  };

  // Carregar alunos assim que o componente for montado
  useEffect(() => {
    carregarAlunos();
  }, []);

  return (
    <div>
      <h1>Gestão de Alunos, Cursos e Matrículas</h1>

      <h2>Cursos</h2>
      <CursoForm onSave={carregarAlunos} />
      <CursoList  onSave={carregarAlunos}/>

      <h2>Alunos</h2>
      <AlunoForm alunoEditado={alunoEditado} onAlunoCriadoOuEditado={carregarAlunos} />
      <AlunoList />

      <h2>Matrículas</h2>
      <button onClick={() => setIsEditingMatricula(!isEditingMatricula)}>
        {isEditingMatricula ? 'Cancelar' : 'Matricular Aluno'}
      </button>
      {isEditingMatricula && <MatriculaForm onSave={() => setIsEditingMatricula(false)} />}
      <MatriculaList />
    </div>
  );
};

export default App;
