import axios from "axios";

const API_URL = "http://localhost:5097/api/Alunos";

interface Aluno {
    AlunoId: number;
    Nome: string;
    Email: string;
    Nascimento: string;
}

export const alunoService = {
    listarAlunos: async () => {
      try {
        const response = await axios.get<Aluno[]>(`${API_URL}/ListarAlunos`);
        return response.data;
      } catch (error) {
        console.error('Erro ao listar alunos', error);
        throw error;
      }
    },
  
    criarAluno: async (aluno: Omit<Aluno, 'AlunoId'>) => {
      try {
        const response = await axios.post(`${API_URL}/CriarAluno`, aluno);
        return response.data;
      } catch (error) {
        console.error('Erro ao criar aluno', error);
        throw error;
      }
    },
  
    editarAluno: async (AlunoId: number, aluno: Omit<Aluno, 'AlunoId'>) => {
      try {
        await axios.put(`${API_URL}/${AlunoId}`, aluno);
      } catch (error) {
        console.error('Erro ao editar aluno', error);
        throw error;
      }
    },
  
    deletarAluno: async (AlunoId: number) => {
      try {
        await axios.delete(`${API_URL}/${AlunoId}`);
      } catch (error) {
        console.error('Erro ao deletar aluno', error);
        throw error;
      }
    },
  };