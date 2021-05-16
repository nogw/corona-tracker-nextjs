import Graphic from '../Graphic';
import { Container } from './styles';

function Graphics() {
  return (
    <Container>
      <Graphic info="CONFIRMED"/>
      <Graphic info="ACTIVE"/>
      <Graphic info="RECOVERED"/>
      <Graphic info="DECEASED"/>
    </Container>
  );
};

export default Graphics;
