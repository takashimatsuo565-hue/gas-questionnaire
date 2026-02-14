/* ===== レーダーチャート ===== */
console.log("chartcommon loaded");
document.write("test");

const ctx = document.getElementById("radarChart");

const chart = new Chart(ctx, {
  type: "radar",

  data: {
    labels: categories,
    datasets: [{
      label: "レーダーチャート",
      data: [0,0,0,0]
    }]
  },

  plugins: [ChartDataLabels],

  options: {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,

    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            size: 18
          }
        }
      },

      datalabels: {
        formatter: function(value) {
          return value === 0 ? "" : value.toFixed(1);
        },
        color: "black",
        font: {
          weight: "bold",
          size: 24
        }
      }
    },

    scales: {
      r: {
        min: 0,
        max: 7,

        pointLabels: {
          font: {
            size: 32
          }
        },

        ticks: {
          stepSize: 1,
          font: {
            size: 20
          }
        }
      }
    }
  }
});



/* ===== グラフ更新 ===== */
function updateChart(){

  let sums=[0,0,0,0];
  let counts=[0,0,0,0];
  let unanswered=[];

  questions.forEach((_,i)=>{
    const checked=document.querySelector(`input[name="q${i}"]:checked`);

    if(!checked){
      unanswered.push(i+1);
      return;
    }

    const val=parseInt(checked.value);
    const cat=categoryMap[i];
    sums[cat]+=val;
    counts[cat]++;
  });

  // ✅ 警告表示
  const warningDiv=document.getElementById("warning");

  if(unanswered.length>0){
    warningDiv.textContent =
      "未回答の質問があります： " + unanswered.join(" , ");
  }else{
    warningDiv.textContent="";
  }

  // ✅ グラフ更新
  const averages=sums.map((sum,i)=>{
    return counts[i]? sum/n_item[i]:0;
  });

  chart.data.datasets[0].data=averages;
  chart.update();
}


