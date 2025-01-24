# Testes com Jest

## Introdução aos Testes

Existem vários tipos de testes, como automatizados de ponta-a-ponta, unitário, integração e etc. O que vamos focar é o teste unitário. Nesse caso, testamos de forma individual pequenas partes da aplicação. E se essa aplicação utiliza uma outra funcionalidade do sistema, teremos de usar um **MOCK**.

Mock é, por exemplo, há uma função que chama uma base de dados, porém, não podemos chamar a verdadeira base de dados num teste, então temos que criar alguém que *simule* uma base de dados, e esse alguém, é o Mock. Em resumo, o Mock é a simulação de uma dependência utilizada no sistema para fazer testes.

## Testando Componentes no React.js

No React.js, vamos testar componentes, verificar se eles estão na tela ou se suas funções estão funcionando. Para isso, vamos utilizar o **Jest DOM**, pois ele permite a renderização de nossos componentes dentro do código, testar arrays, objetos, promises, assincronicidade e os próprios Mocks.

### Estrutura Básica de Testes

Para fazer um teste, primeiro, vamos criar um arquivo na mesma pasta onde se encontra o componente, escrever `NomeComponente.test.jsx` (também pode ser `.spec.`). Depois, dentro do teste vamos escrever a estrutura básica para testes:

```js
describe("<Nome do componente (em forma de tag) />", () => {
  it("Teste 1", () => {
    expect(1).toBe(1)
  })

  it("Teste 2", () => {
    expect({ name: "Matheus" }).toHaveProperty("name")
  })
})
```

#### Explicação da Estrutura

- `describe`: é o pai de todos os testes, ele armazena todos os testes feitos no componente. Por isso ele vem acompanhado de uma string (que indica para qual componente o teste está sendo feito) e uma arrow function que armazena todos os testes.
- `it`: o *it* ou *test* é o teste em si, nele colocamos a descrição do teste a ser feito, depois uma arrow function com o teste dentro.
- `expect(1).toBe(1)`: esse é um teste BEM simples que verifica se 1 é igual à 1. Com ajuda desse [link](https://github.com/sapegin/jest-cheat-sheet), podemos ter uma ideia dos testes que podem ser feitos.
- `expect({ name: "Matheus" }).toHaveProperty("name")`: Verificando se o objeto tem a propriedade "name".

### Rodando os Testes

Agora, para rodar os testes, basta ir no terminal e digitar `npm test` ou `npm test -- --watchAll` para o Jest assistir as mudanças no código.

## Testando o Componente Header

Exemplo, para testar o nosso componente de Header, vamos pensar: O que queremos que aconteça quando o  for renderizado? Que o nome da loja apareça. Então, para isso vamos criar, na mesma pasta do componente, um teste chamado `Header.test.jsx`. Nele iremos testar se o "UrbanVault" está aparecendo no Header:

```jsx
import React from "react"
import { render, screen } from "@testing-library/react" // Importando render e screen para um DOM virtual componentes no Jest
import "@testing-library/jest-dom" // Necessário para "toBeInTheDocument" e "toHaveTextContent" funcionarem
import Header from "."

describe("<Header />", () => {
  it("should render store name", () => {
    render(<Header />)

    const heading = screen.getByRole("heading", { level: 1 })

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent("UrbanVault")
  })
})
```

#### Explicação do Código

- `import { render, screen } from "@testing-library/react"`: Importando render e screen para um DOM virtual componentes no Jest.
- `import "@testing-library/jest-dom"`: Necessário para "toBeInTheDocument" e "toHaveTextContent" funcionarem.
- `render(<Header />)`: Renderizando o componente num DOM virtual.
- `const heading = screen.getByRole("heading", { level: 1 })`: Capturando o componente por acessibilidade um "heading de level 1".
- `expect(heading).toBeInTheDocument()`: Espera que o Header esteja aparecendo no DOM virtual.
- `expect(heading).toHaveTextContent("UrbanVault")`: Espera que o Header tenha o texto "UrbanVault".

## Testando o Componente LoadMoreButton

Agora, vamos aprofundar um pouco mais. Vamos testar o nosso componente . Vamos fazer dois testes, o primeiro para testar se ele está aparecendo na tela, e se a função de *onClick* está funcionando.

### Primeiro Teste: Renderização do Componente

```jsx
import { render, screen } from "@testing-library/react"
import LoadMoreButton from "."
import "@testing-library/jest-dom"

describe("<LoadMoreButton />", () => {
  it("should render on screen", () => {
    render(<LoadMoreButton />)

    expect.assertions(2)

    expect(screen.getByRole("button", name: "Load More")).toBeInTheDocument()
    expect(screen.getByRole("button", name: "Load More")).toHaveAttribute("id", "load-more")
  })
})
```

#### Explicação do Teste

- `expect.assertions(2)`: Garante que um certo número de "expects" sejam chamados num mesmo teste (usados em testes assíncronos, o que não é o caso).
- `.toHaveAttribute("id", "load-more")`: Verifica se o componente tem um atributo de *id* com o valor *load-more*.

### Segundo Teste: Clique no Botão

Sabemos que o botão de "carregar mais" recebe uma função para executar quando o botão for clicado. Vamos desenvolver esse teste:

```jsx
import React from "react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import { fireEvent, render, screen } from "@testing-library/react"
import LoadMoreButton from "."

describe("<LoadMoreButton />", () => {
  // ... teste anterior ...

  it("should call function on click", () => {
    const fn = jest.fn()
    render(<LoadMoreButton onClickLoadMore={fn} />)

    const button = screen.getByRole("button", name: "Load More")

    fireEvent.click(button)

    expect(fn).toHaveBeenCalledTimes(1)
  })
})
```

#### Explicação do Código

- `const fn = jest.fn()`: Esse é um **MOCK** de função, simula uma função.
- `render(<LoadMoreButton onClickLoadMore={fn} />)`: Estou renderizando a propriedade *onClickLoadMore* no componente, para chamar a função de Mock quando o botão for clicado.
- `fireEvent.click(button)`: Utilizo o fireEvent para simular um clique no botão.
- `expect(fn).toHaveBeenCalledTimes(1)`: Espera que a função do Mock seja chamada uma vez.

> Poderíamos também, utilizar o useEvent, porém é mais usado em testes assíncronos: `await userEvent.click(button)`.

## Testando o Componente Card

Mudando para testar outro componente, vamos testar o . Esse componente recebe como parâmetros o *data* (informações dos produtos) e onClickCard (para abrir um modal quando clicarmos nele).

### Criando um Mock para o Data

Para testar o *data*, podemos criar um Mock que simula as informações do data:

```jsx
const mock = {
  id: 1,
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  price: "$109.95",
  rating: {
    rate: "3.9",
  },
}
```

### Utilizando o Mock nos Testes

Agora, podemos renderizá-lo com essas informações. Para ver se as informações estão sendo adicionadas no componente, utilizamos a ferramenta de debug, que vai dar um "console.log" do componente no terminal. Veja:

```jsx
describe("<Card />", () => {
  it("should render component correctly", () => {
    const { debug } = render(<Card data={mock} />)

    debug()
  })
})
```

No terminal aparecerá o componente com os dados:

```bash
console.log
    <body>
      <div>
        <div
          class="card"
          id="card-number-1"
        >
          <div
            class="illustration"
          />
          <div
            class="card-description"
          >
            <h3>
              Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
            </h3>
            <p>
              Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday
            </p>
            <div
              class="card-footer"
            >
              <span>
                $
                $109.95
              </span>
              <span>
                <img
                  alt="star"
                  src="https://www.iconpacks.net/icons/2/free-star-icon-2768-thumb.png"
                />

                3.9
              </span>
            </div>
          </div>
        </div>
      </div>
    </body>
```

Como os dados do mock estão aparecendo no componente virtual do Jest, então, significa que o parâmetro *data* está funcionando e podemos concluir o teste.

> Para deixar o código mais limpo, podemos criar um arquivo mock.js que exporta o objeto de mock. Sendo assim, importamos o objeto pelo teste.

### Testando os Dados do Componente

Agora temos que testar o componente, ver se há uma imagem do produto, título, descrição, preço e avaliação.

```jsx
describe("<Card />", () => {
  it("should render component correctly", () => {
    render(<Card data={mockCard} />)

    expect(screen.getByAltText("illustration")).toHaveAttribute(
      "src",
      mockCard.image
    )

    expect(
      screen.getByRole("heading", { name: mockCard.title })
    ).toBeInTheDocument()

    expect(screen.getByText(mockCard.description)).toBeInTheDocument()

    expect(screen.getByText(`$${mockCard.price}`)).toBeInTheDocument()

    expect(screen.getByText(mockCard.rating.rate)).toBeInTheDocument()
  })
})
```

- `expect(screen.getByAltText("illustration")).toHaveAttribute("src", mockCard.image)`: Esse teste, está buscando o elemento pelo atributo de texto alternativo, atributo esse que só tem em imagens. Na imagem do componente é `alt="illustration"`. Com o componente em mãos, vemos se nele há um artibuto "src" com o valor do objeto "mockCard.image".
- `getByText`: Esse método busca qualquer elemento através do texto que contém.

Como sabemos, o componente abre um Modal quando é clicado, então faremos um teste de clique no componente simples:

```jsx
it("should show modal on click", () => {
  const fn = jest.fn()
  const { container } = render(<Card onClickCard={fn} data={mockCard} />)

  fireEvent.click(container.firstChild)
  expect(fn).toHaveBeenCalledTimes(1)
})
```

#### Explicação do Código

- `const { container } = render(<Card onClickCard={fn} data={mockCard} />)`: Essa é uma forma de capiturar todo o componente.
- `fireEvent.click(container.firstChild)`: Aqui estamos fazendo o uso do container, porém, é necessário utilizar `.firstChild`.

## Snapshots

Uma tecnologia muito importante no Jest, são as _Snapshots_, elas são essenciais para garantir que o teste seja revisado e validado. Como ele faz isso? Essa técnica consiste em guardar uma "foto" do componente (arquivo que guarda o estado do código) e compara à renderização do componente virtual do Jest. Veja:

```jsx
it("should match snapshot", () => {
  const fn = jest.fn()
  const { container } = render(<Card data={mockCard} onClickCard={fn} />)
  // Capituramos todo o componente

  expect(container.firstChild).toMatchSnapshot()
})
```

- `.toMatchSnapshot()`: Testa se o componente renderizado está igual à Snapshot salva

> Snapshot salva o componente numa pasta, e se futuramente, houver alguma alteração no componente, o snapshot irá avisar que o teste não está atualizado. Isso garante que qualquer mudança seja revisada e validada, reduzindo o risco de regressões.

Após rodar esse teste, uma pasta será criada com o nome **__snapshots__**, nela estará o arquivo da snapshot do nosso componente. Caso haja alguma alteração no componente, o Jest irá avisar que o componente e a snapshot não se correspondem. Para arrumar isso, basta rodar o comando `npm test -- -u`, que irá atualizar a snapshot.

## Coverage

Outra ferramenta do Jest, é o **coverage**. Ele é importante, pois trás uma forma mais informativa e visual dos testes. Ele informa a *qualidade* dos testes e mostra partes do código que não foram testadas.

Para iniciá-lo rodamos o comando `npm test -- --coverage`. Que irá criar uma pasta chamada _coverage_ com um relatório HTML, para vermos os resultados dos testes de forma interativa.

---


