import { useState } from 'react'
import ProductModal from '../ProductModal'

import {
  ContainerFood,
  ImagemFood,
  TitleFood,
  DescriptionFood,
  StyledButton
} from './styles'

type FoodProps = {
  foto: string
  nome: string
  descricao: string
  preco: number
  porcao: string
  id: number
}

export default function Food({
  foto,
  descricao,
  nome,
  preco,
  porcao,
  id
}: FoodProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const limitarDescricao = (descricao: string) => {
    return descricao.length > 150 ? descricao.slice(0, 150) + '...' : descricao
  }

  return (
    <ContainerFood>
      <ImagemFood src={foto} />
      <div>
        <TitleFood>{nome}</TitleFood>
        <DescriptionFood>{limitarDescricao(descricao)}</DescriptionFood>
        <StyledButton onClick={() => setModalIsOpen(true)}>
          Adicionar ao carrinho{' '}
        </StyledButton>
      </div>
      {modalIsOpen && (
        <ProductModal
          photo={foto}
          name={nome}
          description={descricao}
          portion={porcao}
          price={preco}
          id={id}
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
        />
      )}
    </ContainerFood>
  )
}
