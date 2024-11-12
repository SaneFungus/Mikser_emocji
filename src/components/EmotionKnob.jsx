import React from 'react';

const EmotionKnob = ({ emotion, value, onChange, color }) => {
  const handleKnobClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Oblicz kąt względem środka (w radianach)
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    
    // Przekonwertuj kąt na wartość od 0 do 10
    // -π do π -> 0 do 10
    let normalizedValue = ((angle + Math.PI) / (2 * Math.PI)) * 10;
    
    // Obróć skalę o 90 stopni (π/2 radianów), aby 0 było na górze
    normalizedValue = (normalizedValue + 2.5) % 10;
    
    // Zaokrąglij do najbliższej liczby całkowitej
    const newValue = Math.round(normalizedValue);
    
    onChange(newValue);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX);
    let normalizedValue = ((angle + Math.PI) / (2 * Math.PI)) * 10;
    normalizedValue = (normalizedValue + 2.5) % 10;
    const newValue = Math.round(normalizedValue);
    
    onChange(newValue);
  };

  return (
    <div className="flex flex-col items-center gap-2 p-2">
      <div 
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-gray-800 to-gray-900 relative cursor-pointer group"
        style={{
          boxShadow: `0 0 15px ${color}33, 0 0 30px ${color}22`,
          transform: `rotate(${value * 36}deg)`, // 360 / 10 = 36 stopni na jednostkę
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
        onClick={handleKnobClick}
        onTouchMove={handleTouchMove}
        onTouchStart={(e) => e.preventDefault()}
      >
        <div 
          className="absolute w-1.5 h-8 sm:h-10 top-0 left-1/2 transform -translate-x-1/2 origin-bottom rounded"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}, 0 0 20px ${color}66`
          }}
        />
        <div 
          className="absolute inset-2 rounded-full bg-gradient-to-b from-gray-700 to-gray-800"
          style={{ 
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(255,255,255,0.1)'
          }} 
        />
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ 
            boxShadow: `0 0 20px ${color}44, 0 0 40px ${color}22`
          }}
        />
      </div>
      <div className="w-full text-center">
        <span className="text-xs sm:text-sm font-bold tracking-wider" style={{ 
          color,
          textShadow: `0 0 10px ${color}66`
        }}>
          {emotion.plName}
        </span>
        <div className="flex items-center justify-center gap-2 mt-1">
          <div className="w-20 sm:w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all"
              style={{ 
                width: `${value * 10}%`, 
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionKnob;