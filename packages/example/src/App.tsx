import {
  Button as MuiButton,
  ButtonGroup,
  styled,
  Typography,
} from "@mui/material"
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
    <ButtonGroup variant="contained">
      <Button onClick={() => setValue((value ?? 0) - 1)}>-</Button>
      <Button onClick={() => setValue((value ?? 0) + 1)}>+</Button>
    </ButtonGroup>
  )
}

const ComponentTwo: React.FC = () => {
  const [value, _] = useTest()
  return <Typography>{`Value: ${value ?? 0}`}</Typography>
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
