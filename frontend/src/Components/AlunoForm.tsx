import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Aluno {
  alunoId: number;
  nome: string;
  email: string;
  nascimento: string;
}

interface AlunoFormProps {
  alunoEditado: Aluno | null;
  onAlunoCriadoOuEditado: () => void;
}

const AlunoForm: React.FC<AlunoFormProps> = ({ alunoEditado, onAlunoCriadoOuEditado }) => {
  const [nome, setNome] = useState<string>(alunoEditado?.nome || '');
  const [email, setEmail] = useState<string>(alunoEditado?.email || '');
  const [nascimento, setNascimento] = useState<string>(alunoEditado?.nascimento || '');
  const [erro, setErro] = useState<string>('');

  // Função para criar ou editar aluno
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar se a data de nascimento é maior de 18 anos
    const idade = new Date().getFullYear() - new Date(nascimento).getFullYear();
    if (idade < 18) {
      setErro('O aluno deve ter mais de 18 anos');
      return;
    }

    const alunoData = { nome, email, nascimento };

    try {
      if (alunoEditado) {
        // Editar aluno
        await axios.put(`http://localhost:5097/api/Alunos/${alunoEditado.alunoId}`, alunoData);
      } else {
        // Criar aluno
        await axios.post('http://localhost:5097/api/Alunos/CriarAluno', alunoData);
      }
      setErro('');
      onAlunoCriadoOuEditado(); // Notificar o componente pai para atualizar a lista
      setNome('');
      setEmail('');
      setNascimento('');
    } catch (error) {
      setErro('Ocorreu um erro ao salvar o aluno.');
    }
  };

  return (
    <div>
      <h2>{alunoEditado ? 'Editar Aluno' : 'Criar Aluno'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="nascimento">Data de Nascimento:</label>
          <input
            type="date"
            id="nascimento"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
            required
          />
        </div>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <button type="submit">{alunoEditado ? 'Editar' : 'Criar'}</button>
      </form>
    </div>
  );
};

export default AlunoForm;
