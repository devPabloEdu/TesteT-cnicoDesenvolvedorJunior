import axios from 'axios';

const API_URL = "http://localhost:5097/api/Matriculas";

interface Matricula {
  AlunoId: number;
  CursoId: number;
}

export const matriculaService = {
  matricularAluno: async (alunoId: number, cursoIds: number[]) => {
    try {
      await axios.post(`${API_URL}/MatricularAluno`, { alunoId, cursoIds });
    } catch (error) {
      console.error('Erro ao matricular aluno', error);
      throw error;
    }
  },

  listarMatriculas: async () => {
    try {
      const response = await axios.get(`${API_URL}/ListarMatriculas`);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar matrículas', error);
      throw error;
    }
  },

  listarAlunosDeCurso: async (CursoId: number) => {
    try {
      const response = await axios.get(`${API_URL}/${CursoId}/ListarAlunosDeUmCurso`);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar alunos do curso', error);
      throw error;
    }
  },

  removerMatricula: async (AlunoId: number, CursoId: number) => {
    try {
      await axios.delete(`${API_URL}/RemoverAlunoDoCurso`, { params: { AlunoId, CursoId } });
    } catch (error) {
      console.error('Erro ao remover matrícula', error);
      throw error;
    }
  },
};
