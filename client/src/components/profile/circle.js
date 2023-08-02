import React from 'react';
import "./circle.css"

const CircleProgressBar = (data) => {
    const circleRadius = 30; // Radius of the circle
    const circleCircumference = 2 * Math.PI * circleRadius; // Circumference of the circle
    const percentage = data.data;
    // Calculate the progress based on the percentage
    const progress = (percentage / 100) * circleCircumference;
    const remaining = circleCircumference - progress;

    return (
    <div className="circle-progress-bar">
    <svg className="circle" width="120" height="120">
        <circle
        className="circle-background"
        cx="60"
        cy="60"
        r={circleRadius}
        />
        <circle
        className="circle-progress"
        cx="60"
        cy="60"
        r={circleRadius}
        strokeDasharray={`${progress} ${remaining}`}
        />
    </svg>
    </div>
    );
};

export default CircleProgressBar;
