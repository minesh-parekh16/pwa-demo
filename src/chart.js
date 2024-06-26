import React, { useEffect, useRef } from 'react';

function DoubleLineChart() {
    const canvasRef = useRef(null);
    const data1 = [0, 50, 54.5, 53.2, 57.5, 0];
    const data2 = [0, 70, 57.5, 70, 6.5, 0];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const chartWidth = canvas.width - 100;
        const chartHeight = canvas.height - 100;
        const startX = 50;
        const startY = canvas.height - 50;

        function drawChart() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const maxValue = Math.max(...data1, ...data2);
            const minValue = Math.min(...data1, ...data2);
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX, startY - data1[0]);
            for (let i = 1; i < data1.length; i++) {
                ctx.lineTo(startX + i * (chartWidth / (data1.length - 1)), startY - data1[i]);
            }
            ctx.lineTo(startX + (data1.length - 1) * (chartWidth / (data1.length - 1)), startY);
            ctx.closePath();
            ctx.fillStyle = 'rgba(0, 0, 255, 0.5)'; // Blue fill color with 50% opacity
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX, startY - data2[0]);
            for (let i = 1; i < data2.length; i++) {
                ctx.lineTo(startX + i * (chartWidth / (data2.length - 1)), startY - data2[i]);
            }
            ctx.lineTo(startX + (data2.length - 1) * (chartWidth / (data2.length - 1)), startY);
            ctx.closePath();
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Red fill color with 50% opacity
            ctx.fill();
        
            drawYAxisLabels(maxValue, minValue);
            drawHorizontalLines(minValue, maxValue);
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            drawLabels(labels);
            drawLine(data1, 'blue', 'rgba(0, 0, 255, 0.5)'); // Blue fill color with 50% opacity
            drawLine(data2, 'red', 'rgba(255, 0, 0, 0.5)'); // Red fill color with 50% opacity
        }
        

        function drawLine(data, color, fillColor) {
            ctx.strokeStyle = color;
            ctx.fillStyle = fillColor; // Set the fill color
            ctx.beginPath();
            ctx.moveTo(startX, startY - data[0]);
            for (let i = 1; i < data.length; i++) {
                ctx.lineTo(startX + i * (chartWidth / (data.length - 1)), startY - data[i]);
                // Fill the plot point
                ctx.arc(startX + i * (chartWidth / (data.length - 1)), startY - data[i], 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.moveTo(startX + i * (chartWidth / (data.length - 1)), startY - data[i]);
                // Draw text if needed
                ctx.fillText(data[i], startX + i * (chartWidth / (data.length - 1)), startY - data[i] - 5);
            }
            ctx.stroke();
        }

        function drawLabels(labels) {
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            for (let i = 0; i < labels.length; i++) {
                ctx.fillText(labels[i], startX + i * (chartWidth / (labels.length - 1)), startY + 20);
            }
        }

        function drawYAxisLabels(maxValue, minValue) {
            const range = maxValue - minValue;
            const numLabels = 5;
            const labelIncrement = range / (numLabels - 1);
            ctx.font = '12px Arial';
            ctx.textAlign = 'right';
            for (let i = 0; i < numLabels; i++) {
                const value = minValue + i * labelIncrement;
                const y = startY - (value - minValue) / range * chartHeight;
                ctx.fillText(value.toFixed(2), startX - 10, y);
            }
        }

        function drawHorizontalLines(minValue, maxValue) {
            const range = maxValue - minValue;
            const numLines = 5;
            const labelIncrement = range / (numLines - 1);
            for (let i = 0; i < numLines; i++) {
                const value = minValue + i * labelIncrement;
                const y = startY - (value - minValue) / range * chartHeight;
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'; // Adjust line color and style as needed
                ctx.beginPath();
                ctx.moveTo(startX, y);
                ctx.lineTo(startX + chartWidth, y);
                ctx.stroke();
            }
        }

        drawChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="chart-container">
            <canvas ref={canvasRef} id="chartCanvas" width="600" height="400"></canvas>
            <div className="axis-label x-axis-label">Time</div>
            <div className="axis-label y-axis-label">Value</div>
        </div>
    );
}

export default DoubleLineChart;
