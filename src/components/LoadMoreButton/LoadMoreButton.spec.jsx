import React from "react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import { fireEvent, render, screen } from "@testing-library/react"
import LoadMoreButton from "."

describe("<LoadMoreButton />", () => {
  it('should render text "Load More"', () => {
    render(<LoadMoreButton />)
    expect.assertions(2) // Nesse teste deve ter 2 expects (mais comum em testes assíncronos)

    // Normalmente, não vemos ninguém criando variáveis
    expect(
      screen.getByRole("button", { name: "Load More" })
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Load More" })).toHaveAttribute(
      "id",
      "load-more"
    )
  })

  it("should call function on click", () => {
    const fn = jest.fn() // Mock de função
    render(<LoadMoreButton onClickLoadMore={fn} />)

    expect.assertions(1)

    const button = screen.getByRole("button", { name: "Load More" })

    fireEvent.click(button) // simulando o click no botão
    //await userEvent.click(button) // simulando o click no botão, deve ser assíncrono

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should match snapshot', () => {
    const fn = jest.fn()
    const {container} = render(<LoadMoreButton onClickLoadMore={fn} />)
    expect(container.firstChild).toMatchSnapshot()
  });
})
