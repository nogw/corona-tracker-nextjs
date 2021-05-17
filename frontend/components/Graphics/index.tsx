import Graphic from '../Graphic';
import { Container } from './styles';

function Graphics({ data }) {
  return (
    <Container>
      <Graphic data={data} color="#ea8799" info="deaths"/>
      <Graphic data={data} color="#6ab0f8" info="cases"/>
      <Graphic data={data} color="#86c895" info="recovered"/>
      <Graphic data={data} color="#a7abae" info="active"/>
    </Container>
  );
};

export default Graphics;
