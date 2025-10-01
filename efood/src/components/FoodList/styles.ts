import styled from 'styled-components'
import { cores } from '../../styles'

export const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 32px;
  gap: 32px;
  padding-top: 56px;
  color: ${cores.bege};
  padding-bottom: 120px;
`
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: none;
  align-items: center;
  justify-content: center;

  &.visivel {
    display: flex;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.73);
  }
`

export const ModalContent = styled.div`
  background-color: ${cores.rosa};
  padding: 32px;
  max-width: 1024px;
  position: relative;
  display: flex;
  z-index: 1;
`

export const BotaoFechar = styled.img`
  right: 0;
  top: 0;
  position: absolute;
  padding: 8px;
`

export const ImageModal = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
  margin-right: 24px;
`

export const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${cores.branco};
`

export const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: ${cores.branco};

  span {
    display: block;
    margin-top: 32px;
    margin-bottom: 16px;
  }
`

export const ModalButton = styled.button`
  background-color: ${cores.bege};
  color: ${cores.rosa};
  font-size: 14px;
  font-weight: bold;
  border: none;
  padding: 4px 8px;
  width: 218px;
  height: 24px;
  display: flex;
`
