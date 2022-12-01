import React from 'react';
import { useState } from 'react';
import styled from "styled-components";
import SetaPlay from '../zaprecall/assets/img/seta_play.png'
import SetaVirar from '../zaprecall/assets/img/seta_virar.png'
import Certo from '../zaprecall/assets/img/icone_certo.png'
import Quase from '../zaprecall/assets/img/icone_quase.png'
import Errado from '../zaprecall/assets/img/icone_erro.png'

export default function Cards({ cards, setRespondidas, respondidas }) {

  const [pergunta, setPergunta] = useState(false)       //se a pergunta vai aparecer
  const [resposta, setResposta] = useState(false)       //se a resposta vai aparecer
  const [numeroCards, setNumeroCards] = useState();     //numero da pergunta selecionada
  const [arrayCards, setArrayCards] = useState([])      //todas as perguntas já selecionadas
  const [resultado, setResultado] = useState (false)    //se o resultao vai aparecer
  const [cor, setCor] = useState ('')                   //define botao resultado da resposta
  const [cardsRespondidas, setCardsRespondidas] = useState([])

  const [errados, setErrados] = useState([]);
  const [quases, setQuases] = useState([]);
  const [certos, setCertos] = useState([]);

  function addNumerosCards(i) {
    console.log ('addNumerosCards')
    if (!arrayCards.includes (i)) {
      setArrayCards([...arrayCards, i])
    }
    console.log(i)
    setNumeroCards(i);
    setPergunta(true)
  }

  function mostrarResposta() {
    console.log ('mostrarResposta')
    setPergunta (false)
    setResposta(true)
  }

  function esconderTudo(cor, i) {
    console.log ('esconderTu')
    setResultado (true)
    setPergunta(false)
    setResposta(false)
    setCor (cor)
    setCardsRespondidas ([...cardsRespondidas, i])

    if (cor == Errado) {
      setErrados ([...errados, i])
    }
    if (cor == Quase) {
      setQuases ([...quases, i])
    }
    if (cor == Certo) {
      setCertos ([...certos, i])
    } 

    setRespondidas(respondidas + 1)

  }
  return (
    <>

      {cards.map((c, i) => <>
        {numeroCards !== (i + 1) && !arrayCards.includes(i+1) && (<CaixaPerguntaFechada onClick={() => addNumerosCards(i + 1)}>
          <PerguntasTexto>Pergunta {i + 1}</PerguntasTexto>
          <img alt='' src={SetaPlay} />
        </CaixaPerguntaFechada>)}

        {pergunta && numeroCards == (i + 1) && (
          <CaixaPerguntaAberta>
            <h1>{c.question}</h1>
            <PerguntasImagem onClick={() => mostrarResposta()} src={SetaVirar} />
          </CaixaPerguntaAberta>
        )}

        {resposta && numeroCards == (i + 1) && (
          <CaixaPerguntaAberta>
            <h1>{c.answer}</h1>
            <Botoes>
              <BotaoVermelho onClick={() => esconderTudo(Errado, i)} >Não lembrei</BotaoVermelho>
              <BotaoAmarelo onClick={() => esconderTudo(Quase, i)} >Quase não lembrei</BotaoAmarelo>
              <BotaoVerde onClick={() => esconderTudo(Certo, i)}>Zap!</BotaoVerde>
              <BotaoCinza>OI</BotaoCinza>
            </Botoes>
          </CaixaPerguntaAberta>
        )}

        {resultado && cardsRespondidas.includes(i) && (
          <CaixaPerguntaFechada>
          <PerguntasTexto>Pergunta {i + 1}</PerguntasTexto>
          <img alt='' 
          src={errados.includes(i) && Errado || quases.includes(i) && Quase || certos.includes(i) && Certo}/>
        </CaixaPerguntaFechada>
        )}

        {/* <CaixaPerguntaFechada onClick={() => console.log(c.question)}>
          <PerguntasTexto>Pergunta {i + 1}</PerguntasTexto>
          <img alt='' src={Certo} />
        </CaixaPerguntaFechada> */}
      </>
      )}


      {/* <CaixaPerguntaFechada>
                <PerguntasTexto>Pergunta 1</PerguntasTexto>
                <img alt='' src={Certo} />
            </CaixaPerguntaFechada>

            <CaixaPerguntaFechada>
                <PerguntasTexto>Pergunta 1</PerguntasTexto>
                <img alt='' src={Quase} />
            </CaixaPerguntaFechada>

            <CaixaPerguntaFechada>
                <PerguntasTexto>Pergunta 1</PerguntasTexto>
                <img alt='' src={Errado} />
            </CaixaPerguntaFechada>

            <CaixaPerguntaAberta>
                <h1>JSX é uma sintaxe para escrever HTML dentro do JS</h1>
                <Botoes>
                    <BotaoVermelho>Não lembrei</BotaoVermelho>
                    <BotaoAmarelo>Quase não lembrei</BotaoAmarelo>
                    <BotaoVerde>Zap!</BotaoVerde>
                    <BotaoCinza>OI</BotaoCinza>
                </Botoes>
            </CaixaPerguntaAberta> */}
    </>
  )
}

const Botoes = styled.div`
display: flex;
  width: 80%;
  justify-content: space-between;
  margin: 20px;
`;
const CaixaPerguntaFechada = styled.div`
width: 300px;
  height: 35px;
  background-color: #FFFFFF;
  margin: 12px;
  padding: 15px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PerguntasTexto = styled.p`
font-family: 'Recursive';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #333333;
  color: ${props => props.cor}
`;
const PerguntasImagem = styled.img`
position: absolute;
  bottom: 10px;
  right: 10px;
`;
const CaixaPerguntaAberta = styled.div`
width: 300px;
  margin: 12px;
  padding: 15px;
  min-height: 100px;
  background: #FFFFD5;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  font-family: 'Recursive';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #333333;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const BotaoVerde = styled.button`
background-color: #2FBE34;
width: 90px;
  font-family: 'Recursive';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #FFFFFF;
  border-radius: 5px;
  border: 1px solid;
  padding:5px;
  margin-left: 5px;
`;
const BotaoAmarelo = styled.button`
width: 90px;
  font-family: 'Recursive';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #FFFFFF;
  border-radius: 5px;
  border: 1px solid;
  padding:5px;
  margin-left: 5px;
background-color: #FF922E;
`;
const BotaoVermelho = styled.button`
width: 90px;
  font-family: 'Recursive';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #FFFFFF;
  border-radius: 5px;
  border: 1px solid;
  padding:5px;
  margin-left: 5px;
background-color: #FF3030;
`;
const BotaoCinza = styled.button`
width: 90px;
  font-family: 'Recursive';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #FFFFFF;
  border-radius: 5px;
  border: 1px solid;
  padding:5px;
  margin-left: 5px;
background-color: #333333;
`;