import React, { useState } from 'react';

const BinomialAreaModelFinal = () => {
  const [step, setStep] = useState(0);
  const [level, setLevel] = useState(1);
  const [a, setA] = useState(2);
  const [b, setB] = useState(1);
  const base = level === 1 ? 20 : 15;
  
  const cellSize = level === 1 ? 12 : 20;
  const gridSize = base * cellSize;
  
  const steps = level === 1 ? [
    { title: "Start with the full square", description: `${base} × ${base} = ${base * base}` },
    { title: "Remove the first strip", description: `Subtract ${base} × ${b} = ${base * b}` },
    { title: "Remove the second strip", description: `Subtract ${base} × ${a} = ${base * a}` },
    { title: "Add back the overlap!", description: `Add back ${a} × ${b} = ${a * b} (removed twice!)` }
  ] : [
    { title: "Start with the full square", description: `x × x = x²` },
    { title: "Remove the first strip", description: `Subtract x × ${b} = ${b}x` },
    { title: "Remove the second strip", description: `Subtract x × ${a} = ${a}x` },
    { title: "Add back the overlap!", description: `Add back ${a} × ${b} = ${a * b} (removed twice!)` }
  ];
  
  const getCalculation = () => {
    if (level === 1) {
      const term1 = base * base;
      const term2 = base * b;
      const term3 = base * a;
      const term4 = a * b;
      const result = (base - a) * (base - b);
      
      return {
        expression: `(${base} - ${a})(${base} - ${b})`,
        expanded: `${term1} - ${term2} - ${term3} + ${term4}`,
        result: result
      };
    } else {
      return {
        expression: `(x - ${a})(x - ${b})`,
        expanded: `x² - ${b}x - ${a}x + ${a * b}`,
        result: `x² - ${a + b}x + ${a * b}`
      };
    }
  };
  
  const getCellColor = (row, col) => {
    const baseColor = '#f8fafc';
    const redColor = '#fca5a5';
    const blueTransparent = 'rgba(59, 130, 246, 0.15)';
    const greenColor = '#86efac';
    
    let fillColor = baseColor;
    
    if (step >= 1 && col >= base - b) {
      fillColor = redColor;
    }
    
    if (step >= 2 && row >= base - a) {
      fillColor = blueTransparent;
    }
    
    if (step >= 3 && row >= base - a && col >= base - b) {
      fillColor = greenColor;
    }
    
    return fillColor;
  };
  
  const renderGrid = () => {
    const cells = [];
    const patterns = [];
    
    for (let row = 0; row < base; row++) {
      for (let col = 0; col < base; col++) {
        const fillColor = getCellColor(row, col);
        
        cells.push(
          <rect
            key={`${row}-${col}`}
            x={col * cellSize}
            y={row * cellSize}
            width={cellSize}
            height={cellSize}
            fill={fillColor}
            stroke={level === 1 ? "#374151" : "none"}
            strokeWidth={level === 1 ? "0.3" : "0"}
          />
        );
        
        if (step === 2 && row >= base - a && col >= base - b) {
          const x = col * cellSize;
          const y = row * cellSize;
          
          patterns.push(
            <g key={`pattern-${row}-${col}`}>
              <line
                x1={x}
                y1={y}
                x2={x + cellSize}
                y2={y + cellSize}
                stroke="#dc2626"
                strokeWidth="1"
              />
              <line
                x1={x}
                y1={y + cellSize/2}
                x2={x + cellSize/2}
                y2={y + cellSize}
                stroke="#dc2626"
                strokeWidth="1"
              />
              <line
                x1={x + cellSize/2}
                y1={y}
                x2={x + cellSize}
                y2={y + cellSize/2}
                stroke="#dc2626"
                strokeWidth="1"
              />
            </g>
          );
        }
      }
    }
    
    return [...cells, ...patterns];
  };
  
  const calc = getCalculation();
  
  return (
    <div style={{ padding: '24px', maxWidth: '896px', margin: '0 auto', backgroundColor: 'white' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>
          Understanding (x - a)(x - b) with Area Models
        </h2>
        
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontWeight: 'bold' }}>Level:</label>
            <button
              onClick={() => setLevel(1)}
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: level === 1 ? '#22c55e' : '#e5e7eb',
                color: level === 1 ? 'white' : '#374151',
                border: 'none'
              }}
            >
              1: Numbers
            </button>
            <button
              onClick={() => setLevel(2)}
              style={{
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: level === 2 ? '#22c55e' : '#e5e7eb',
                color: level === 2 ? 'white' : '#374151',
                border: 'none'
              }}
            >
              2: Algebra
            </button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label htmlFor="a-input" style={{ fontWeight: 'bold' }}>a =</label>
            <input
              id="a-input"
              type="number"
              value={a}
              onChange={(e) => setA(Math.max(1, Math.min(8, parseInt(e.target.value) || 1)))}
              style={{ width: '64px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
              min="1"
              max="8"
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label htmlFor="b-input" style={{ fontWeight: 'bold' }}>b =</label>
            <input
              id="b-input"
              type="number"
              value={b}
              onChange={(e) => setB(Math.max(1, Math.min(8, parseInt(e.target.value) || 1)))}
              style={{ width: '64px', padding: '8px', border: '1px solid #d1d5db', borderRadius: '4px' }}
              min="1"
              max="8"
            />
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
            {calc.expression} = {calc.expanded} = {calc.result}
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Step {step + 1}: {steps[step].title}</h3>
            <p style={{ color: '#374151' }}>{steps[step].description}</p>
          </div>
          
          {level === 2 && (
            <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#dbeafe', borderRadius: '8px' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#dc2626', marginBottom: '8px' }}>
                Red strip width: -{b}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb' }}>
                Blue strip height: -{a}
              </div>
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setStep(index)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  backgroundColor: step === index ? '#3b82f6' : '#e5e7eb',
                  color: step === index ? 'white' : '#374151',
                  border: 'none'
                }}
              >
                Step {index + 1}
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', border: '1px solid #999', backgroundColor: '#f8fafc' }}></div>
              <span>Original square: {level === 1 ? `${base} × ${base} = ${base * base}` : 'x × x = x²'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', border: '1px solid #999', backgroundColor: '#fca5a5' }}></div>
              <span>Remove strip 1: {level === 1 ? `${base} × ${b} = ${base * b}` : `x × ${b} = ${b}x`}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', border: '1px solid #999', backgroundColor: 'rgba(59, 130, 246, 0.15)' }}></div>
              <span>Remove strip 2: {level === 1 ? `${base} × ${a} = ${base * a}` : `x × ${a} = ${a}x`}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', border: '1px solid #999', backgroundColor: '#86efac' }}></div>
              <span>Add back overlap: {a} × {b} = {a * b}</span>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative' }}>
            <svg 
              width={gridSize + 100} 
              height={gridSize + 100}
              style={{ border: '1px solid #d1d5db' }}
            >
              <g transform="translate(50, 50)">
                {renderGrid()}
                
                {level === 2 && (
                  <rect
                    x="0"
                    y="0"
                    width={gridSize}
                    height={gridSize}
                    fill="none"
                    stroke="#000000"
                    strokeWidth="3"
                  />
                )}
                
                <text x={gridSize/2} y={-10} textAnchor="middle" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  {level === 1 ? base : 'x'}
                </text>
                <text x={-10} y={gridSize/2} textAnchor="middle" style={{ fontSize: '18px', fontWeight: 'bold' }} 
                      transform={`rotate(-90, -10, ${gridSize/2})`}>
                  {level === 1 ? base : 'x'}
                </text>
                
                <line x1={(base-b)*cellSize} y1={gridSize+8} x2={gridSize} y2={gridSize+8} 
                      stroke="#666" strokeWidth="1"/>
                <text x={(base-b)*cellSize + b*cellSize/2} y={gridSize+20} textAnchor="middle" 
                      style={{ fontSize: '14px' }}>{level === 1 ? b : b}</text>
                
                <line x1={gridSize+8} y1={(base-a)*cellSize} x2={gridSize+8} y2={gridSize} 
                      stroke="#666" strokeWidth="1"/>
                <text x={gridSize+20} y={(base-a)*cellSize + a*cellSize/2} textAnchor="middle" 
                      style={{ fontSize: '14px' }} transform={`rotate(90, ${gridSize+20}, ${(base-a)*cellSize + a*cellSize/2})`}>
                  {level === 1 ? a : a}
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
        <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Why is the last term positive?</h4>
        <p style={{ fontSize: '14px', color: '#374151' }}>
          When we remove both strips from the original square, we accidentally remove the corner piece 
          <strong> twice</strong>. To get the correct area, we must add it back once. This is why 
          (-a) × (-b) = +ab in the expansion of (x - a)(x - b).
        </p>
      </div>
    </div
  );
};

export default BinomialAreaModelFinal;