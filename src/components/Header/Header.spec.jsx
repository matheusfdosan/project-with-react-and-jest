import "@testing-library/jest-dom"
const { render, screen } = require("@testing-library/react")
import React from "react"
import Header from "."

describe("<Header />", () => {
  it("should render header whith store name", () => {
    render(<Header />)

    const heading = screen.getByRole("heading", { level: 1 })

    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent("UrbanVault")
  })

  it("should match snapshot", () => {
    const { container } = render(<Header />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
