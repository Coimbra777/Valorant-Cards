import axios from "axios";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";

import "../App.css";

interface Agent {
  id: string;
  uuid: string;
  displayName: string;
  description: string;
  bustPortrait: string;
  isPlayableCharacter: boolean;
  abilities: string;
  role: {
    displayName: string;
  };
}

const Teste = () => {
  const { data, isLoading } = useQuery(
    "agentes",
    () => {
      return axios
        .get("https://valorant-api.com/v1/agents")
        .then((res) =>
          res.data.data.filter(
            (agent: Agent) => agent.isPlayableCharacter === true
          )
        );
    },
    {
      retry: 5,
      refetchOnWindowFocus: true,
    }
  );

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <h1>titulo</h1>
      <div className="cards-agent">
        <Swiper slidesPerView={1} pagination={{ clickable: true }} navigation>
          {data?.map((agent: Agent) => (
            <SwiperSlide key={agent.displayName}>
              <img
                src={agent.bustPortrait}
                alt="slider"
                className="slide-agent"
              />
              <h1>{agent.displayName}</h1>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Teste;
