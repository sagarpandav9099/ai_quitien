$(document).ready(function () {
  const svgNS = "http://www.w3.org/2000/svg";

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0; // 0 degrees is North, positive clockwise
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  // Corrected describeArc function
  function describeArc(x, y, radius, startAngle, endAngle) {
    var arcStartPoint = polarToCartesian(x, y, radius, startAngle);
    var arcEndPoint = polarToCartesian(x, y, radius, endAngle);

    // Calculate the angular sweep of the arc.
    // Since valueToAngle ensures startAngle < endAngle for a segment,
    // arcSweepDegrees will be positive and represent the clockwise sweep.
    var arcSweepDegrees = endAngle - startAngle;

    // The large-arc-flag. 0 if arc is <= 180 degrees, 1 if arc is > 180 degrees.
    var largeArcFlag = arcSweepDegrees <= 180 ? "0" : "1";

    const sweepFlag = "1"; // "1" for clockwise, "0" for counter-clockwise. We want clockwise.

    var d = [
      "M",
      arcStartPoint.x,
      arcStartPoint.y,
      "A",
      radius,
      radius,
      0, // x-axis-rotation (usually 0)
      largeArcFlag,
      sweepFlag,
      arcEndPoint.x,
      arcEndPoint.y,
    ].join(" ");
    return d;
  }

  const gaugeConfig = {
    cx: 150,
    cy: 110, // Center Y, slightly lower to fit arc visually
    radius: 80,
    strokeWidth: 20,
    gaugeStartAngle: -110, // Overall gauge starts here (0 = North, positive clockwise)
    gaugeEndAngle: 80, // Overall gauge ends here (visually for full range)
    get totalAngleSpan() {
      return this.gaugeEndAngle - this.gaugeStartAngle;
    },
  };

  function valueToAngle(value) {
    // Ensure value is within 0-100, though segments define actual drawn parts
    const clampedValue = Math.max(0, Math.min(100, value));
    return (
      gaugeConfig.gaugeStartAngle +
      (clampedValue / 100) * gaugeConfig.totalAngleSpan
    );
  }

  const segments = [
    { valueStart: 0, valueEnd: 35, color: "#F59E0B" }, // Dark Orange
    { valueStart: 35, valueEnd: 64, color: "#FCD34D" }, // Light Orange
    { valueStart: 64, valueEnd: 85, color: "#A1DD70" }, // Green (visual end of green arc)
  ];

  const $svg = $(".gauge-svg");
  const $indicatorG = $("#indicator"); // Get indicator group once

  segments.forEach((segment) => {
    const startAngle = valueToAngle(segment.valueStart);
    const endAngle = valueToAngle(segment.valueEnd);

    // Do not draw if start and end angles are the same (zero-length segment)
    if (Math.abs(startAngle - endAngle) < 0.01) return;

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute(
      "d",
      describeArc(
        gaugeConfig.cx,
        gaugeConfig.cy,
        gaugeConfig.radius,
        startAngle,
        endAngle
      )
    );
    path.setAttribute("stroke", segment.color);
    path.setAttribute("stroke-width", gaugeConfig.strokeWidth.toString());
    // path.setAttribute("fill", "none"); // Already handled by CSS
    // path.setAttribute("stroke-linecap", "round"); // Already handled by CSS

    // Prepend path to SVG so indicator remains on top
    // The indicator is already in the HTML, paths are added before it.
    $indicatorG.before(path);
  });

  // Position Indicator
  const indicatorValue = 64;
  const indicatorAngle = valueToAngle(indicatorValue);
  // Calculate position for the center of the indicator on the arc
  const indicatorPosition = polarToCartesian(
    gaugeConfig.cx,
    gaugeConfig.cy,
    gaugeConfig.radius,
    indicatorAngle
  );

  // Apply transform to the indicator group
  // Rotate it so its local "up" (-Y) points radially outward
  // The angle for rotation should match the angle on the circle.
  // 0 deg points North. SVG rotate positive is clockwise.
  $indicatorG.attr(
    "transform",
    `translate(${indicatorPosition.x}, ${indicatorPosition.y}) rotate(${indicatorAngle})`
  );
});
