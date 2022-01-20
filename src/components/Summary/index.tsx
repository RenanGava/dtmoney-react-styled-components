import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from "./styles";

export function Summary(){
    // recuperando dados do contexto do react
    // para isso usaremo o componente que foi usado como contexto
    // e ao invés de provider como método ao final do seu nome
    //será usado o consumer nome dessa api do react é render props
    // para consumir o contexto agora, usaremos o useContext()
    
    /* 
    dessa forma eu recebo os dados do meu
    contexto 
    */
    // const data são os dados que vamos receber do contexto
    // e dentro do contexto vamos passar o contexto que queremos pegar
    const {transactions} = useTransactions()

    // vamos reduzir essa funcionalidade em apenas uma variavel
    // const totalDeposit = transactions.reduce((acc, transaction)=>{// acc igual a acumulator
    //     if(transaction.type == 'deposit'){
    //         return acc + transaction.amount
    //     }

    //     return acc
    // },0)

    const summary = transactions.reduce((acc, transactions)=>{
        if(transactions.type === 'deposit'){
            acc.deposits += transactions.amount// total da entrada
            acc.total += transactions.amount//soma as entradas e da um total em dinherio
        }else{
            acc.withdwars += transactions.amount
            acc.total -= transactions.amount // diminuiremos do toltal na conta
        }
        return acc // retorna o valor acumulado
    },{
        // o acc se refere aos dados passados no objeto abaixo.
        deposits:0,
        withdwars: 0,
        total: 0
    })
    
    
    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.deposits)}
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong>
                    -
                    {/* 
                        essa formatação serve para colocar o (R$) na frente do número 
                        automaticamente.
                    */}
                    {new Intl.NumberFormat('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.withdwars)}
                    </strong>
            </div>
            <div className='highlight-background'>
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.total)}
                    </strong>
            </div>
        </Container>
    )
}