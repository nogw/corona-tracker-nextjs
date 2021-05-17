import { Container } from './styles';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import { useEffect, useState } from 'react';

interface IPropsGraphic {
  info: string,
  color: string,
  data: any
}

function Graphic({ info, color, data }: IPropsGraphic) {
  const [dataState, setDataState] = useState<any>([
    { x: 0, y: 0 }
  ])

  useEffect(() => {

    for ( var item in data ) {
      console.log(data[item][info])
      setDataState([...dataState, { x: parseInt(item) + 1, y: parseInt(data[item][info]) }])
    }
  }, [])

  return (
    <Container>
      <h1>{info}</h1>
      
        <VictoryLine
          interpolation="natural"
          domainPadding={5}

          padding={0}

          style={{
            data: { 
              stroke: `${color}`, 
              strokeWidth: 12 
            },
          }}
          
          animate={{
            duration: 3000,
            onLoad: { duration: 1000 }
          }}
          
          data={dataState}
        />
    </Container>
  );
};

export default Graphic;
