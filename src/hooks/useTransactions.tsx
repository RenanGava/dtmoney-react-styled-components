// para utilizarmos contextos na aplicação devemos importar
// o createContext do react
// criando um contexto na aplicação nós conseguimos
// acessalo de qualquer lugar da aplicação.
import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { api } from "../Services/api";

//para isso funcionar devemos colocar o componente abaixo 
//da seguinte forma  TransactionsContext.provider
// por volta da aplicação, no caso da nossa
// vamos substituir o fragment no arquivo App.tsx
// após isso o provider precisa receber um value
// se não ficará um erro na apicação 

interface Transaction{
    id: number
    title: string
    type: string
    category: string
    amount: number
    createAt: string
}

// esse tipo vai herdar todos os tipos do Transaction meno
// as propriedades passadas podem ser quais quer outras prorpiedades
// no caso colocamos as que queremos ignorar
type TransactionInput = Omit<Transaction, 'id' | 'createAt'>

// Também podemos usar o Pick
// nesse podemos escolher o campo que vamos utilizar

// type TransactionInput = Pick<Transaction, 'title'| 'amount' | 'type'| 'category'>

// podemos fazer dessa forma também que irá funcionar da mesma forma
// interface TransactionInput{
//     title: string
//     type: string
//     category: string
//     amount: number
//     createAt: string
// }

interface TransactionProviderProps{
    // sempre que eu for utilizar a propriedade
    // children podemos tipala com o ReactNode
    // o ReactNode aceita qualquer termo passado para ele
    // através do childrem
    children: ReactNode
}

/* criamos essa tipagem aqui pois como definimos a tipagem das
'TransactionsContext' para receber um array de 'Transaction' 
no value no 'TransactionProvider' precisamos de outra tipagem para
descrever o conjunto de propriedades que serão passadas no contexto*/
interface TransacitonsContextData{
    // esse vai mandar um array de Transaction
    transactions:Transaction[]
    // esse vai mandar uma função de TransactionInput
    //como dizemos que a função dessa tipagem é assincrona
    // ela irá retornar uma promisse então ela retornará um tipo
    // Promisse<void>
    createTransaction: (transaction: TransactionInput) => Promise<void>
}

// ai para aceitar enviar as propriedades sem erro de tipagem
// dentro do componente TransactionsProvider
// vamos trocar a tipage do TransactionsContext de  <Transaction[]>
// para <TransacitonsContextData> ai vai dar um erro após trocar a
// tipagem para isso vamos forçar uma tipagem como faremos abaixo
export const TransactionsContext = createContext<TransacitonsContextData>(
    // dessa forma forçamos a tipagem e retiramos o erro
    // com isso dizemos que ese objeto tem sim o formato da 
    // tipagem designada para ele
    {} as TransacitonsContextData
)


// esse contexto aqui vai enviar um componente react
export function TransactionsProvider({children}: TransactionProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(()=>{
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
            
    }, [])

    async function createTransaction( transactionInput : TransactionInput){
        // após colocar o async na função a 'API' deve receber um await
        // pois deve se espeara a resposta vir andes de passala adiante
        // ai vamos pegar a respota da inserção que fizemos no banco
        // logo após isso vamos acessa-lo
        const response = await api.post('/transactions', {
            // lembrando que não podemos esquecer de passar nenhum
            // dado para salvar no banco de dados se não irá dar errado
            ...transactionInput,
            createAt: new Date(),
        })
        // aqui vamos desestruturar a resposta e pegar a transaction
        // de dentro do response.data
        const {transaction} = response.data


        // aqui vamos colocar as transações dentro do estado de transações
        // lembrando que o react utiliza imutabilidade
        // e para isso vamos utilizar o spread operator e
        // copiar todos os dados que estão no vetor e inserir os novos
        // a frente da seguinte forma que vamos fazer abaixo.
        setTransactions([
            ...transactions, // dados que já estão no banco
            transaction // dados que serão inseridos no banco
        ])
    }


    return (
        // para passar mais de um parametro utilizaremos
        // um objeto pois podemos acessar suas propriedades
        // por nome, para passar o objeto  terá essas 
        // chaves duplas no value
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    // dessa forma reduzimos o a quantidade de importações que fazemos para a aplição
    // funcionar criando nosso proprio hook de contexto
    // ele pode usar outros hooks em seu interior
    // OBS: a convenção é que todo nome de hook comece com 'use'
    const context = useContext(TransactionsContext)

    return context
}

