import { ContainerFooter, Logo, ListLogos, TextFooter } from './styles'
import logo from '../../assets/images/logo.svg'
import instagramLogo from '../../assets/images/instagram.png'
import twitterLogo from '../../assets/images/twitter.png'
import facebookLogo from '../../assets/images/fb.png'

const Footer = () => (
  <ContainerFooter>
    <Logo src={logo} alt="Efood" />
    <ListLogos>
      <li>
        <a href="#">
          <img src={instagramLogo} alt="Instagram" />
        </a>
      </li>
      <li id="twitter">
        <a href="#">
          <img src={twitterLogo} alt="twitter" />
        </a>
      </li>
      <li>
        <a href="#">
          <img src={facebookLogo} alt="facebook" />
        </a>
      </li>
    </ListLogos>
    <TextFooter>
      A efood é uma plataforma para divulgação de estabelecimentos, a
      responsabilidade pela entrega, qualidade dos produtos é toda do
      estabelecimento contratado.
    </TextFooter>
  </ContainerFooter>
)

export default Footer
