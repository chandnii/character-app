// CharacterList.test.js

import React from "react";
import { render, screen } from "@testing-library/react";

import CharacterList from "./CharacterList";

test("renders character list", () => {
  // Mock character data
  const characters = [
    { id: 1, name: "Rick Sanchez" },
    { id: 2, name: "Morty Smith" },
  ];

  // Render the component
  render(<CharacterList characters={characters} />);

  // Assert that each character's name is rendered
  expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  expect(screen.getByText("Morty Smith")).toBeInTheDocument();
});
