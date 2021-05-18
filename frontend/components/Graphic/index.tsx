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
    let dataStateProv = []
    for ( var item = 0; item < data.length; item++ ) {
      dataStateProv.push({ x: item, y: parseInt(data[item][info]) })
      setDataState(dataStateProv) 
    }
  }, [])

  return (
    <Container>
      <h1>{info}</h1>
      <h2 style={{ color: color, fontSize: 14 }}>{data[data.length - 1][info]}</h2>
      
        <VictoryLine
          domainPadding={0}
          padding={10}
          scale={{x: "linear", y: "log"}}
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
