import { Button, styled } from "@mui/material"
import React from "react"
import { atom } from "./state/atom"
import { useAtom } from "./state/useAtom"

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

const testState = atom<number>({
  key: "test",
  read: 1,
})

const ComponentOne: React.FC = () => {
  const [value, setValue] = useAtom<number>(testState)
  return (
    <div>
      <h1>Component One</h1>
      <Button variant="contained" onClick={() => setValue((value ?? 0) - 1)}>
        -
      </Button>
      <Button variant="contained" onClick={() => setValue((value ?? 0) + 1)}>
        +
      </Button>
      <p>{`State: ${value ?? 0}`}</p>
    </div>
  )
}

const ComponentTwo: React.FC = () => {
  const [value, _] = useAtom<number>(testState)
  return (
    <div>
      <h1>Component Two</h1>
      <p>{`State: ${value ?? 0}`}</p>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <Container>
      <Content>
        <ComponentOne />
        <ComponentTwo />
      </Content>
    </Container>
  )
}

export default App
