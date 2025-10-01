import styled from 'styled-components'
import { cores } from '../../styles'

export const ContainerFood = styled.div`
  max-width: 320px;
  width: 100%;
  background-color: ${cores.rosa};
  cursor: pointer;
  height: 338px;

  div {
    padding: 8px;
  }
`

export const ImagemFood = styled.img`
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 167px;
  object-fit: cover;
  padding: 8px;
`

export const TitleFood = styled.h4`
  font-size: 16px;
  font-weight: 900;
  padding-bottom: 8px;
`

export const DescriptionFood = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  padding-bottom: 8px;
`
export const StyledButton = styled.button`
  width: 304px;
  height: 24px;
  background-color: ${cores.bege};
  color: ${cores.rosa};
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
`
