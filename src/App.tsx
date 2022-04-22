import { styled } from "@mui/material"
import React from "react"
import "./App.css"

const Container = styled("div")(() => ({
  textAlign: "center",
}))

const Content = styled("div")(() => ({
  backgroundColor: "#282c34",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "calc(10px + 2vmin)",
  color: "white",
}))

const App: React.FC = () => {
  return (
    <Container>
      <Content></Content>
    </Container>
  )
}

export default App
