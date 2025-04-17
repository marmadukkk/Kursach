import React from 'react';
// Импорт иконок для представления режимов валют: Fiat и Crypto
import { Coins, Banknote } from 'lucide-react';
// Импорт компонента motion из Framer Motion для анимации
import { motion } from 'framer-motion';
// Импорт типа CurrencyMode, который описывает режим (например, 'fiat' или 'crypto')
import type { CurrencyMode } from '../types';

interface CurrencyToggleProps {
  mode: CurrencyMode; // Текущий режим отображения валют
  onModeChange: (mode: CurrencyMode) => void; // Функция-обработчик для смены режима
}

export const CurrencyToggle: React.FC<CurrencyToggleProps> = ({ mode, onModeChange }) => {
  return (
    // Обертка для центровки компонента
    <div className="flex justify-center mb-8">
      {/* Анимированный контейнер для переключателей режимов */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}  // Начальное состояние: немного смещён вверх и прозрачный
        animate={{ opacity: 1, y: 0 }}      // Анимация: плавное появление без смещения
        className="backdrop-blur-lg bg-white/10 rounded-full p-1 flex"
      >
        {/* Первая кнопка для режима 'fiat' */}
        <button
          onClick={() => onModeChange('fiat')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
            mode === 'fiat' ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
        >
          {/* Иконка банкноты для режима 'fiat' */}
          <Banknote className="w-5 h-5 text-white" />
          <span className="text-white">Fiat</span>
        </button>
        {/* Вторая кнопка для режима 'crypto' */}
        <button
          onClick={() => onModeChange('crypto')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
            mode === 'crypto' ? 'bg-white/20' : 'hover:bg-white/10'
          }`}
        >
          {/* Иконка монет для режима 'crypto' */}
          <Coins className="w-5 h-5 text-white" />
          <span className="text-white">Crypto</span>
        </button>
      </motion.div>
    </div>
  );
};
