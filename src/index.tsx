import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';


createServer({
// o mirageJs tem tipo um banco de dados interno para utilizarmos
// para isso vamos definir a propriedade models

  models: {
    transaction: Model
  },

  seeds(server){
    // utilizando esses métodos abaixo deixamos dados pré carregados
    // na aplicação
    server.db.loadData({
      transactions: [
        {
          id:1,
          title: 'Freelance de Websites',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id:2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createAt: new Date('2021-02-14 11:00:00'),
        },
      ]
    })
  },

  routes(){
    //  na nossa chamada da api colocamos 'api' na parte do linki e devemos
    //  passalo na configuração e criação do server com o miragejs
    //  todas as chamadas realizadas na estarão sendo apartir do endereço 'api'
    //  ele vai colocar todas as chamdas api para o miragejs após reconhecer a rota
    //  passada na requisição

    
    this.namespace = 'api'

    // quando houver uma requisição do tipo GET
    this.get('/transactions', () => {
      // aqui pegamos utilizamos o metodo schema e sua propriedade all
      // para pegarmos a tabela criada no models chamda (transaction) 
      return this.schema.all('transaction')
    })
    this.post('transactions', (schema, request)=>{
      // como estamos passando os dados da aplicação no formato
      //JSON devemos convertelos para json antes de pegar seus valores
      const data = JSON.parse(request.requestBody)

      // para criar a tabela utilizamos o (create())
      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


