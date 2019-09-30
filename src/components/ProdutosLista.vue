<template>
    <div class="container-fluid">
        <div class="boxProduto" v-for="produto in produtos">
            <div class="container">
                <div class="row">
                    <div class="galeria-container col-2">
                        <div class="galeria">
                            <img @click="changeImage($event.target)" v-for="img in produto.product.images" v-bind:src="img" width="40" height="40" />
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="boxImgProduto">
                            <img :src="produto.product.images[0]" alt="Tv"/>
                        </div>
                    </div>
                    <div class="col-6 media">
                        <div class="descricao">
                            <p>{{produto.product.name}}</p>
                            <hr class="spliterProduto" />
                            <span class="badgePreco">Melhor preço</span>
                            <p class="parcelasProduto">10 x de <span class="txtBig">R$ 344,10</span> <span @click="addCarrinho(produto.product)" class="addCarrinho">Adicionar ao carrinho <span class="badgeLink">></span></span></p>
                            <p class="total-a-vista">ou <span class="txtBig">3441,00</span> à vista</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import axios from 'axios'

export default {

    name : 'ProdutosLista',
    mounted(){
        this.getProdutos();
    },
    data(){
        return {
            urlApi : "https://raw.githubusercontent.com/buscape-company/exercicios/master/frontend/resources/data.json",
            produtos : [],
            carrinho : [],
        }
    },
    methods : {
        getProdutos(){
            axios.get(this.urlApi)
            .then((response) => {
                var data = response.data;
                this.produtos = data.items;
            })
            .catch((err)=>{
                console.log('Erro ao buscar dados da API.');
            });
        },
        changeImage($e){
            $e.parentElement.parentElement.nextElementSibling.children[0].firstChild.src = $e.src;
        },
        addCarrinho(p){
            this.carrinho = JSON.parse(localStorage.getItem('products'));
            this.carrinho.push(p);
            localStorage.removeItem("products");
            localStorage.setItem("products", JSON.stringify(this.carrinho));
        }
    }
}
</script>

<style scoped>
    .boxProduto{
        margin-top: 10px;
        background-color: #FFF;
    }

    .galeria-container{
        width: 100%;
    }

    .galeria{
        background: #FFF;
        padding: 10px;
        border-radius: 6px;
        width: 100%;
    }

    .galeria > img{
        display: none;
        float: left;
        margin: 2px;
        border-radius: 4px;
        border: 2px solid #ffce00;
    }

    .boxImgProduto img{
        width: 100%;
        height: 100%;
        max-width: 300px;
    }

    .descricao{
        padding: 20px;
    }

    .center{
        margin: 0 auto;
    }

    .badgePreco{
        background-color: #038ee2;
        border-radius: 4px 100px 100px 4px;
        color: #FFF;
        padding: 4px;
        margin-top: 10px;
    }

    .parcelasProduto{
        color: #10b246;
        font-weight: bolder;
        margin-top: 25px;
    }

    .txtBig{
        color: #10b246;
        font-size: 20px;
        padding: 3px;
    }

    .spliterProduto{
        margin-top: 30px;
    }

    .addCarrinho{
        text-decoration: none;
        color: #FFF;
        background-color: #10b246;
        padding: 4px;
        font-size: 10px;
        border-radius: 4px;
        display: block;
        text-align: center;
        cursor: pointer;
    }

    .badgeLink{
        font-weight: bolder;
        font-size: 12px;
    }

    .total-a-vista{
        font-size: 12px;
    }

    .media{
        flex: 0 0 100% !important;
        max-width: 100% !important;
    }


    @media all and (min-width: 720px){
        .galeria{
            width: 100%;
        }

        .galeria img{
            float: none;
            display: block;
        }

         .media{
            flex: 0 0 50% !important;
            max-width: 50% !important;
        }
    }
</style>