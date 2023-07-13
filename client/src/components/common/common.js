import Chart from 'react-apexcharts';
export function Common ({ item, ind }) {
    const chart = {
        options: {
          chart: {
            type: 'candlestick',
            height: 350
          },
          title: {
            text: (ind === 0 ? "HDFC BANK" : "RELIANCE"),
            align: 'left'
          },
          xaxis: {
            type: 'datetime'
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        },
    };
    console.log(item)
    console.log("this")
    return (
        <Chart options={chart.options} series={[{data:item}]} type="candlestick" height={350} width={500} />
    );
};