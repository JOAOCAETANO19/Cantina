document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Definindo o Cardápio e Estoque ---
    // Usamos um objeto para organizar melhor os produtos.
    // 'const' porque a estrutura do cardápio (os produtos e preços) não muda.
    const cardapio = {
        coxinha: { preco: 5, estoque: 15 },
        kibe: { preco: 6, estoque: 10 },
        risoles: { preco: 8, estoque: 12 },
        paoDeQueijo: { preco: 4, estoque: 20 },
        pastel: { preco: 7, estoque: 18 }
    };

    // Função para formatar números como moeda (R$)
    const formatarDinheiro = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Função para exibir o cardápio ou estoque em uma tabela
    const exibirEstoque = (elementoId, titulo) => {
        const container = document.getElementById(elementoId);
        let html = `<h3>${titulo}</h3>`;
        html += `
            <table>
                <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                </tr>
        `;
        // Loop 'for...in' para percorrer todos os produtos no objeto cardapio
        for (const produto in cardapio) {
            html += `
                <tr>
                    <td>${produto.charAt(0).toUpperCase() + produto.slice(1)}</td>
                    <td>${formatarDinheiro(cardapio[produto].preco)}</td>
                    <td>${cardapio[produto].estoque} unidades</td>
                </tr>
            `;
        }
        html += '</table>';
        container.innerHTML = html;
    };
    
    // Exibe o cardápio inicial
    exibirEstoque('cardapio', 'Nosso Cardápio');

    // --- 2. Simulação de Vendas ---
    // 'let' porque o faturamento total vai mudar a cada venda.
    let faturamentoTotal = 0;

    // Função para processar uma venda
    function vender(produto, quantidade) {
        // Verifica se o produto existe no cardápio e se há estoque
        if (cardapio[produto] && cardapio[produto].estoque >= quantidade) {
            // Calcula o custo da venda
            let valorVenda = cardapio[produto].preco * quantidade;
            // Adiciona ao faturamento total
            faturamentoTotal += valorVenda;
            // Subtrai do estoque
            cardapio[produto].estoque -= quantidade; // A propriedade 'estoque' (dentro do objeto) é alterada
            console.log(`Venda de ${quantidade} ${produto}(s) realizada com sucesso!`);
        } else {
            console.log(`Venda de ${produto} não realizada (produto indisponível ou estoque insuficiente).`);
        }
    }

    // Realizando algumas vendas
    vender('coxinha', 2);
    vender('kibe', 1);
    vender('paoDeQueijo', 3);
    vender('pastel', 20); // Teste de venda com estoque insuficiente (não será concluída)

    // Exibindo o faturamento total na página
    const vendaTotalEl = document.getElementById('venda_total');
    vendaTotalEl.textContent = `Faturamento total das vendas simuladas: ${formatarDinheiro(faturamentoTotal)}`;

    // --- 3. Exibindo o Estoque Atualizado ---
    exibirEstoque('estoque_atualizado', 'Estoque Após as Vendas');
});
