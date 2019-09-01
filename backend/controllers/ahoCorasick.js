var AhoCorasick = require('ahocorasick');


str1 = new String('kajshdiuhuicxvjkasiqwbdc7832hr8hfiafu93rn3h9h&*@siqwbdc7832hr8hfiafu93rn3h9h&*@jhgc7g7b8g128og2efibehebkaefby3vrg8nohOIPEJH9278yN782GN82G873WGR83W7GR8AW74GH87g*G8g8gnh798gn87G7O8G8OGYUG68to845256156156321653156321r52631v506310r56w1t56w1t561g65s1g65s1Y*&g8gidsbfklhb ahwbakh bakjla');
subStr1 = new String('iqwbdc7');
subStr2 = new String('ahwbakh');
subStr3 = new String('8gn87G7O8G8OGYUG68to845256156156321653156321r52631v506310r56w1t56w1');

strArr = [];
strArr.push(['Holiday'.toLowerCase(), 'testing']);
strArr.push(['peepee','poo']);
strArr.forEach(str => {

  var ac = new AhoCorasick(str);
  var results = ac.search('   holiday the testing'.toLowerCase());

  if(results.length == 0){
    results = 'nothing';
  }
});


