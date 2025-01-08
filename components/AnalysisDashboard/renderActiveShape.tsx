import { Sector } from "recharts";

const renderActiveShape = (props: any) => {
    const {
        cx, cy, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value
    } = props;

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
        </g>
    );
};

export default renderActiveShape;

// import { motion } from 'framer-motion';

// const renderActiveShape = (props: any) => {
//   const {
//     cx,
//     cy,
//     innerRadius,
//     outerRadius,
//     startAngle,
//     endAngle,
//     fill,
//     payload,
//     percent,
//     value,
//   } = props;

//   return (
//     <g>
//       {/* Center text showing the name */}
//       <text 
//         x={cx} 
//         y={cy - 10} 
//         dy={8} 
//         textAnchor="middle" 
//         fill="#374151" 
//         className="text-lg font-semibold"
//       >
//         {payload.name}
//       </text>
      
//       {/* Center text showing the value and percentage */}
//       <text 
//         x={cx} 
//         y={cy + 10} 
//         dy={8} 
//         textAnchor="middle" 
//         fill="#374151" 
//         className="text-sm"
//       >
//         {`${value} (${(percent * 100).toFixed(1)}%)`}
//       </text>

//       {/* Highlight arc */}
//       <motion.path
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.3 }}
//         d={`
//           M ${cx},${cy}
//           L ${cx + outerRadius * Math.cos(-startAngle * Math.PI / 180)},${cy + outerRadius * Math.sin(-startAngle * Math.PI / 180)}
//           A ${outerRadius},${outerRadius} 0 ${endAngle - startAngle <= 180 ? 0 : 1} 1 
//           ${cx + outerRadius * Math.cos(-endAngle * Math.PI / 180)},${cy + outerRadius * Math.sin(-endAngle * Math.PI / 180)}
//           Z
//         `}
//         fill="none"
//         stroke={fill}
//         strokeWidth={3}
//         strokeDasharray="5,5"
//         className="filter drop-shadow-md"
//       />
//     </g>
//   );
// };

// export default renderActiveShape;
