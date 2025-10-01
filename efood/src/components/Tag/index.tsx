import type { ReactNode } from 'react'
import { TagContainer, TagText } from './styles'

export type Props = {
  size?: 'small' | 'big'
  children: ReactNode
}

const Tag = ({ children, size = 'small' }: Props) => (
  <TagContainer size={size}>
    <TagText>{children}</TagText>
  </TagContainer>
)

export default Tag
