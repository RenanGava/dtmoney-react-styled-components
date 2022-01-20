import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";


export function TransactionsTable(){
    // para mostar os dados em tela devemos criar um esatdo para
    // receber esses dados e depois repassalos para a aplicação.
    // após ter feito a tipagem no TransactionsContext e 
    // passar uma função como parametro dará um erro no transactions
    // para corrigir ele vamos desestruturar colocando chaves e escrevendo
    // qual parametro queremos pegar
    // OBS: o erro será na propriedade passada dentro do return
    // com a que recebem a propriedade 'transactions'
    // fazendo assim o erro sumirá
    const { transactions } = useTransactions()
    
    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th className="title">Titulo</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map((transaction)=>{
                            return(
                                <tr key={transaction.id}>
                                    <td>{transaction.title}</td>
                                    <td className={transaction.type}>
                                    {/* esse método aqui formata o valor passado
                                    pelo transactions.amount */}
                                    {new Intl.NumberFormat('pt-br', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(transaction.amount)}</td>
                                    <td>{transaction.category}</td>
                                    {/* esse método aqui formata as horas passadas
                                    pelo transactions.createAt, mas antes de coverter as horas corretamente
                                    deve se converter 'transaction.createAt' para horas novamente
                                    como visto abaixo */}
                                    <td>
                                        {new Intl.DateTimeFormat('pt-br').format(
                                            new Date(transaction.createAt)
                                        )}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </table>
        </Container>
    )
}