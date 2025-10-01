import styled from 'styled-components'
import { cores } from '../../styles'

import fechar from '../../assets/images/trash.png'

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.7;
`

export const CartContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: flex-end;
  z-index: 1;

  &.is-open {
    display: flex;
  }
`

export const SideBar = styled.aside`
  max-width: 360px;
  width: 100%;
  background-color: ${cores.rosa};
  z-index: 1;
  padding: 32px 8px 0px 8px;
`

export const Prices = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 14px;
  color: ${cores.bege};
  padding-top: 40px;
`

export const Title = styled.h3`
  padding-bottom: 16px;
  padding-top: 8px;
`

export const CartItem = styled.li`
  display: flex;
  background-color: ${cores.bege};
  max-width: 344px;
  color: ${cores.rosa};
  margin-bottom: 16px;
  position: relative;

  .product-image {
    width: 90px;
    height: 90px;
    object-fit: cover;
    padding: 8px 8px 12px 8px;
  }

  span {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }

button {
    background: none;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    cursor: pointer;

    &:hover,
    &:focus,
    &:active {
      outline: none;
      border: none;
      background: none;
      box-shadow: none;
    }
`
export const Lixeira = styled.img`
  cursor: pointer;
  width: 16px;
  height: 16px;
  position: absolute;
  bottom: 8px;
  outline: none;
  border: none;
  right: 8px;
`

export const BotaoCart = styled.button`
  width: 100%;
  height: 24px;
  background-color: ${cores.bege};
  color: ${cores.rosa};
  border: none;
  padding: 4px;
  font-size: 14px;
  font-weight: bold;
  margin-top: 16px;
`

export const Quantity = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
`
