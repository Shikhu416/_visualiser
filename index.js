document.getElementById("btn").addEventListener("click", makerequest);
let done = [];
function makerequest(e) {
    let ratings=new Map();
    let jaddu=new Map();
    let check=new Set();
    for (let index = 800; index < 3600; index+=100) { 
        ratings.set(`${index}`,0);
    }
    document.getElementById('userunsolved').style.visibility='visible';
    e.preventDefault()
    let user = document.getElementById('tarzen').value;
   // console.log(user);
    fetch(`https://codeforces.com/api/user.status?handle=${user}&from=1&count=5000`).then((res) => {
        document.getElementById('tarzen').value="";
        if (!res.ok) {
            throw Error(res.statusText);
        }
        return res.json()
    }).then((data) => {
        console.log(data);
        data.result.forEach((element) => {
            //console.log(element.verdict);
            let shikhar = element.verdict;
            if (shikhar === "OK") { let val = `${element.problem.contestId}+${element.problem.index}`;
                if(check.has(val)===false)
               {
                   check.add(val);
                   
                   if(element.problem.rating!==undefined){console.log("hojan sale");
                   let rat=element.problem.rating;
                   ratings.set(`${rat}`,ratings.get(`${rat}`)+1);
                   

                   }

                   
                   
               }
               
                done.push(val);
            }
        })
        
        let string = "";
        let ind = 0;
        console.log(done);
        console.log(ratings);

        data.result.forEach((element) => {

            let k = `${element.problem.contestId}+${element.problem.index}`;
            //console.log(element.verdict)

            if (element.verdict !== "OK" && element.verdict !== "SKIPPED") {//console.log("abcdefg");
               // console.log(k);
                if (done.includes(k) === false) {
                    ind++;
                    done.push(k)
                    console.log("abcdefg");
                    //document.getElementById("userunsolved").setAttribute("visibility","visible");
                    string += `<tr>
             <th scope="row">${ind}</th>
             <td>${element.problem.name}</td>
             <td>${element.verdict}</td>
             <td>${element.problem.index}</td>
             <td>  <a href="https://codeforces.com/problemset/problem/${element.problem.contestId}/${element.problem.index}"> Link</a> </td>
             
             </tr>`


                }
            }
        })
        let xyz = document.getElementById("list");
        xyz.innerHTML = string;
         //console.log(ratings);
         let xmas=[];
    let ymas=[];
    //const  ratingsort  = new Map([...ratings].sort());
    //console.log([...ratings].sort());
    //console.log(ratingsort);
   ratings.forEach(function(value,key){
    if(value>0){
        
        xmas.push(key);
        ymas.push(value);
    }
    })
    console.log(xmas);
    console.log(ymas);
    var xValues = xmas;
var yValues =ymas;
var barColors ="blue";
new Chart("myChart", {  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "Problem rating of questions"
    }
}});
    }).catch((error) => { console.log(error) });
   
    

  

}
