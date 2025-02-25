import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlunoForm from './AlunoForm';
import { alunoService } from '../Services/AlunoService';

interface Aluno {
  alunoId: number;
  nome: string;
  email: string;
  nascimento: string;
}

const AlunoList: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [alunoEditado, setAlunoEditado] = useState<Aluno | null>(null);

  // Carregar a lista de alunos
  const carregarAlunos = async () => {
    try {
      const response = await axios.get('http://localhost:5097/api/Alunos/ListarAlunos');
      setAlunos(response.data);
    } catch (error) {
      console.error('Erro ao carregar alunos', error);
    }
  };

  // Excluir aluno
  const excluirAluno = async (alunoId: number) => {
    try {
      await axios.delete(`http://localhost:5097/api/Alunos/${alunoId}`);
      carregarAlunos();
    } catch (error) {
      console.error('Erro ao excluir aluno', error);
    }
  };

  // Configurar o aluno para edição
  const editarAluno = (aluno: Aluno) => {
    setAlunoEditado(aluno);
  };

  // Carregar alunos ao montar o componente
  useEffect(() => {
    carregarAlunos();
  }, []);

  return (
    <div>
      <h2>Lista de Alunos</h2>
      <ul>
        {alunos.map((aluno) => (
          <li key={aluno.alunoId}>
            {aluno.nome} ({aluno.email}) - {new Date(aluno.nascimento).toLocaleDateString()}
            <button onClick={() => editarAluno(aluno)}>Editar</button>
            <button onClick={() => excluirAluno(aluno.alunoId)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlunoList;
