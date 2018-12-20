<template>
  <div class="homeSearch">
    <header class="header">
      <div>
        <img src="http://w.wantscart.com/static/images/3.png" alt="">
      </div>
      <div @click="searchinterface()">
        <img src="http://w.wantscart.com/static/images/1.png" alt="">
        <span>潮流新品特卖</span>
      </div>
      <div>
        <img src="http://w.wantscart.com/static/images/2.png" alt="">
      </div>
    </header>

    <div class="search">
      <header class="search-header">
        <div @click="fanhui()">
          <img src="http://w.wantscart.com/static/images/7.jpg" alt="">
        </div>
        <div>
          <img src="http://w.wantscart.com/static/images/6.jpg" alt="">
        </div>
        <div>
          <input type="text" placeholder="请输入搜索内容" v-model="HS" @focus="shuru">
        </div>
        <div class="cha">
          <p @click="qingkong()">×</p>
        </div>
      </header>
      <div class="hot-search">
        <div>
          <p>热门搜索</p>
        </div>
        <ul>
          <li v-for="(item,index) in hotwords" :key="index" v-text="item" @click="clickSearch(item)"></li>
        </ul>
      </div>
      <div class="jieguo">
        <ul>
          <li v-for="(item,index) in searchresult" :key="index">
            <img :src="item.small_img" alt="">
            <p v-text="item.title"></p>
            <span>{{item.special_price | money}}</span>&emsp;<span><s>{{item.tag_price | money}}</s></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "homeSearch",
    data() {
      return {
        hotwords: [],
        HS: '',
        searchresult: []
      }
    },
    created() {
      this.hotSearch()
    },
    methods: {
      hotSearch: function () {
        var _this = this
        this.$http.get('/wants/config?key=search_hotwords').then(function (value) {
          _this.hotwords = value.body[0]
        })
      },
      shuru: function () {
        var _this = this
        document.onkeydown = function (event) {
          let e = event ? event : (window.event ? window.event : null)
          if (e.keyCode == 13) {
            _this.$http.get('/wants/product/w/' + _this.HS + '?m=1&limit=18').then(function (value) {
              _this.searchresult = value.body
            })
          }
        }
      },
      qingkong: function () {
        this.HS = ''
      },
      clickSearch: function (value) {
        this.HS = value
        var _this = this
        this.$http.get('/wants/product/w/' + this.HS + '?m=1&limit=18').then(function (value) {
          _this.searchresult = value.body
        })
      },
      fanhui:function () {
        document.getElementsByClassName('search')[0].style.display = 'none'
      },
      searchinterface:function () {
        document.getElementsByClassName('search')[0].style.display = 'block'
      }
    },
    watch: {
      HS: function () {
        if (this.HS != '') {
          document.getElementsByClassName('cha')[0].style.display = 'block'
        } else {
          document.getElementsByClassName('cha')[0].style.display = 'none'
          this.searchresult = []

        }
      },
      searchresult: function () {
        if (this.searchresult.length != 0) {
          document.getElementsByClassName('hot-search')[0].style.display = 'none'
          document.getElementsByClassName('jieguo')[0].style.display = 'block'
        } else {
          document.getElementsByClassName('hot-search')[0].style.display = 'block'
          document.getElementsByClassName('jieguo')[0].style.display = 'none'
        }
      }
    }
  }
</script>

<style scoped>
  ul {
    list-style: none;
    padding: 0;
  }

  .header {
    width: 100vw;
    height: 12vw;
    background: #fff034;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5vw;
  }

  .header div img {
    width: 5vw;
    height: 5vw;
  }

  .header div:nth-child(2) img {
    width: 3.3vw;
    height: 3.3vw;
  }

  .header div:nth-child(2) {
    width: 70vw;
    height: 7vw;
    background: white;
    line-height: 7vw;
    color: #D6D6D6;
    font-size: 12px;
  }

  .search {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    background: white;
    display: none;
    z-index: 501;
  }

  .search-header {
    width: 100vw;
    height: 14vw;
    display: flex;
    align-items: center;
    padding: 0 5vw;
  }

  .search-header img {
    width: 8vw;
    height: 8vw;
  }

  .search-header div:first-child img {
    margin-right: 10vw;
  }

  .search-header input {
    width: 60vw;
    font-size: 20px;
    border: 0;
  }

  .search-header p {
    font-size: 8vw;
    line-height: 8vw;
  }

  .hot-search > div {
    width: 100vw;
    height: 14vw;
    background: #fbfbfb;
    line-height: 14vw;
    padding-left: 5vw;
  }

  .hot-search > div p {
    font-size: 20px;
    text-align: left;
    color: #555;
  }

  .hot-search ul {
    overflow: hidden;
    z-index: 1;
  }

  .hot-search ul li {
    float: left;
    font-size: 15px;
    padding: 0 3vw;
    margin: 2vw 3vw;
    background: white;
    color: #999;
    border: 1px solid #999;
    border-radius: 1vw;
  }

  .cha {
    display: none;
  }

  .jieguo{
    display: none;
  }

  .jieguo>ul{
    overflow: hidden;
    z-index: 1;
  }
  .jieguo>ul>li{
    width: 50vw;
    height: 44vh;
    float: left;
    padding: 3vw 3vw 0;
    text-align: left;
  }
  .jieguo>ul>li>img{
    width: 45vw;
  }
  .jieguo>ul>li>p{
    width: 50vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 2vw;
  }
  .jieguo>ul>li>span:nth-child(3){
    color: red;
  }
  .jieguo>ul>li>span:nth-child(4){
    color: #A8ABAF;
  }
</style>
