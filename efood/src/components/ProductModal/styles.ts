import styled from 'styled-components'
import { cores } from '../../styles'

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1;

  &.is-visible {
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
  position: relative;
  z-index: 1;
  display: flex;

  header {
    margin-right: 24px;

    img {
      width: 280px;
      height: 280px;
      object-fit: cover;
    }
  }

  h4 {
    font-size: 18px;
    font-weight: 900;
    color: ${cores.branco};
    margin-bottom: 16px;
  }

  p {
    font-size: 14px;
    line-height: 22px;
    color: ${cores.branco};
    margin-bottom: 16px;
  }

  > img {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
  }
`

export const Button = styled.button`
  background-color: ${cores.bege};
  color: ${cores.rosa};
  font-size: 14px;
  font-weight: bold;
  padding: 4px 6px;
  border: none;
  cursor: pointer;
`
