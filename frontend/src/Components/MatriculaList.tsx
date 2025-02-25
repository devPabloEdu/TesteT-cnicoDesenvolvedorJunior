import React, { useEffect, useState } from 'react';
import {matriculaService} from "../Services/MatriculaService"

const MatriculaList: React.FC = () => {
  const [matriculas, setMatriculas] = useState<any[]>([]); // Inicializa com um array vazio.

  useEffect(() => {
    const fetchMatriculas = async () => {
      try {
        const response = await matriculaService.listarMatriculas(); // Supondo que você tenha uma função que faça a requisição.
        
        // Verifique se os dados existem antes de atualizar o estado
        if (response && response.data) {
          setMatriculas(response.data); // Supondo que a resposta seja uma lista de matrículas.
        } else {
          console.error("A resposta não contém dados válidos.");
          setMatriculas([]); // Caso a resposta não seja válida, inicializa com um array vazio.
        }
      } catch (error) {
        console.error('Erro ao listar matrículas:', error);
        setMatriculas([]); // Caso haja erro, inicializa com um array vazio.
      }
    };

    fetchMatriculas();
  }, []); // O array vazio faz com que o efeito execute apenas uma vez (após o primeiro render).

  return (
    <div>
      <h3>Lista de Matrículas</h3>
      {matriculas.length === 0 ? (
        <p>Não há matrículas registradas.</p> // Mensagem quando não houver matrículas.
      ) : (
        <ul>
          {matriculas.map((matricula, index) => (
            <li key={index}>
              {/* Verifique se o objeto Aluno e Curso existem */}
              {matricula.Aluno && matricula.Aluno.Nome ? (
                <p>Aluno: {matricula.Aluno.Nome}</p>
              ) : (
                <p>Aluno não encontrado</p>
              )}
              {matricula.Curso && matricula.Curso.Nome ? (
                <p>Curso: {matricula.Curso.Nome}</p>
              ) : (
                <p>Curso não encontrado</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MatriculaList;
