import { render, screen, fireEvent } from '@testing-library/react'
import PostComments from './index'

describe('PostComments', () => {
  it('deve permitir inserir dois comentários e exibir na tela', () => {
    render(<PostComments />)

    const input = screen.getByTestId('comment-input')
    const form = screen.getByTestId('comment-form')

    fireEvent.change(input, { target: { value: 'Primeiro comentário' } })
    fireEvent.submit(form)

    fireEvent.change(input, { target: { value: 'Segundo comentário' } })
    fireEvent.submit(form)

    expect(screen.getByText('Primeiro comentário')).toBeInTheDocument()
    expect(screen.getByText('Segundo comentário')).toBeInTheDocument()
  })
})
