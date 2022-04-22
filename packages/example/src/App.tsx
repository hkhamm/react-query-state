import { Button as MuiButton, styled } from "@mui/material"
import { atom, useAtom } from "@react-query-state/react-query-state"
import React from "react"

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

const Button = styled(MuiButton)(() => ({
  fontSize: 24,
}))

const testState = atom<number>({
  key: "test",
  initialValue: 1,
})

const useTest = () => useAtom<number>(testState)

const ComponentOne: React.FC = () => {
  const [value, setValue] = useTest()
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
  const [value, _] = useTest()
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
