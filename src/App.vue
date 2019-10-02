<template>
  <div id="app">
    <div class="navegacao container-fluid clearFix">
      <div class="logo-container">
        <img src="./assets/img/logo.png" id="logo" alt="Logo Buscapé" title="Logo do site Buscapé." />
      </div>

      <div class="menu">
        <a href="#" @click="toggleCarrinho()" :class="linkAtivo" title="Ver o Carrinho">Ver o Carrinho <span class="quantidadeMenu">({{quantidade}})</span></a>
      </div>

      <div class="toggleNav" @click="toggleCarrinho()">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <span class="quantidade">{{quantidade}}</span>
      </div>
    </div>

    <div v-if="showCarrinho" class="container-fluid carrinho-container">
      <div class="carrinho">
        <div class="produtoNoCarrinho clearFix" v-for="(c, index) in items">
          <div class="imagemProduto">
            <img :src="c.images[0]" :alt="c.name" :title="c.name" />
          </div>
          <div class="descricaoProduto">
            <p @click="removeCarrinho(c, index)" class="btnClose">X</p>
            <p class="nomeProduto">{{c.name}}</p>
            <p class="valorParcelado">{{c.price.installments}} x R$ {{ c.price.installmentValue | numberFormat(c.price.installmentValue)}}</p>
            <p valorAVista>ou R$ {{c.price.value | numberFormat(c.price.value)}}</p>
          </div>
        </div>
        <div class="totalCarrinho container">
            <p class="subTotal">Subtotal</p>
            <hr class="spliter" />
            <p class="parcelas">10x de {{total | parcelar(total)}}</p>
            <p class="totalAVista">ou {{total | numberFormat(total) }} à vista.</p>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style>

body{
  background-color: #f2f2f2 !important;
}

.navegacao{
  background-color: #ffce00;
}

.logo-container{
  width: 100px;
  float: left;
  cursor: pointer;
}

#logo{
  width: 100%;
  padding: 10px;
}

.menu{
  float: left;
  display: none;
}

.menu > a{
  position: relative;
  top: 23px;
  background-color: #333;
  color: #FFF;
  padding: 26px;
}

.menu > a:hover{
  background-color: rgba(0,0,0,1);
  color: #FFF;
  text-decoration: none;
}

.toggleNav{
  width: 40px;
  height: 40px;
  border-radius: 6px;
  float: right;
  position: relative;
  top: 15px;
  cursor: pointer;
}

.line:first-child{
  margin-top: 4px;
}

.line{
  width: 100%;
  height: 6px;
  background: #000;
  margin-bottom: 8px;
  border-radius: 8px;
}

.clearFix::after{
  display: table;
  content: "";
  clear: both;
}

.carrinho-container{
  width: 100%;
  background: #ffce00;
  position: absolute;
  box-shadow: 0 0 10px #333;
  padding: 0 !important;
  z-index: 100 !important;
}

.carrinho{
  width: 100%;
}

.produtoNoCarrinho{
  background: #c59e00;
  margin-bottom: 6px;
}

.imagemProduto{
  float: none;
  width: 120px;
  height: 120px;
  padding: 10px;
  margin: 0 auto;
}

.imagemProduto > img{
  width: 100%;
  border: 1px solid #333;
}

.descricaoProduto{
  float: none;
  padding: 12px;
  width: 100%;
}

.nomeProduto{
  color: #FFF;
  font-size: 100%;
  font-weight: bolder;
  width: 90%;
}

.subTotal{
  text-align: right;
}

.spliter{
  width: 100%;
  border-top: 2px solid #333;
}

.parcelas{
  text-align: right;
  margin: 0 !important;
}

.totalAVista{
  text-align: right;
  margin: 0 !important;
}

.btnClose{
  float: right;
  position: relative;
  right: 10px;
  cursor: pointer;
}

.quantidade{
  display: block;
  background-color: rgba(255,0,0,0.9);
  color: #FFF;
  font-size: 1.5em;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  position: relative;
  top: -35px;
  left: -20px;
  text-align: center;
}

@media all and (min-width: 980px){
  .menu{
    display: block;
  }

  .toggleNav{
    display: none;
  }

  .active{
    background: #000 !important;
    color: #FFF;
  }
}

@media all and (min-width: 600px){
  .imagemProduto{
  float: left;
  width: 120px;
  height: 120px;
  padding: 10px;
  margin: 0 auto;
}

  .descricaoProduto{
    float: left;
    padding: 12px;
    width: 80%;
  }
}
</style>

<script>
import { EventBus } from '../event-bus.js'
export default {
  created(){
    let qntd = JSON.parse(localStorage.getItem("products"));

    if(qntd != null){
      this.quantidade = qntd.length;
    } else {
      this.qntd = 0;
    }


    EventBus.$on('addCarrinho', (tamanho)=>{
      let val = JSON.parse(localStorage.getItem("products"));
      if(val == null){
        this.quantidade = 0;
      }else {
        this.quantidade = val.length;
        this.savedProducts();
      }
    });

    EventBus.$on('removeCarrinho', ()=>{
      let val = JSON.parse(localStorage.getItem("products"));
      if(val == null){
        this.quantidade = 0;
      }else {
        this.quantidade = val.length;
        this.savedProducts();
      }
    });
  },
  data(){
    return {
      showCarrinho : false,
      linkAtivo : "",
      items : [],
      total : 0,
      quantidade : 0
    }
  },
  methods : {
    toggleCarrinho(){
        if(this.quantidade == 0){
          this.showCarrinho = false;
          this.linkAtivo = "";
          alert('Carrinho vazio! Adicione itens!');
         return;
        }
        if(this.showCarrinho){
          this.showCarrinho = false;
          this.linkAtivo = "";
        } else {
          this.showCarrinho = true;
          this.linkAtivo = "active";
          this.savedProducts();
          this.totalCarrinho();
        }
    },
    savedProducts(){
      let test = JSON.parse(localStorage.getItem('products'));
      if(test != null){
        this.items = JSON.parse(localStorage.getItem('products'));
        this.quantidade = this.items.length;
      } else {
        localStorage.setItem("products",JSON.stringify([]));
        this.items = JSON.parse(localStorage.getItem('products'));
        this.quantidade = this.items.length;
      }
      if(this.quantidade == 0){
        this.showCarrinho = false;
        this.linkAtivo = "";
      }
    },
    removeCarrinho(p, index){
      let test = JSON.parse(localStorage.getItem("products"));

      if(test != null){
        index = Number.parseInt(index);
        let temp = JSON.parse(localStorage.getItem("products"));
        temp.splice(index, 1);
        localStorage.setItem("products",JSON.stringify(temp));
        this.items = temp;
        this.savedProducts();
        this.totalCarrinho();
      } else {
        localStorage.setItem("products",JSON.stringify([]));
      }
      EventBus.$emit('removeCarrinho');
    },
    totalCarrinho(){
      this.total = 0;
      for(var i=0; i<this.items.length; i++){
        this.total += this.items[i].price.value;
      }
    }
  },
  filters : {
    parcelar(val){
      val = val / 10;
      return parseFloat(val.toFixed(2));
    },
    numberFormat(val){
      return val.toFixed(2);
    }
  }
}
</script>