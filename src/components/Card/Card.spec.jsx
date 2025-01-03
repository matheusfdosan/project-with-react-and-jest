import React from "react"
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import Card from "."
import { mockCard } from "./mock.js"

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

  it("should show modal on click", () => {
    const fn = jest.fn()
    const {container} = render(<Card onClickCard={fn} data={mockCard} />) // uma maneira de capiturar todo o componente. container.firstChild

    fireEvent.click(container.firstChild)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it("should match snapshot", () => {
    const fn = jest.fn()
    const { container } = render(<Card data={mockCard} onClickCard={fn}/>) 

    expect(container.firstChild).toMatchSnapshot() 
    // Testa se o componente está igual à Snapshot
  })
})
