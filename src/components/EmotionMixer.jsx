import React, { useState } from 'react';
import { Activity, Shuffle, Power } from 'lucide-react';
import EmotionKnob from './EmotionKnob';

const EmotionMixer = () => {
  const [power, setPower] = useState(false);
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [emotionValues, setEmotionValues] = useState({});
  const [activeButton, setActiveButton] = useState(null);
  
  const emotions = [
    { name: 'Joy', plName: 'Radość', code: 'JO', color: '#FFD700' },
    { name: 'Trust', plName: 'Zaufanie', code: 'TR', color: '#4CAF50' },
    { name: 'Fear', plName: 'Strach', code: 'FR', color: '#9C27B0' },
    { name: 'Surprise', plName: 'Zaskoczenie', code: 'SU', color: '#FF9800' },
    { name: 'Sadness', plName: 'Smutek', code: 'SA', color: '#2196F3' },
    { name: 'Disgust', plName: 'Odraza', code: 'DI', color: '#795548' },
    { name: 'Anger', plName: 'Gniew', code: 'AG', color: '#F44336' },
    { name: 'Anticipation', plName: 'Oczekiwanie', code: 'AN', color: '#3F51B5' }
  ];

  const handleEmotionSelect = (emotion) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
      const newValues = { ...emotionValues };
      delete newValues[emotion];
      setEmotionValues(newValues);
    } else if (selectedEmotions.length < 3) {
      setSelectedEmotions([...selectedEmotions, emotion]);
      setEmotionValues(prev => ({ ...prev, [emotion]: 5 }));
    }
  };

  const handleValueChange = (emotion, value) => {
    setEmotionValues(prev => ({ ...prev, [emotion]: value }));
  };

  const getIntensityLevel = (value) => {
    if (value <= 3) return 'L';
    if (value <= 7) return 'M';
    return 'H';
  };

  const generateCSECode = () => {
    if (selectedEmotions.length === 0) return 'NO INPUT';
    
    const emotionCodes = selectedEmotions
      .map(emotion => emotions.find(e => e.name === emotion).code)
      .sort()
      .join('.');
      
    const intensities = selectedEmotions
      .sort((a, b) => {
        const codeA = emotions.find(e => e.name === a).code;
        const codeB = emotions.find(e => e.name === b).code;
        return codeA.localeCompare(codeB);
      })
      .map(emotion => getIntensityLevel(emotionValues[emotion]))
      .join('.');
      
    return `CSE-[${emotionCodes}]-[${intensities}]-001`;
  };

  const handleRandomClick = (count) => {
    setActiveButton(count);
    generateRandomEmotions(count);
  };

  const generateRandomEmotions = (count) => {
    setSelectedEmotions([]);
    setEmotionValues({});
    
    const shuffled = [...emotions]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
    
    const newEmotions = shuffled.map(emotion => emotion.name);
    const newValues = Object.fromEntries(
      shuffled.map(emotion => [
        emotion.name,
        Math.floor(Math.random() * 11)
      ])
    );
    
    setSelectedEmotions(newEmotions);
    setEmotionValues(newValues);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl shadow-2xl border border-gray-700">
      <div className="flex flex-col gap-4">
        <div className="bg-black/80 rounded-lg p-3 sm:p-4 border border-gray-800 shadow-inner">
          <div className="flex items-center">
            <button
              onClick={() => setPower(!power)}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
                power 
                  ? 'bg-red-500 shadow-lg shadow-red-500/50 hover:bg-red-600' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Power className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="flex-1 flex justify-center">
              <h2 className="font-mono text-xl sm:text-2xl tracking-wider whitespace-nowrap bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                EMOTION MIXER 3000
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-black/80 rounded-lg p-3 sm:p-4 border border-gray-800 shadow-inner">
          <div className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-900 rounded font-mono border border-gray-800">
            <Activity className={`w-4 h-4 ${power ? 'text-green-500' : 'text-gray-600'}`} />
            <span className={`${power ? 'text-green-500' : 'text-gray-600'} min-w-[140px] text-right text-sm sm:text-base`}>
              {power ? generateCSECode() : 'OFFLINE'}
            </span>
          </div>
        </div>

        {power && (
          <>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4">
              {[1, 2, 3].map(count => (
                <button
                  key={count}
                  onClick={() => handleRandomClick(count)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-b from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-lg transition-all shadow-lg border border-gray-600 ${
                    activeButton === count ? 'shadow-xl shadow-blue-500/20 text-white' : 'text-gray-300'
                  }`}
                  style={{
                    boxShadow: activeButton === count 
                      ? '0 0 20px rgba(59, 130, 246, 0.4)' 
                      : undefined
                  }}
                >
                  <Shuffle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="font-mono text-sm sm:text-base">
                    {count} {count === 1 ? 'emocja' : 'emocje'}
                  </span>
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 p-3 sm:p-4 bg-black/80 rounded-lg border border-gray-800 shadow-inner">
              {emotions.map(({ name, plName, color, code }) => (
                <button
                  key={name}
                  onClick={() => handleEmotionSelect(name)}
                  className={`p-2 sm:p-3 rounded-lg transition-all bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 ${
                    selectedEmotions.includes(name) 
                      ? 'shadow-xl shadow-blue-500/20 text-white' 
                      : 'text-gray-300'
                  }`}
                  style={{ 
                    borderLeft: `4px solid ${selectedEmotions.includes(name) ? color : 'transparent'}`,
                    opacity: selectedEmotions.includes(name) || selectedEmotions.length < 3 ? 1 : 0.5,
                    boxShadow: selectedEmotions.includes(name) 
                      ? '0 0 20px rgba(59, 130, 246, 0.4)' 
                      : undefined
                  }}
                >
                  <div className="font-mono tracking-wide text-sm sm:text-base">{plName}</div>
                  <div className="text-xs text-gray-500 font-mono">({code})</div>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 p-4 sm:p-6 bg-black/80 rounded-lg border border-gray-700 shadow-inner">
              {selectedEmotions.map(emotion => (
                <EmotionKnob
                  key={emotion}
                  emotion={emotions.find(e => e.name === emotion)}
                  value={emotionValues[emotion]}
                  onChange={(value) => handleValueChange(emotion, value)}
                  color={emotions.find(e => e.name === emotion).color}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmotionMixer;