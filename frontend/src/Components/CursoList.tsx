import React, { useState } from 'react';
import { cursoService } from '../Services/CursoService';

const CursoForm: React.FC<{ curso?: any; onSave: () => void }> = ({ curso, onSave }) => {
  const [nome, setNome] = useState(curso?.Nome || '');
  const [descricao, setDescricao] = useState(curso?.Descricao || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cursoData = { Nome: nome, Descricao: descricao };

    if (curso) {
      await cursoService.editarCurso(curso.CursoId, cursoData);
    } else {
      await cursoService.criarCurso(cursoData);
    }

    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      </div>
      <button type="submit">{curso ? 'Editar' : 'Criar'} Curso</button>
    </form>
  );
};

export default CursoForm;
