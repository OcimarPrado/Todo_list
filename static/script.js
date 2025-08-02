console.log("Script carregado");

const categoriasSugeridasFixas = {
    // Alimentos
    "arroz": "Alimentos",
    "feijão": "Alimentos",
    "macarrão": "Alimentos",
    "pão": "Alimentos",
    "leite": "Alimentos",
    "queijo": "Alimentos",
    "manteiga": "Alimentos",
    "açúcar": "Alimentos",
    "sal": "Alimentos",
    "óleo": "Alimentos",
    "café": "Alimentos",
    "chá": "Alimentos",
    "frutas": "Alimentos",
    "banana": "Alimentos",
    "maçã": "Alimentos",
    "laranja": "Alimentos",
    "tomate": "Alimentos",
    "batata": "Alimentos",
    "cenoura": "Alimentos",
    "alho": "Alimentos",
    "cebola": "Alimentos",
    "pimenta": "Alimentos",
    "ervilha": "Alimentos",
    "milho": "Alimentos",
    "iogurte": "Alimentos",
    "sorvete": "Alimentos",
    "mel": "Alimentos",
    "biscoito": "Alimentos",
    "chocolate": "Alimentos",
    "pizza": "Alimentos",
    "hambúrguer": "Alimentos",

    // Carnes
    "carne": "Carnes",
    "frango": "Carnes",
    "peixe": "Carnes",
    "bacon": "Carnes",
    "presunto": "Carnes",
    "linguiça": "Carnes",
    "carne moída": "Carnes",
    "filé mignon": "Carnes",
    "costela": "Carnes",
    "coxinha da asa": "Carnes",
    "salsicha": "Carnes",

    // Limpeza
    "detergente": "Limpeza",
    "sabão": "Limpeza",
    "água sanitária": "Limpeza",
    "desinfetante": "Limpeza",
    "esponja": "Limpeza",
    "pano de chão": "Limpeza",
    "limpa vidro": "Limpeza",
    "saco de lixo": "Limpeza",
    "limpa forno": "Limpeza",
    "amaciante": "Limpeza",
    "limpa carpetes": "Limpeza",
    "flanela": "Limpeza",

    // Higiene
    "shampoo": "Higiene",
    "condicionador": "Higiene",
    "sabonete": "Higiene",
    "creme dental": "Higiene",
    "escova de dente": "Higiene",
    "desodorante": "Higiene",
    "fio dental": "Higiene",
    "absorvente": "Higiene",
    "protetor solar": "Higiene",
    "perfume": "Higiene",
    "lenço umedecido": "Higiene",
    "creme para mãos": "Higiene",
    "gel antisséptico": "Higiene",

    // Vestuário
    "camiseta": "Vestuário",
    "calça": "Vestuário",
    "meia": "Vestuário",
    "tênis": "Vestuário",
    "jaqueta": "Vestuário",
    "boné": "Vestuário",
    "bermuda": "Vestuário",
    "blusa de frio": "Vestuário",
    "short": "Vestuário",
    "sapato": "Vestuário",
    "roupa íntima": "Vestuário",
    "mochila": "Vestuário",
    "cinto": "Vestuário",

    // Bebidas
    "água": "Bebidas",
    "refrigerante": "Bebidas",
    "suco": "Bebidas",
    "cerveja": "Bebidas",
    "vinho": "Bebidas",
    "whisky": "Bebidas",
    "água com gás": "Bebidas",
    "cachaça": "Bebidas",
    "energético": "Bebidas",
    "chá gelado": "Bebidas",

    // Eletrônicos
    "telefone": "Eletrônicos",
    "carregador": "Eletrônicos",
    "fones de ouvido": "Eletrônicos",
    "pilha": "Eletrônicos",
    "bateria": "Eletrônicos",
    "televisão": "Eletrônicos",
    "notebook": "Eletrônicos",
    "tablet": "Eletrônicos",
    "mouse": "Eletrônicos",
    "teclado": "Eletrônicos",
    "caixa de som": "Eletrônicos",
    "câmera": "Eletrônicos",

    // Papelaria
    "caderno": "Papelaria",
    "caneta": "Papelaria",
    "lápis": "Papelaria",
    "borracha": "Papelaria",
    "tesoura": "Papelaria",
    "cola": "Papelaria",
    "apontador": "Papelaria",
    "marca texto": "Papelaria",
    "régua": "Papelaria",
    "bloco de notas": "Papelaria",

    // Utensílios domésticos
    "prato": "Utensílios",
    "garfo": "Utensílios",
    "faca": "Utensílios",
    "panela": "Utensílios",
    "frigideira": "Utensílios",
    "colher": "Utensílios",
    "liquidificador": "Utensílios",
    "batedeira": "Utensílios",
    "tábua de corte": "Utensílios",
    "forma de bolo": "Utensílios",
    "jarra": "Utensílios",

    // Jardinagem
    "adubo": "Jardinagem",
    "vaso": "Jardinagem",
    "sementes": "Jardinagem",
    "terra": "Jardinagem",
    "regador": "Jardinagem",
    "pá": "Jardinagem",
    "tesoura de poda": "Jardinagem",

    // Ferramentas
    "martelo": "Ferramentas",
    "chave de fenda": "Ferramentas",
    "alicate": "Ferramentas",
    "serrote": "Ferramentas",
    "furadeira": "Ferramentas",
    "parafuso": "Ferramentas",
    "pregos": "Ferramentas",

    // Brinquedos
    "bola": "Brinquedos",
    "boneca": "Brinquedos",
    "lego": "Brinquedos",
    "carrinho": "Brinquedos",
    "jogo de tabuleiro": "Brinquedos",
    "quebra-cabeça": "Brinquedos",

    // Acessórios
    "óculos de sol": "Acessórios",
    "relógio": "Acessórios",
    "pulseira": "Acessórios",
    "colar": "Acessórios",
    "brinco": "Acessórios",
    "chaveiro": "Acessórios",
    "carteira": "Acessórios",
    "boné": "Acessórios",
    "chapéu": "Acessórios",
    "lenço": "Acessórios",
    "cinto": "Acessórios",
    "bolsa": "Acessórios",
    "mochila": "Acessórios",
    "carteira de mão": "Acessórios",
    "gravata": "Acessórios",

    // Outros
    "pilhas": "Outros",
    "vela": "Outros",
    "lâmpada": "Outros",
    "remédio": "Outros",
    "extensão elétrica": "Outros",
    "fita adesiva": "Outros",
    "alfinete": "Outros",
};


let categoriasSalvas = JSON.parse(localStorage.getItem('categoriasSalvas')) || {};
console.log("Categorias salvas carregadas:", categoriasSalvas);

function salvarCategorias() {
    localStorage.setItem('categoriasSalvas', JSON.stringify(categoriasSalvas));
    console.log("Categorias salvas atualizadas:", categoriasSalvas);
}

function buscarCategoriaSugerida(texto) {
    texto = texto.toLowerCase();
    for (const palavra in categoriasSugeridasFixas) {
        if (texto.includes(palavra)) {
            console.log(`Encontrou palavra fixa: ${palavra} -> ${categoriasSugeridasFixas[palavra]}`);
            return categoriasSugeridasFixas[palavra];
        }
    }
    for (const palavra in categoriasSalvas) {
        if (texto.includes(palavra)) {
            console.log(`Encontrou palavra salva: ${palavra} -> ${categoriasSalvas[palavra]}`);
            return categoriasSalvas[palavra];
        }
    }
    return "";
}

document.querySelectorAll('.novo-item-form').forEach(form => {
    const nomeInput = form.querySelector('input[name="item_name"]');
    const categoriaInput = form.querySelector('input[name="item_category"]');

    console.log("Formulário detectado", nomeInput, categoriaInput);

    nomeInput.addEventListener('input', function () {
        console.log("Digitando nome do item:", nomeInput.value);
        const textoNome = nomeInput.value.trim();

        if (textoNome.length === 0) {
            categoriaInput.value = "";
            return;
        }

        const sugestao = buscarCategoriaSugerida(textoNome);
        if (sugestao && categoriaInput.value.trim().toLowerCase() !== sugestao.toLowerCase()) {
            console.log(`Sugestão de categoria para "${textoNome}": ${sugestao}`);
            categoriaInput.value = sugestao;
        }
    });

    categoriaInput.addEventListener('change', function () {
        const palavraChave = nomeInput.value.trim().toLowerCase();
        const categoriaNova = categoriaInput.value.trim();

        if (palavraChave && categoriaNova) {
            categoriasSalvas[palavraChave] = categoriaNova;
            salvarCategorias();
        }
    });
});
