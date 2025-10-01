import { Botao } from './styles'

type ButtonProps = {
  children: React.ReactNode
}

const Button = ({ children }: ButtonProps) => <Botao>{children}</Botao>

export default Button
