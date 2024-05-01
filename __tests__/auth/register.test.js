import axios from 'axios'; // Importe o axios ou o mock de axios para simular as requisições HTTP
import LoginPage from '../../components/LoginPage'; // Corrigir o caminho do componente LoginPage


describe('Register', () => {
  test('Deve registrar um novo usuário com sucesso', async () => {
    // Mock da função de registro para simular uma requisição bem-sucedida
    axios.post.mockResolvedValueOnce({ data: { message: 'Usuário registrado com sucesso' } });

    // Renderize o componente RegisterPage
    // Certifique-se de passar uma função mock ou spy para a prop onRegister
    const { getByPlaceholderText, getByText } = render(<RegisterPage onRegister={jest.fn()} />);

    // Simule a entrada de dados do usuário nos campos de email e senha
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'exemplo@teste.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'senha123' } });

    // Simule o envio do formulário de registro
    fireEvent.click(getByText('Registrar'));

    // Verifique se a função de registro foi chamada com os dados corretos
    await waitFor(() => expect(axios.post).toHaveBeenCalledWith('/auth/register', { email: 'exemplo@teste.com', password: 'senha123' }));
    // Verifique se a função onRegister foi chamada após o registro bem-sucedido
    expect(onRegister).toHaveBeenCalled();
  });

  test('Deve exibir mensagem de erro em caso de falha no registro', async () => {
    // Mock da função de registro para simular uma requisição com erro
    axios.post.mockRejectedValueOnce(new Error('Erro ao registrar usuário'));

    // Renderize o componente RegisterPage
    // Certifique-se de passar uma função mock ou spy para a prop onRegister
    const { getByPlaceholderText, getByText } = render(<RegisterPage onRegister={jest.fn()} />);

    // Simule a entrada de dados do usuário nos campos de email e senha
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'exemplo@teste.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'senha123' } });

    // Simule o envio do formulário de registro
    fireEvent.click(getByText('Registrar'));

    // Verifique se a mensagem de erro é exibida ao usuário
    await waitFor(() => expect(getByText('Erro ao registrar usuário')).toBeInTheDocument());
    // Verifique se a função onRegister não foi chamada em caso de erro de registro
    expect(onRegister).not.toHaveBeenCalled();
  });
});
