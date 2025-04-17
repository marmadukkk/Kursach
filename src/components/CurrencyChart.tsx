import React from 'react';
// Импорт необходимых компонентов из библиотеки Recharts для построения графиков
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// Импорт motion-компонента из библиотеки Framer Motion для анимаций
import { motion } from 'framer-motion';
// Импорт типа данных для исторических данных курса валют (определён в '../types')
import type { HistoricalData } from '../types';

interface CurrencyChartProps {
  data: HistoricalData[]; // Данные для графика (исторические данные обменного курса)
  currencyPair: string;   // Валютная пара, например 'USD/EUR'
}

export const CurrencyChart: React.FC<CurrencyChartProps> = ({ data, currencyPair }) => {
  return (
    // Motion.div применяется для анимации появления компонента
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Начальное состояние: полупрозрачный и смещён вниз
      animate={{ opacity: 1, y: 0 }}    // Анимация: плавное появление и перемещение в исходное положение
      className="theme-transition backdrop-blur-lg bg-white/10 rounded-xl p-6 shadow-lg h-[400px]"
    >
      {/* Заголовок, отображающий валютную пару и описание обменного курса */}
      <h2 className="text-xl font-semibold mb-4 text-white">
        {currencyPair} Exchange Rate
      </h2>
      {/* Контейнер для графика с фиксированной высотой */}
      <div className="h-[300px] w-full">
        {/* ResponsiveContainer обеспечивает адаптивное масштабирование графика */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {/* Определение градиента для заливки области графика */}
            <defs>
              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* Сетка графика с пунктирной линией */}
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            {/* Ось X с отображением дат */}
            <XAxis 
              dataKey="date" 
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 12 }}
              tickMargin={10}
            />
            {/* Ось Y с отображением значений курса */}
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 12 }}
              tickMargin={10}
            />
            {/* Подсказка при наведении на график, стилизованная в соответствии с темой */}
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            {/* Линия-область графика, отображающая обменный курс */}
            <Area
              type="monotone"
              dataKey="rate"       // Используем поле 'rate' из данных для построения графика
              stroke="#8B5CF6"     // Цвет линии
              strokeWidth={2}      // Толщина линии
              fillOpacity={1}      // Прозрачность заливки
              fill="url(#colorRate)" // Заливка с использованием определённого градиента
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
