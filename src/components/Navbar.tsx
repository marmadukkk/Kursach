import React from 'react';
// Импорт иконок из библиотеки Lucide React: Coins – логотип/иконка приложения, Moon и Sun – для смены темы
import { Coins, Moon, Sun } from 'lucide-react';
// Импорт компонента motion из Framer Motion для анимаций
import { motion } from 'framer-motion';

interface NavbarProps {
  // Функция, вызываемая при переключении темы
  onThemeToggle: () => void;
  // Флаг, показывающий, активна ли тёмная тема
  isDark: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onThemeToggle, isDark }) => {
  return (
    // Контейнер навбара, выполненный с использованием motion.nav для анимации появления
    <motion.nav
      initial={{ opacity: 0, y: -20 }}  // Начальное состояние: смещение вверх и нулевая прозрачность
      animate={{ opacity: 1, y: 0 }}     // Анимация: плавное появление и возвращение в исходное положение
      className="backdrop-blur-lg bg-white/10 fixed top-0 left-0 right-0 z-50" // Стилизация: фиксированное положение вверху, размытие фона, полупрозрачный белый фон
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Основной блок навбара: логотип слева и кнопка для переключения темы справа */}
        <div className="flex items-center justify-between">
          {/* Левый блок: логотип */}
          <div className="flex items-center space-x-3">
            {/* Анимированный блок для логотипа, создающий эффект покачивания */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }} // Анимация: вращение от 0 до 10 градусов, затем до -10 градусов и обратно в 0
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} // Параметры анимации: длительность 2 секунды, бесконечное повторение, плавное изменение
            >
              <Coins className="w-8 h-8 text-white" />
            </motion.div>
            {/* Название приложения */}
            <span className="text-2xl font-bold text-white">BitUp</span>
          </div>
          
          {/* Правая кнопка для переключения темы */}
          <button
            onClick={onThemeToggle} // При клике вызывается функция переключения темы
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            {/* Если активна тёмная тема, показываем иконку солнца для переключения в светлую тему, иначе – луну */}
            {isDark ? (
              <Sun className="w-6 h-6 text-white" />
            ) : (
              <Moon className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};
