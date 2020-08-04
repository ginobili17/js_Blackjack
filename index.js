'use strict';

{

  var cards = [];
  var p1 = document.getElementById('p1');
  var p2 = document.getElementById('p2');
  var p3 = document.getElementById('p3');
  var p4 = document.getElementById('p4');
  var dealerSum = 0;
  var playerSum = 0;
  var result = document.getElementById('result');
  var dealerResult = document.getElementById('dealer-result');

  
  function init() {
    for (var m = 1; m < 5; m++) {
      if (m === 1) {
        var mark = '♠️';

      } else if (m === 2) {
        var mark = '♣️';
      } else if (m === 3) {
        var mark = '❤︎';
      } else if (m === 4) {
        var mark = '♦︎';
      }

      for (var i = 1; i < 14; i++) {
        var tramp = (mark + i);
        cards.push(tramp);
      }
    }

    
    // 手札生成の関数
    function getNum(a, b, c) {

      //カードをランダムで生成
      var card = cards.splice(Math.floor(Math.random() * cards.length),1)[0];
      
      // 数字のみ取得する関数
      function checkNum() {
        return card.replace(/[^0-9]/g, '')
      }

      if(a.innerHTML !== '') {
  
        if (checkNum() >= 10) {
          b.name = 10;
        } else if (checkNum() === '1' && a.name !== 11) {
          b.name = 11;
        } else {
          b.name = checkNum();
        }
  
        c = (Number(a.name) + Number(b.name))
        result.innerHTML = c
        
        b.innerHTML = card;
  
        return result.innerHTML;
  
      } else {
  
        if (checkNum() >= 10) {
          a.name = 10;
        } else if (checkNum() === '1') {
          a.name = 11;
        } else {
          a.name = checkNum();
        }
  
        a.innerHTML = card
  
      }

    };


    // ディーラー手札生成
    var d = 1
    while (d < 3) {
      getNum(p3, p4, dealerSum)
      dealerSum = Number(result.innerHTML)
      d++
    }

    // プレイヤー手札生成
    var p = 1
    while (p < 3) {
      getNum(p1, p2, playerSum)
      playerSum = Number(result.innerHTML)
      p++
    }
  };


  // ドロー生成関数
  function drowNum(n) {
    if (n.name >= 10) {
      n.name = 10;
    } else if (n.name === '1' &&  playerSum <= '10') {
      n.name = 11;
    } else {
      n.name = n.name;
    }
  }

  

  // ヒットをクリックした時
  var hit = document.getElementById('hit');
  hit.addEventListener('click', function() {

    var player = document.getElementById('player');
    var drow;

    drow = document.createElement('div');
    drow.className = 'card-front';
    drow.innerHTML =  cards.splice(Math.floor(Math.random() * cards.length),1)[0];
    player.appendChild(drow);

    drow.name = Number(drow.innerHTML.replace(/[^0-9]/g, ''))

    if (drow.name >= 10) {
      drow.name = 10;
    } else if (drow.name === '1' &&  playerSum <= '10') {
      drow.name = 11;
    } else {
      drow.name = drow.name;
    }

    playerSum += Number(drow.name);

    result.innerHTML = playerSum

    

    if (playerSum > 21) {
      if (p1.name === 11) {
        p1.name = 1;
        playerSum -= 10;
        result.innerHTML = playerSum
      } else if (p2.name === 11) {
        p2.name = 1;
        playerSum -= 10;
        result.innerHTML = playerSum
      } else if (drow.name === 11) {
        drow.name = 1;
        playerSum -= 10;
        result.innerHTML = playerSum
      } else {
        result.innerHTML = playerSum + ':バースト！<br>プレイヤーの負けです...';
        hit.style.display = 'none';
        stand.style.display = 'none';
      }
    }
  
    
  });



  // スタンドをクリックした時
  var stand = document.getElementById('stand');
  stand.addEventListener('click', function() {
    p3.className = 'card-front'
    dealerResult.innerHTML = dealerSum


    while(dealerSum <= 16) {

      var dealer = document.getElementById('dealer');
      var dealerDrow;

      dealerDrow = document.createElement('div');
      dealerDrow.className = 'card-front';
      dealerDrow.innerHTML =  cards.splice(Math.floor(Math.random() * cards.length),1)[0];
      dealer.appendChild(dealerDrow);

      dealerDrow.name = dealerDrow.innerHTML.replace(/[^0-9]/g, '')


      drowNum(dealerDrow);
      if (dealerDrow.name >= 10) {
        dealerDrow.name = 10;
      } else if (dealerDrow.name === '1' &&  playerSum <= '10') {
        dealerDrow.name = 11;
      } else {
        dealerDrow.name = dealerDrow.name;
      }
      

      dealerSum += Number(dealerDrow.name)
      dealerResult.innerHTML = dealerSum


      if (dealerSum > 21) {
        if (p3.name === 11) {
          p3.name = 1;
          dealerSum -= 10;
          dealerResult.innerHTML = dealerSum
        } else if (p4.name === 11) {
          p4.name = 1;
          dealerSum -= 10;
          dealerResult.innerHTML = dealerSum
        } else if (dealerDrow.name === 11) {
          dealerDrow.name = 1;
          dealerSum -= 10;
          dealerResult.innerHTML = dealerSum
        } else {
          dealerResult.innerHTML = dealerSum + ':バースト！<br>プレイヤーの勝ちです！';
          hit.style.display = 'none';
          stand.style.display = 'none';
        }
      }

    }

    if (dealerSum <= 21) {
      if (playerSum > dealerSum) {
        result.innerHTML = playerSum + ': win!!';
        hit.style.display = 'none';
        stand.style.display = 'none';
      } else if (dealerSum > playerSum) {
        result.innerHTML = playerSum + ': lose...';
        hit.style.display = 'none';
        stand.style.display = 'none';
      } else {
        result.innerHTML = playerSum + ': draw!';
        hit.style.display = 'none';
        stand.style.display = 'none';
      }
    } else {
      result.innerHTML = playerSum + ': win!!';
      hit.style.display = 'none';
      stand.style.display = 'none';
    }

  });


  init();

}