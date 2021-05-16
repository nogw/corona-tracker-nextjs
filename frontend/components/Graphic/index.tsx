import { Container } from './styles';

interface IPropsGraphic {
  info: string,
}

function Graphic({ info }: IPropsGraphic) {
  return (
    <Container>
      <h1>{info}</h1>
    </Container>
  );
};

export default Graphic;
