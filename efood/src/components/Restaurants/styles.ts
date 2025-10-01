import styled from 'styled-components'
import { cores } from '../../styles'

export const ContainerRest = styled.div`
  width: 472px;
  height: auto;
  border: 1px solid ${cores.rosa};
  background-color: ${cores.branco};
  color: ${cores.rosa};
  margin-bottom: 48px;
  position: relative;

  img{
    width: 100%;
    height: 217px;
    object-fit: cover;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin-top: 8px;
      margin-bottom: 16px;
      margin-left: 8px;
    }

    span {
      font-weight: bold;
      margin-top: 8px;
      margin-bottomL 16px;
    }

    img {
      width: 15px;
      height: 15px;
      margin: 0 8px;
    }
  }
`

export const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  max-width: 456px;
  margin-left: 8px;
  margin-bottom: 16px;
`

export const Infos = styled.div`
  display: flex;
  text-align: center;
  position: absolute;
  top: 16px;
  right: 16px;
`
export const StyledButton = styled.button`
  width: 82px;
  height: 24px;
  background-color: ${cores.rosa};
  color: ${cores.branco};
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px; /* 100% of height */
  letter-spacing: 0;
  text-align: center;
  margin: 8px;
  border: none;
`
