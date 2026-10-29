let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

const formCliente = document.getElementById("formCliente");
const listaClientes = document.getElementById("listaClientes");
const pesquisa = document.getElementById("pesquisa");

// Salvar clientes no navegador
function salvarClientes() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

// Atualizar total de clientes
function atualizarTotal() {
    document.getElementById("totalClientes").textContent =
        clientes.length;
}

// Mostrar clientes cadastrados
function mostrarClientes(filtro = "") {
    listaClientes.innerHTML = "";

    const encontrados = clientes.filter(cliente =>
        cliente.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    if (encontrados.length === 0) {
        listaClientes.textContent = "Nenhum cliente encontrado.";
        return;
    }

    encontrados.forEach(cliente => {
        const card = document.createElement("div");
        card.className = "cliente";

        const nome = document.createElement("h3");
        nome.textContent = cliente.nome;

        const telefone = document.createElement("p");
        telefone.textContent = "Telefone: " + cliente.telefone;

        const email = document.createElement("p");
        email.textContent = "E-mail: " + cliente.email;

        const endereco = document.createElement("p");
        endereco.textContent = "Endereço: " + cliente.endereco;

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        // Botão editar
        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";

        botaoEditar.addEventListener("click", () => {
            editarCliente(cliente.id);
        });

        // Botão excluir
        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "botao-excluir";

        botaoExcluir.addEventListener("click", () => {
            excluirCliente(cliente.id);
        });

        acoes.append(botaoEditar, botaoExcluir);

        card.append(
            nome,
            telefone,
            email,
            endereco,
            acoes
        );

        listaClientes.appendChild(card);
    });
}

// Cadastrar cliente
formCliente.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const email = document.getElementById("email").value.trim();
    const endereco = document.getElementById("endereco").value.trim();

    if (!nome || !telefone || !email || !endereco) {
        alert("Preencha todos os campos.");
        return;
    }

    const novoCliente = {
        id: Date.now(),
        nome,
        telefone,
        email,
        endereco
    };

    clientes.push(novoCliente);

    salvarClientes();
    formCliente.reset();
    atualizarTudo();

    alert("Cliente cadastrado com sucesso!");
});

// Editar cliente
function editarCliente(id) {
    const cliente = clientes.find(item => item.id === id);

    if (!cliente) return;

    const novoNome = prompt("Nome do cliente:", cliente.nome);

    if (novoNome === null) return;

    const novoTelefone = prompt("Telefone:", cliente.telefone);

    if (novoTelefone === null) return;

    const novoEmail = prompt("E-mail:", cliente.email);

    if (novoEmail === null) return;

    const novoEndereco = prompt("Endereço:", cliente.endereco);

    if (novoEndereco === null) return;

    if (
        !novoNome.trim() ||
        !novoTelefone.trim() ||
        !novoEmail.trim() ||
        !novoEndereco.trim()
    ) {
        alert("Todos os campos precisam ser preenchidos.");
        return;
    }

    cliente.nome = novoNome.trim();
    cliente.telefone = novoTelefone.trim();
    cliente.email = novoEmail.trim();
    cliente.endereco = novoEndereco.trim();

    salvarClientes();
    atualizarTudo();

    alert("Cliente atualizado com sucesso!");
}

// Excluir cliente
function excluirCliente(id) {
    const confirmar = confirm(
        "Deseja realmente excluir este cliente?"
    );

    if (!confirmar) return;

    clientes = clientes.filter(cliente => cliente.id !== id);

    salvarClientes();
    atualizarTudo();

    alert("Cliente excluído com sucesso!");
}

// Atualizar o sistema
function atualizarTudo() {
    atualizarTotal();
    mostrarClientes(pesquisa.value);
}

// Pesquisar clientes
pesquisa.addEventListener("input", function() {
    mostrarClientes(pesquisa.value);
});

// Inicializar sistema
atualizarTudo();