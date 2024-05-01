import axios from 'axios'; // Importe o axios ou o mock de axios para simular as requisições HTTP
import LoginPage from '../../components/LoginPage'; // Corrigir o caminho do componente LoginPage


describe('Login', () => {
  test('Deve fazer login com sucesso', async () => {
    // Mock da função de login para simular uma requisição bem-sucedida
    axios.post.mockResolvedValueOnce({ data: { token: 'token_de_exemplo' } });

    // Renderize o componente LoginPage
    // Substitua `onLogin` com uma função mock ou spy para verificar se foi chamada
    // Certifique-se de passar a função mock ou spy como uma prop para o componente
    // Isso permite que você verifique se o login foi bem-sucedido ao chamar a função mock ou spy
    const { getByPlaceholderText, getByText } = render(<LoginPage onLogin={jest.fn()} />);

    // Simule a entrada de dados do usuário nos campos de email e senha
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'exemplo@teste.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'senha123' } });

    // Simule o envio do formulário de login
    fireEvent.click(getByText('Login'));

    // Verifique se a função de login foi chamada com as credenciais corretas
    await waitFor(() => expect(axios.post).toHaveBeenCalledWith('/auth/login', { email: 'exemplo@teste.com', password: 'senha123' }));
    // Verifique se a função onLogin foi chamada após um login bem-sucedido
    expect(onLogin).toHaveBeenCalled();
  });

  test('Deve exibir mensagem de erro em caso de credenciais inválidas', async () => {
    // Mock da função de login para simular uma requisição com erro
    axios.post.mockRejectedValueOnce(new Error('Credenciais inválidas'));

    // Renderize o componente LoginPage
    // Substitua `onLogin` com uma função mock ou spy para verificar se foi chamada
    const { getByPlaceholderText, getByText } = render(<LoginPage onLogin={jest.fn()} />);

    // Simule a entrada de dados do usuário nos campos de email e senha
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'exemplo@teste.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'senha123' } });

    // Simule o envio do formulário de login
    fireEvent.click(getByText('Login'));

    // Verifique se a mensagem de erro é exibida ao usuário
    await waitFor(() => expect(getByText('Credenciais inválidas')).toBeInTheDocument());
    // Verifique se a função onLogin não foi chamada em caso de erro de login
    expect(onLogin).not.toHaveBeenCalled();
  });
});
