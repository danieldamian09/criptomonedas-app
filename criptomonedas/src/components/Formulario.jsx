import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from "@emotion/styled"
// coustom hook monedas
import useMoneda from "../hooks/useMoneja";
// coustom hook criptomonedas
import useCriptomoneda from "../hooks/useCriptomoneda";

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    border-radius: 10px;
    width: 100%;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`;

export default function Formulario() {

    // state del listado de criptomonedas que viene de la api
    const [listaCripto, guardarCripto] = useState([])

    // array para las monedas que vamos a utilizar y luego se enviara a nuestro hook
    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', nombre: 'Peso Mexicano'},
        { codigo: 'EUR', nombre: 'Euro'},
        { codigo: 'GBP', nombre: 'Libra Esterlina'}
    ]

    // Utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS);

    // utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '', listaCripto)

    // ejecutar llamado a la api
    useEffect(() => {
        
        const consultarAPI = async() => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCripto(resultado.data.Data);
        };
        consultarAPI()

    }, [])

    return (
        <form>

        <SelectMonedas />

        <SelectCripto />

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    )
}
