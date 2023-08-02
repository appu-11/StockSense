import { createChart, ColorType, CrosshairMode, LineStyle, LineType, TickMarkType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

const Graph = (props) => {
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
    const tooltipRef = useRef(null);
    const chartboxRef = useRef(null);

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
            console.log(data, "data in graph combined");
            console.log("user graph data fine");
        }
        const toolTipWidth = 80;
        const toolTipHeight = 80;
        const toolTipMargin = 15;
        const toolTip = tooltipRef.current;
        const container = chartboxRef.current;
        toolTip.style = `width: fit-content; height: 100px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
        toolTip.style.background = 'white';
        toolTip.style.color = 'black';
        toolTip.style.borderColor = 'rgba( 38, 166, 154, 1)';
        chart.subscribeCrosshairMove(param => {
            if (
                param.point === undefined ||
                !param.time ||
                param.point.x < 0 ||
                param.point.x > container.clientWidth ||
                param.point.y < 0 ||
                param.point.y > container.clientHeight
            ) {
                toolTip.style.display = 'none';
            } else {
                // time will be in the same format that we supplied to setData.
                // thus it will be YYYY-MM-DD
                const dateStr = param.time;
                toolTip.style.display = 'block';
                const data = param.seriesData.get(series);
                const price = data.value !== undefined ? data.value : data.close;
                toolTip.innerHTML = `<div style="color: ${'rgba( 38, 166, 154, 1)'}">Value</div><div style="font-size: 24px; margin: 4px 0px; color: ${'black'}">
                    &#8377; ${Math.round(100 * price) / 100}
                    </div><div style="color: ${'black'}">
                    ${dateStr}
                    </div>`;
                const containerRect = container.getBoundingClientRect();
                const chartTop = containerRect.top;
                const chartLeft = containerRect.left;
                const y = param.point.y;
                let left = param.point.x + toolTipMargin;
                if (left > container.clientWidth - toolTipWidth - 30) {
                    left = param.point.x - toolTipMargin - toolTipWidth;
                }
        
                let top = y + toolTipMargin;
                if (top > container.clientHeight - toolTipHeight - 30) {
                    top = y - toolTipHeight - toolTipMargin;
                }
                left = chartLeft + left;
                top = chartTop + top;
                toolTip.style.left = left + 'px';
                toolTip.style.top = top + 'px';
            }
            window.addEventListener('resize', handleResize);
            return () => {
				if (chartContainerRef.current) {
                    window.removeEventListener('resize', handleResize);
                    chart.remove();
                    chartContainerRef.current.remove();
                }
			};
        });
    }
    }, []);
    

	return (
        <div className="chartbox" ref = {chartboxRef}>
            <div ref = {tooltipRef}/>
            <div ref = {chartContainerRef}/>
        </div>
	);
};
export default Graph;