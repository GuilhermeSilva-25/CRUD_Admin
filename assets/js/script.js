/* VERIFICA OU CRIA DICIONARIO NO LOCALSTORAGE */
var listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

/* ATUALIZA A TABELA TODA VEZ QUE A PAGINA CARREGA */
document.addEventListener("DOMContentLoaded", function () {
  adicionarTabela();
});

/* VERIFICA E LOGA COMO ADIMINISTRADOR */
function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (email === "admin@admin.com" && senha === "admin1234") {
    window.location.href = "admin.html";
    alert("Você está Logado!");
  } else {
    alert("Login incorreto");
  }
}

/* LIMPA OS CAMPOS DOS INPUTS */
function limpar() {
  document.querySelector("#id").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#password").value = "";
  document.querySelector("#search").value = "";
}

/* ADICIONA OU ATUALIZA A TABELA DE USUARIOS */
function adicionarTabela() {
  const tabelaBody = document.getElementById("tabela");

  tabelaBody.innerHTML = "";

  listaUsuarios.forEach((user) => {
    if (
      user &&
      user.id !== undefined &&
      user.nome !== undefined &&
      user.senha !== undefined
    ) {
      const linhaTabela = document.createElement("tr");

      const celulaID = document.createElement("td");
      const celulaNome = document.createElement("td");
      const celulaSenha = document.createElement("td");

      celulaID.textContent = user.id;
      celulaNome.textContent = user.nome;

      celulaSenha.textContent = user.senha;

      linhaTabela.appendChild(celulaID);
      linhaTabela.appendChild(celulaNome);
      linhaTabela.appendChild(celulaSenha);

      tabelaBody.appendChild(linhaTabela);
    }
  });
}

/* CADASTRA UM NOVO USUARIO */
function cadastrar() {
  let nome = document.querySelector("#name").value;
  let senha = document.querySelector("#password").value;

  if (!nome || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  let user = { id: Date.now(), nome: nome, senha: senha };

  listaUsuarios.push(user);
  localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
  alert("Registro adicionado.");
  adicionarTabela();
  limpar();
}

/* BUSCA NO LOCALSTORAGE OS USUARIOS CADASTRADOS */
function buscar() {
  var dados = JSON.parse(localStorage.getItem("usuarios")) || [];
  let login = document.querySelector("#search").value;

  if (dados.length === 0) {
    alert("Usuário não localizado.");
    document.querySelector("#search").value = "";
    return;
  }

  let usuarioEncontrado = false;

  for (let i = 0; dados.length > i; i++) {
    if (login == dados[i].nome) {
      document.querySelector("#id").value = dados[i].id;
      document.querySelector("#name").value = dados[i].nome;
      document.querySelector("#password").value = dados[i].senha;
      usuarioEncontrado = true;
      break;
    }
  }
  document.querySelector("#search").value = "";
  if (!usuarioEncontrado) {
    alert("Usuário não localizado.");
  }
}
/* ATUALIZA OS DADOS DO USUARIO */
function atualizar() {
  var dados = JSON.parse(localStorage.getItem("usuarios"));
  let idTexto = document.querySelector("#id").value;
  let nome = document.querySelector("#name").value;
  let senha = document.querySelector("#password").value;

  let id = parseInt(idTexto);
  let itemEncontrado = false;

  for (let i = 0; dados.length > i; i++) {
    if (dados[i] && dados[i].id === id) {
      let user = { id: id, nome: nome, senha: senha };
      dados[i] = user;
      itemEncontrado = true;
      localStorage.setItem("usuarios", JSON.stringify(dados));
      listaUsuarios = dados;
      alert("Atualizado!");
      break;
    }
  }
  adicionarTabela();
  limpar();
}
/* APAGAR CADASTRO DE USUARIO */
function apagar() {
  const confirmacao = confirm("Tem certeza que deseja apagar este usuário?");

  if (!confirmacao) {
    alert("Operação de exclusão cancelada.");
    limpar();
    return;
  }

  let id = parseInt(document.querySelector("#id").value);
  let name = document.querySelector("#name").value;

  var dados = JSON.parse(localStorage.getItem("usuarios"));

  if (!dados || !Array.isArray(dados)) {
    alert("Nenhum dado de usuário encontrado para apagar.");
    limpar();
    return;
  }

  let itemApagado = false;

  for (let i = 0; i < dados.length; i++) {
    if (dados[i] && dados[i].id === id && dados[i].nome === name) {
      dados.splice(i, 1);
      itemApagado = true;

      localStorage.setItem("usuarios", JSON.stringify(dados));

      listaUsuarios = dados;

      alert("Usuário apagado com sucesso!");
      limpar();
      break;
    }
  }

  if (!itemApagado) {
    alert("Usuário com ID e Login informados não encontrado.");
    limpar();
  }
  adicionarTabela();
}
