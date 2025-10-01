import styled, { createGlobalStyle } from 'styled-components'

export const cores = {
  begeclaro: '#FFF8F2',
  bege: '#FFEBD9',
  rosa: '#E66767',
  branco: '#FFFFFF'
}

export const GlobalCss = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
  }

  body {
    background-color: ${cores.begeclaro};
  }
`

export const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
`
