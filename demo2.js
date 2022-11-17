let cbs1 = [
      {cb:function(){return '1-1'}, time: 2},
      {cb:function(){return '1-2'}, time: 3}];
 let cbs2 = [
       {cb:function(){return '2-1'}, time: 1},
       {cb:function(){return '2-2'}, time: 4} ];

function multiCallbacks(cbs1, cbs2) {
    let i = 0;
    let j = 0;
    let orden = [];
    let resultados = [];
    while (i < cbs1.length && j < cbs2.length) {
      if (cbs1[i].time < cbs2[j].time) {
        orden.push(cbs1[i]);
        i = i + 1;
      } else {
        orden.push(cbs2[j]);
        j = j + 1;
      }
    }
    if (i == cbs1.length)
      for (z = j; z < cbs2.length; z++) {
        orden.push(cbs2[z]);
      }
    else {
      for (z = i; z < cbs1.length; z++) {
        orden.push(cbs1[z]);
      }
    }
    for (let i = 0; i < orden.length; i++) {
      resultados.push(orden[i].cb());
    }
    return resultados;}

    console.log(multiCallbacks([
        {cb:function(){return '1-1'}, time: 2},
        {cb:function(){return '1-2'}, time: 3}],  [
            {cb:function(){return '2-1'}, time: 1},
            {cb:function(){return '2-2'}, time: 4} ]));