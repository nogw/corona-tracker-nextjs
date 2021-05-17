import Graphics from "../components/Graphics";
import api from "../services/api";

export async function getServerSideProps(context) {
  const response = await api.get("/")
  const response_data = response.data.message
  
  if (!response) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      data: {
        response_data
      }
    }
  }
}

export default function Home({ data }) {
  return <Graphics data={data.response_data}/>
}