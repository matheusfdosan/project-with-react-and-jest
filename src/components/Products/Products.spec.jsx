import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Products from "."
import {mockCards} from "./mock"

describe("<Products />", () => {
  it("should render posts", () => {
    const { debug } = render(<Products />)
    debug()

    
  })
})
