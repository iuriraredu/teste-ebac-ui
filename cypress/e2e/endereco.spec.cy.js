import enderecoPage from "../support/page-objects/endereco.page";
const dadosEndereco = require('../fixtures/endereco.json');

describe('Funcionalidade Endereços - Faturamento e Entrega', () => {

    beforeEach(()=>{
        cy.visit('minha-conta');
        cy.fixture('perfil').then(dados =>{
            cy.login(dados.usuario, dados.senha);
        });
    });

    it('Deve fazer cadastro de faturamento com sucesso', () => {
        enderecoPage.editarEnderecoFaturamento(
            'Luísa', 'Gerloff', 'Sonza', 'Brasil', 'Rua do Escândalo Íntimo', 24,
            'Tuparendi','Rio Grande do Sul', 98940000, 5555987654321, 'luisa.gerloff@sonza.com.br'
        );
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
    });

    it('Deve fazer cadastro de faturamento com sucesso usando arquivos de dados', () => {
        enderecoPage.editarEnderecoFaturamento(
            dadosEndereco[1].nome,
            dadosEndereco[1].sobrenome,
            dadosEndereco[1].empresa,
            dadosEndereco[1].pais,
            dadosEndereco[1].logradouro,
            dadosEndereco[1].numero,
            dadosEndereco[1].cidade,
            dadosEndereco[1].estado,
            dadosEndereco[1].cep,
            dadosEndereco[1].telefone,
            dadosEndereco[1].email
        );
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
    });
});