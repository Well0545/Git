import { ContainerRest, Description, Infos, StyledButton } from './styles'
import estrelaImg from '../../assets/images/estrela.png'
import Tag from '../Tag'
import { Link } from 'react-router-dom'

type Props = {
  id: number
  title: string
  image: string
  description: string
  classification: string
  infos: TagInfo[]
}
export type TagInfo = {
  text: string
  size: 'big' | 'small'
}

const Restaurant = ({
  description,
  image,
  title,
  classification,
  infos,
  id
}: Props) => (
  <ContainerRest>
    <img src={image} alt={title} />
    <Infos>
      {infos.map((info) => (
        <Tag size={info.size} key={info.text}>
          {info.text}
        </Tag>
      ))}
    </Infos>
    <div>
      <h3>{title}</h3>
      <span>
        {classification}
        <img src={estrelaImg} alt="Classificação" />
      </span>
    </div>
    <Description>{description}</Description>
    <Link to={`/perfil/${id}`}>
      <StyledButton type="button">Saiba mais</StyledButton>
    </Link>
  </ContainerRest>
)

export default Restaurant
