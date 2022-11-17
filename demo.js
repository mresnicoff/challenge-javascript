let arr = []
        const cbs1 = [
            {cb:()=>(arr.push('1-1'),'1-1'), time: 2},
            {cb:()=>(arr.push('1-2'),'1-2'), time: 3}
        ];
        const cbs2 = [
            {cb:()=>(arr.push('2-1'),'2-1'), time: 1},
            {cb:()=>(arr.push('2-2'),'2-2'), time: 4}
        ];

function multiCallbacks(cbs1, cbs2){
    let i=0
    let j=0
    let orden=[]
    let resultados=[]
while( i<cbs1.length && j<cbs2.length){
    if(cbs1[i].time<cbs2[j].time) {orden.push(cbs1[i])
i=i+1}
else {orden.push(cbs2[j])
j=j+1}}
if (i==cbs1.length){
for(let z=j;z<cbs2.length;z++){
    orden.push(cbs2[z])}}
    else{for(let z=i;z<cbs1.leng;z++){
        orden.push(cbs1[z])}}
        console.log(orden.length)
for (let w=0; w<orden.length;w++){


resultados.push(orden[w].cb())
}
return resultados
}
console.log(multiCallbacks(cbs1, cbs2))