<template>
    <div class="container-fluid">
        <div class="boxProduto" v-for="produto in produtos">
            <div class="container">
                <div class="row">
                    <div class="galeria-container col-2">
                        <div class="galeria">
                            <img @click="changeImage($event.target)" @error="testeSrc($event.target)" v-for="(img, index) in produto.product.images" :src="img" alt="x" width="40" height="40" />
                        </div>
                    </div>
                    <div class="col-4 mobile">
                        <div class="boxImgProduto">
                            <img :src="produto.product.images[0]" :alt="produto.product.name"/>
                        </div>
                    </div>
                    <div class="col-6 media">
                        <div class="descricao">
                            <p>{{produto.product.name}}</p>
                            <hr class="spliterProduto" />
                            <span class="badgePreco">Melhor preço</span><span class="back"></span>
                            <p class="parcelasProduto">{{produto.product.price.installments}} x de <span class="txtBig">R$ {{produto.product.price.installmentValue | numberFormat(produto.product.price.installmentValue)}}</span> <span @click="addCarrinho(produto.product)" class="addCarrinho">Adicionar ao carrinho <i class="badgeLink">></i></span></p>
                            <p class="total-a-vista">ou <span class="txtBig">{{produto.product.price.value | numberFormat(produto.product.price.value)}}</span> à vista</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

import axios from 'axios'
import { EventBus } from '../../event-bus.js'

export default {

    name : 'ProdutosLista',
    mounted(){

        let isInit = JSON.parse(localStorage.getItem("products"));
        if(isInit == null){
            localStorage.setItem("products", JSON.stringify([]));
        }
        this.getProdutos();
    },
    data(){
        return {
            urlApi : "https://raw.githubusercontent.com/buscape-company/exercicios/master/frontend/resources/data.json",
            produtos : [],
            carrinho : [],
            imgDefault : "http://www.musicmemes.com/wp-content/themes/photobook/images/blank.png"
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
            let temp = JSON.parse(localStorage.getItem("products")); //Evitar que dê erro se alguem apagar a variável no local storage;
            if(temp != null){
                this.carrinho = JSON.parse(localStorage.getItem("products"));
                this.carrinho.push(p);
                localStorage.removeItem("products");
                localStorage.setItem("products", JSON.stringify(this.carrinho));
                EventBus.$emit('addCarrinho');
                alert("Adicionado!");
            } else {
                localStorage.setItem("products", JSON.stringify(this.carrinho));
                this.carrinho = JSON.parse(localStorage.getItem("products"));
                this.carrinho.push(p);
                localStorage.removeItem("products");
                localStorage.setItem("products", JSON.stringify(this.carrinho));
                EventBus.$emit('addCarrinho');
                alert("Adicionado!");
            }
        },
        testeSrc(el){
            el.removeAttribute("src");
            el.src = this.imgDefault;
        }
    },
    filters : {
        numberFormat(val){
            return val.toFixed(2);
        }
    }
}
</script>

<style scoped>
    .boxProduto{
        margin-top: 10px;
        background-color: #FFF;
        box-shadow: 0 0 6px #333;
        border-radius: 4px;
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
        width: 100%;
        padding: 20px;
    }

    .center{
        margin: 0 auto;
    }

    .mobile{
        flex: none;
        max-width: 100%;
        padding-top: 20px;
    }

    .badgePreco{
        background-color: #038ee2;
        color: #FFF;
        padding: 2px 4px 4px 4px;
        margin-top: 10px;
        overflow: hidden;
        border-radius: 4px 0 0 4px;
    }

    .back{
        position: relative;
        display: inline-block;
        width: 0; 
        height: 0; 
        border-top: 13px solid transparent;
        border-bottom: 13px solid transparent;
        border-left: 13px solid #038ee2;
        top: 8px;
        
        
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
        width: 100%;
        color: #FFF;
        background-color: #10b246;
        padding: 4px 20px 4px 20px;
        font-size: 10px;
        border-radius: 4px;
        display: block;
        text-align: center;
        cursor: pointer;
    }

    .badgeLink{
        font-weight: bolder;
    }

    .total-a-vista{
        font-size: 12px;
    }


    .boxImgProduto > img{
        display: block;
        margin: 0 auto;
    }

    .media{
        flex: none;
        max-width: 100%;
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
            flex: 0 0 50%;
            max-width: 50%;
        }

        .boxImgProduto > img{
            display: block;
            margin: 0 auto;
        }

        .addCarrinho{
            width: fit-content;
        }

        .mobile{
            flex: 0 0 33.333333%;
            max-width: 33.333333%;
        }
    }
</style>