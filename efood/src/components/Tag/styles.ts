import styled from 'styled-components'
import { cores } from '../../styles'

type TagProps = {
  size: 'big' | 'small'
}

export const TagContainer = styled.div<TagProps>`
  background-color: ${cores.rosa};
  color: ${cores.branco};
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 700;
  width: ${(props) => (props.size === 'big' ? '121px' : '61px')};
  height: 26px;
  display: flex;
  margin: 8px;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  box-sizing: border-box;
`

export const TagText = styled.span`
  width: 100%;
  text-align: center;
  height: 23px;
  display: inline-block;
  vertical-align: middle;
`
