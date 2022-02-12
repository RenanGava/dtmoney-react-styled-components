import Modal from 'react-modal'
import { Container, RadioBox, TransactionTypeContainer} from './styles'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import closeImg from '../../assets/close.svg'
import { FormEvent, useState } from 'react'
import { useTransactions } from '../../hooks/useTransactions'

interface NewTransactionModalProps{
    isOpen: boolean,
    onRequestClose: ()=> void
}

export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps){
    // respeitando os conceitos de imutabilidade no React
    // não podemos por exempro das um transaction.push()
    // 
    const {createTransaction} = useTransactions()


    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [type, setType] = useState('deposit')

    // como o valor enviado pelo onSubmit é um evento de formuário
    // devemos colocar a tipagem de FormEvent para o Typscript
    // reconhecer a tipagem do parametro passado.
    async function handleCreateNewTransaction(event: FormEvent){
       // tambem devemos colocar o async na função handleCreateNewTransaction
       // pois ela leva um metodo await em seu escopo
        event.preventDefault()

        await createTransaction({
            // aqui recebemos as variaveis dos estados acima
            title,
            amount,
            category, 
            type
        })

        // aqui vamos chamar o metodo onRequestClose
        // para fechar o modal após a inserção dos dados
        // no MirageJS
        // para isso eu preciso aguardar a transação ser concluida
        // colocaremos o metodo (await) na frente do (createTransaction)
        // e quando terminar a resposta será executado o comando para
        // fechar o modal lembrando que essa função (createTransaction)
        // está dentro do TransactionContext.tsx
        /*lembrando que para a função (createTransaction) ter o await
        ela deve ser assincrona ou (async) onde ela é executada*/
        /*
        para resetar o valor dos campos do modal precisamos chamar os seus estados
        e colocalos de forma a entender que eles estão vazios
        */ 
        setTitle('')
        setAmount(0)
        setCategory('')
        setType('deposit')
        onRequestClose()
    }

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName='react-modal-overlay'
            className='react-modal-content'>
                <button 
                onClick={onRequestClose} 
                className='react-modal-close'>
                    <img src={closeImg} alt="fechar modal"/>
                </button>
                {/*O (onSubmit) é usado para enviar os dados do
                formulario para a função que irá tratar dos dados*/}
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>

                <input
                    placeholder='Titulo'
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input
                    type='number'
                    placeholder='Valor'
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
            {/* 
            1-Metodo:
            className={type == 'deposit' ? 'active': ''}
            podemos fazer dessa forma para mudar a cor de fundo
            do botão quando selecionado 

            OBS: desa forma vale tanto para Styled-components
            tando para arquivo de css padrão
            
            2-Metodo:
            é usando o is active como ficará na aplicação
            lembrando que podemos dar o nome que quisermos para
            as propriedades
            temos que criar uma interface de tipagem para esse método
            funcionar para os isActive dentro do arquivo de estilo
            do NewTransactionModal
            */}
                    <RadioBox
                        type='button'
                        isActive={type === 'deposit'}
                        onClick={()=>{setType('deposit')}}
                        activeColor='green'>
                        <img src={incomeImg} alt="" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type='button'
                        isActive={type === 'withdraw'}
                        onClick={()=>{setType('withdraw')}}
                        activeColor='red'>
                        <img src={outcomeImg} alt="" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input
                    placeholder='Categoria'
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />
                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    )
}