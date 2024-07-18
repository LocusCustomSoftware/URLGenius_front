import api from '../api';


// import { useHistory } from 'react-router-dom';

// Função para gerenciar a lógica de envio do formulário de login
// export const handleSubmit = async (username, password, setError) => {
//     // const history = useHistory();

//     try {
//         const response = await api.post('login/', {
//             username,
//             password,
//         });
//         // Salva os tokens no localStorage
//         localStorage.setItem('access_token', response.data.access);
//         localStorage.setItem('refresh_token', response.data.refresh);

//         // Redirecionar ou fazer alguma ação após login bem-sucedido
//         // history.push('/');
//     } catch (error) {
//         setError('Nome de usuário ou senha incorretos');
//         console.error('There was an error!', error);
//     }
// };

// Função para gerenciar a lógica de visibilidade da senha
export const createPasswordHandler = (showPassword, setShowPassword) => ({
    handleClickShowPassword: () => {
        setShowPassword(!showPassword);
    },
    handleMouseDownPassword: (event) => {
        event.preventDefault();
    },
});
