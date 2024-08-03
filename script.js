const modal = document.getElementById("modal");
const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const itemsModal = document.getElementById("cart-items");
const totalItems = document.getElementById("cart-total");
const finalizarCompra = document.getElementById("finalizar");
const fecharModal = document.getElementById("fechar");
const contadorCompra = document.getElementById("contador");
const endereco = document.getElementById("endereco");
const enderecoAlerta = document.getElementById("endereco-alerta");

let carrinho = [];

cartBtn.addEventListener("click", () => {
  atualizarCarrinho();
  modal.style.display = "flex";
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

fecharModal.addEventListener("click", () => {
  modal.style.display = "none";
});

menu.addEventListener("click", (event) => {
  // console.log(event.target)
  let parentButton = event.target.closest(".add-btn");
  if (parentButton) {
    const nome = parentButton.getAttribute("data-name");
    const preco = parseFloat(parentButton.getAttribute("data-price"));
    adicionarCarrinho(nome, preco);
  }
});

function adicionarCarrinho(nome, preco) {
  const itemExistente = carrinho.find((item) => item.nome === nome);

  if (itemExistente) {
    itemExistente.quantidade += 1;
  } else {
    carrinho.push({
      nome,
      preco,
      quantidade: 1,
    });
  }

  atualizarCarrinho();
}

function atualizarCarrinho() {
  itemsModal.innerHTML = "";
  let total = 0;
  carrinho.forEach((item) => {
    const div = document.createElement("div");

    div.innerHTML = `
        <div class="produto-modal">
            <div>
              <p class="item-nome">${item.nome}</p>
              <p class="item-quantidade">Quantidade: ${item.quantidade}</p>
              <p class="item-preco">R$ ${item.preco.toFixed(2)}</p>
            </div>
            <div class="remover" data-name="${item.nome}">Remover</div>
          </div>
        `;

    total += item.preco * item.quantidade

    itemsModal.appendChild(div);
  });

  totalItems.textContent = `R$ ${total.toFixed(2)}`

  contadorCompra.innerHTML = carrinho.length
}

itemsModal.addEventListener('click', (event) => {
  if(event.target.classList.contains("remover")){
    const name = event.target.getAttribute('data-name')

    removerItemCarrinho(name)
  }
})

function removerItemCarrinho(name){
  const index = carrinho.findIndex(item => item.nome === name)

  if(index !== -1){
    const item = carrinho[index]
    
    if(item.quantidade > 1){
      item.quantidade -= 1
      atualizarCarrinho()
      return
    }

    carrinho.splice(index, 1)
    atualizarCarrinho()
  }
}

endereco.addEventListener('input', (event) => {
  let inputValue = event.target.value;

  if(inputValue !== ''){
    enderecoAlerta.style.display = 'none'
  }
})

finalizarCompra.addEventListener('click', () => {
  if(carrinho.length === 0) return;

  if(endereco.value === ''){
    enderecoAlerta.style.display = 'flex'
    return;
  }

  const itemsCarrinho = carrinho.map((item) => {
    let retornar = `${item.nome} Quantidade: (${item.quantidade}) Preço: R$ ${item.preco}`
    return retornar
  }).join(' | ')

  const mensagem = encodeURIComponent(itemsCarrinho)
  const celular = '5555555'

  window.open(`https://wa.me/${celular}?text=${mensagem} Endereço: ${endereco.value}`, "_blank")

  carrinho = []
  atualizarCarrinho()
})