import styled from 'styled-components'
import { cores } from '../../styles'

export const Imagem = styled.div`
  width: 100%;
  height: 186px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
`

export const Text = styled.h3`
  font-size: 18px;
  font-weight: 900;
  color: ${cores.rosa};
`

export const Banner = styled.div`
  width: 100%;
  height: 280px;
  color: ${cores.branco};
  background-repeat: no-repeat;
  background-size: cover;
`

export const TextBanner = styled.p`
  padding-top: 25px;
  font-size: 32px;
  font-weight: 100;
  padding-bottom: 152px;
`

export const RestaurantName = styled.p`
  font-size: 32px;
  font-weight: 900;
  width: 672px;
`
export const Cart = styled.h3`
  cursor: pointer;
  font-weight: 900;
  font-size: 18px;
  color: ${cores.rosa};
  &:hover {
    text-decoration: underline;
  }
`
