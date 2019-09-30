<template>
  <div id="app">
    <div class="navegacao container-fluid clearFix">
      <div class="logo-container">
        <img src="./assets/img/logo.png" id="logo" alt="Logo Buscapé" title="Logo do site Buscapé." />
      </div>

      <div class="menu">
        <a href="#" @click="toggleCarrinho()" :class="linkAtivo" title="Ver o Carrinho">Ver o Carrinho</a>
      </div>

      <div class="toggleNav" @click="toggleCarrinho()">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>

    <div v-if="showCarrinho" class="container-fluid carrinho-container">
      <div class="carrinho">
        <div class="produtoNoCarrinho clearFix" v-for="(c, index) in carrinho">
          <div class="imagemProduto">
            <img :src="c.images[0]" :alt="c.name" :title="c.name" />
          </div>
          <div class="descricaoProduto">
            <p @click="removeCarrinho(c, index)" class="btnClose">X</p>
            <p class="nomeProduto">{{c.name}}</p>
            <p class="valorParcelado">{{c.price.installments}} x R$ {{ c.price.installmentValue}}</p>
            <p valorAVista>ou R$ {{c.price.value}}</p>
          </div>
        </div>
        <div class="totalCarrinho container">
            <p class="subTotal">Subtotal</p>
            <hr class="spliter" />
            <p class="parcelas">10x de {{total | parcelar(total)}}</p>
            <p class="totalAVista">ou {{total}} à vista.</p>
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
export default {
  data(){
    return {
      showCarrinho : false,
      linkAtivo : "",
      carrinho : [],
      total : 0
    }
  },
  methods : {
    toggleCarrinho(){
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
        this.carrinho = JSON.parse(localStorage.getItem('products'));
    },
    removeCarrinho(p, index){
      this.carrinho = JSON.parse(localStorage.getItem('products'));
      this.carrinho.splice(index, index+1);
      localStorage.setItem("products", JSON.stringify(this.carrinho));
      this.totalCarrinho();
    },
    totalCarrinho(){
      this.total = 0;
      for(var i=0; i<this.carrinho.length; i++){
        this.total += this.carrinho[i].price.value;
      }
    }
  },
  filters : {
    parcelar(val){
      val = val / 10;
      return parseFloat(val.toFixed(2));
    }
  }
}
</script>