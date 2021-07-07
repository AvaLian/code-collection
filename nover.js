    var rp = require('request-promise');
    var cheerio = require('cheerio');
    var fs = require('fs')
    
    var start = 17296489
    // var end = 22688984
    var end = 17296492
    // 17296496 17296501 17296506 17296510   
    // var arrList =["17296489.html","17296492.html","17296496.html","17296501.html","17296506.html","17296510.html","17296514.html","17296517.html","17296522.html","17296526.html","17296529.html","17296532.html","17296538.html","17296542.html","17296547.html","17296551.html","17296555.html","17296559.html","17296563.html","17296568.html","17296572.html","17296575.html","17296582.html","17296586.html","17296590.html","17296594.html","17296597.html","17296602.html","17296605.html","17296609.html","17296614.html","17296617.html","17296620.html","17296625.html","17296630.html","17296634.html","17296639.html","17296642.html","17296646.html","17296649.html","17296653.html","17296656.html","17296660.html","17296666.html","17296668.html","17296672.html","17296675.html","17296680.html","17296683.html","17296687.html","17296691.html","17296696.html","17296698.html","17296701.html","17296705.html","17296710.html","17296714.html","17296718.html","17296722.html","17296729.html","17296732.html","17296738.html","17296743.html","17296749.html","17296753.html","17296757.html","17296761.html","17296764.html","17296768.html","17296770.html","17296776.html","17296781.html","17296784.html","17296788.html","17296793.html","17296797.html","17296801.html","17296807.html","17296811.html","17296816.html","17296824.html","17296829.html","17296834.html","17296839.html","17296843.html","17296848.html","17296852.html","17296856.html","17296861.html","17296865.html","17296871.html","17296877.html","17296882.html","17296887.html","17296892.html","17296897.html","17296899.html","17296904.html","17296907.html","17296911.html","17296915.html","17296919.html","17296922.html","17296926.html","17296929.html","17296933.html","17296936.html","17296941.html","17296944.html","17296948.html","17296953.html","17296958.html","17296962.html","17296967.html","17296973.html","17296977.html","17296980.html","17296985.html","17296989.html","17296994.html","17296998.html","17297001.html","17297005.html","17297012.html","17297015.html","17297019.html","17297026.html","17297031.html","17297036.html","17297040.html","17297044.html","17297048.html","17297053.html","17297056.html","17297060.html","17297065.html","17297069.html","17297072.html","17297077.html","17297082.html","22688982.html","22688983.html","22688984.html",null]
    var arrList =["17296489.html","17296492.html"]
    var arr = arrList.map(function(item,index){
      return rp('http://www.zjwyzyy.com/63/63662/'+item)
    }

    //  var arr = new Array(end-start+1).fill(null).map(function(item,index){
    //   return rp('http://www.zjwyzyy.com/63/63662/'+(start+index)+'.html')
    // })

    Promise.all(arr).then(function(res,err){
      if(err){
        console.log('err')
      }
      var str=''
      res.map(function(item,index){
        var $ = cheerio.load(item.toString());
        var table=$('body').find('.chapter_content').eq(0).text();
        var title = $('body').find('.content_right h3').eq(0).text()
        str+=title

        str+=table
      })
      fs.writeFile('./我行让我来.txt',str,'utf8',function(error){
          if(error){
              console.log(error);
              return false;
          }
          console.log('写入成功');
      })
    })