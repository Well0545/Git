import styled from 'styled-components'
import { cores } from '../../styles'

export const Imagem = styled.div`
  width: 100%;
  height: 384px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;
`

export const Logo = styled.img`
  max-width: 100%;
  height: auto;
`

export const TextHeader = styled.p`
  font-weight: bold;
  font-size: 36px;
  line-height: 100%;
  color: ${cores.rosa};
  margin-top: 138px;
  max-width: 550px;
  text-align: center;
`
