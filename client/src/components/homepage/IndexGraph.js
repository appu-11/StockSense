import { createChart, ColorType, CrosshairMode, LineStyle, LineType, TickMarkType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

const Indexgraph = (props) => {
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
    
    const chartContainerRef = useRef(null);

    useEffect(() => {
        if (chartContainerRef.current) {
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
        chart.timeScale().fitContent();


        chart.applyOptions({
            layout: {
            textColor: 'black',
            background: { type: 'solid', color: 'white' },
            },
        });

        chart.applyOptions({ width: chartContainerRef.current.clientWidth });

        chart.applyOptions({
            rightPriceScale: {
            scaleMargins: {
                top: 0.3, // leave some space for the legend
                bottom: 0.25,
            },
            },
            crosshair: {
            horzLine: {
                visible: false,
                labelVisible: false,
            },
            vertLine: {
                labelVisible: false,
            },
            },
            grid: {
            vertLines: {
                visible: false,
            },
            horzLines: {
                visible: false,
            },
            },
        });

        const series = chart.addAreaSeries({
            topColor: 'rgba( 38, 166, 154, 0.28)',
            bottomColor: 'rgba( 38, 166, 154, 0.05)',
            lineColor: 'rgba( 38, 166, 154, 1)',
            lineWidth: 2,
            crossHairMarkerVisible: false,
        });

        series.setData(data);
        if(data){
            console.log(data, "data");
            console.log("Index graph data fine");
        }
        window.addEventListener('resize', handleResize);
        return () => {
            if (chartContainerRef.current) {
                window.removeEventListener('resize', handleResize);
                chart.remove();
                chartContainerRef.current.remove();
            }
        };
    }
    }, []);
    

	return (
        <div
            ref={chartContainerRef}
		/>
	);
};
export default Indexgraph;