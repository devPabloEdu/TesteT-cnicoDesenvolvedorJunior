import axios from 'axios';

const API_URL = "http://localhost:5097/api/Cursos";

interface Curso {
    CursoId : number;
    Nome : string;
    Descricao : string;
}

export const cursoService = {
    listarCursos: async() => {
        try {
            const response = await axios.get<Curso[]>(`${API_URL}/ListarCursos`);
            return response.data;
        } catch (error) {
            console.error('Erro ao listar cursos', error);
            throw error; 
        }
    },

    criarCurso: async (curso: Omit<Curso, 'CursoId'>) => {
        try {
            const response = await axios.post(`${API_URL}/CriarCurso`, curso);
            return response.data;
        } catch (error) {
            console.error('Erro ao criar o curso', error);
            throw error;
        }
    },

    editarCurso: async(CursoId: number, curso: Omit<Curso, 'CursoId'>) => {
        try {
            await axios.put(`${API_URL}/${CursoId}`, curso);
        } catch (error) {
            console.error('Erro ao editar o curso', error);
            throw error;
        }
    },

    deletarCurso: async(CursoId:number) => {
        try {
            await axios.delete(`${API_URL}/${CursoId}`);
        } catch (error) {
            console.error('Erro ao deletar curso', error);
            throw error;
        }
    },
};