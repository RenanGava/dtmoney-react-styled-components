import styled from "styled-components";
import {darken, transparentize} from 'polished'
// esse sinal(&) se refere ao elemento que
// está abrindo e fechando as chaves no arquivo de edição
// no Styled-components
export const Container = styled.form`
    h2{
        color: var(--text-title);
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }

    input{
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        border-radius: 0.25rem;

        background: #e7e9ee;
        border: 1px solid #d7d7d7;

        font-weight: 400;
        font-size: 1rem;

        &::placeholder{
            color: var(--text-body);
        }
        /*significa todo input que tiver um input antes dele*/
        & + input{
            margin-top: 1rem;
        }
    }

    button[type=submit]{
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        background: var(--green);
        color: #FFF;
        border-radius: 0.25rem;
        border: 0;
        font-size: 1rem;
        margin-top: 1.5rem;
        font-weight: 600;

        transition: filter 0.2s;

        &:hover{
            filter: brightness(0.7);
        }
    }
`;

export const TransactionTypeContainer = styled.div`
    margin: 1rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
`
interface RadioBoxProps{
    isActive: boolean
    activeColor: 'green' | 'red' // este sinal ( | ) significa 'ou' 
    /*outra form de colocar string mas se for para receber poucos
    parametro é colocar os valores que a propriedade vai receber
    desta forma acima*/
}

const colors = {
    green: '#33CC95',
    red:'#E62E4D'
}
export const RadioBox = styled.button<RadioBoxProps>`
    height: 4rem;
    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;

    /* a interpolação é para fazer a função de mudar a cor de fundo
    dos botões de tipo no modal
    a função a baixo verifica se o isActive é verdadeiro ou falso*/
    background: ${(props) => props.isActive 
    ? transparentize(0.8,colors[props.activeColor])
    :'transparent'};

    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.2s;

    &:hover{
        border-color: ${darken(0.1,'#d7d7d7')};
        // o darken é usado para escurecer uma cor selecionada
    }

    img{
        width: 20px;
        height: 20px;
    }
    
    span{
        display: inline-block;
        margin-left: 1rem;
        color: var(--text-title);
    }
`
