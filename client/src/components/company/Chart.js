import { createChart, ColorType, CrosshairMode, LineStyle, LineType, TickMarkType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

const Chart = props => {
	const [pos, setPos] = React.useState({
		open: 0,
		high: 0,
		close: 0,
		low: 0,
	});
	
	const {
		data,
		colors: {
			backgroundColor = 'white',
			lineColor = '#2962FF',
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;
	const chartContainerRef = useRef();

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 300,
			});
            chart.applyOptions({
                crosshair: {
                    mode: CrosshairMode.Normal,
                    vertLine: {
                        width: 1,
                        style: LineStyle.Solid,
                    },
                },
                timeScale: {
                    barSpacing: 2, // Adjust bar spacing if needed
                },
            });
            const areaSeries = chart.addAreaSeries({
                lastValueVisible: false, // hide the last value marker for this series
                crosshairMarkerVisible: false, // hide the crosshair marker for this series
                lineColor: 'transparent', // hide the line
                topColor: 'rgba(56, 33, 110,0.6)',
                bottomColor: 'rgba(56, 33, 110, 0.1)',
            });
			chart.timeScale().fitContent();

			const newSeries = chart.addCandlestickSeries({
                upColor: '#26a69a',
                downColor: '#ef5350',
                borderVisible: true,
                wickUpColor: '#26a69a',
                wickDownColor: '#ef5350',
                wickVisible: true,
            });
			newSeries.setData(data);
			if(data) {
				console.log("Data in graph fine");
			}
			// chart.subscribeClick(handleChartClick);
			chart.subscribeCrosshairMove(handleCrosshairMove);
			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},[]);

		const handleChartClick = (event) => {
			if(event){
				const data = event.seriesData;
				var fin;
				data.forEach((value, key) => {
					fin = value;
				});
				console.log(fin);
			}
		};
		
		const handleCrosshairMove = (event) => {
			if(event){
				const data = event.seriesData;
				var fin;
				data.forEach((value, key) => {
					fin = value;
				});
				if(fin){
					setPos(fin);
				}
			}
		};

	return (
		<>
			<div>
				open:{pos.open} high:{pos.high} low:{pos.low} close:{pos.close} 
			</div>
			<div
				ref={chartContainerRef}
		/>
		</>
	);
};
export default Chart;