import React from 'react';
// Импорт иконок для индикации роста или падения курса
import { TrendingUp, TrendingDown } from 'lucide-react';
// Импорт компонента motion для анимаций из Framer Motion
import { motion } from 'framer-motion';
// Импорт типов данных: CurrencyMode (режим отображения - криптовалюты или валюты)
// и CurrencyData (данные по каждой валюте) из '../types'
import type { CurrencyMode, CurrencyData } from '../types';

interface CurrencyTableProps {
  data: CurrencyData[]; // Массив данных по валютам или криптовалютам
  mode: CurrencyMode;   // Режим отображения: 'crypto' или другой режим
}

export const CurrencyTable: React.FC<CurrencyTableProps> = ({ data, mode }) => {
  return (
    // Обертываем таблицу в motion.div для анимации появления
    <motion.div
      initial={{ opacity: 0, y: 20 }}  // Начальное состояние: смещение по оси Y и нулевая прозрачность
      animate={{ opacity: 1, y: 0 }}     // Анимация: элемент плавно становится видимым и перемещается на своё место
      className="backdrop-blur-lg bg-white/10 rounded-xl p-6 shadow-lg" // Стили компонента
    >
      {/* Заголовок таблицы, который зависит от режима отображения (crypto или currencies) */}
      <h2 className="text-xl font-semibold mb-4 text-white">
        Popular {mode === 'crypto' ? 'Cryptocurrencies' : 'Currencies'}
      </h2>
      {/* Контейнер с горизонтальной прокруткой для таблицы */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-white/80">
              {/* Заголовок столбцов таблицы */}
              <th className="text-left py-2 px-4">Name</th>
              <th className="text-right py-2 px-4">Rate (USD)</th>
              <th className="text-right py-2 px-4">24h Change</th>
            </tr>
          </thead>
          <tbody>
            {/* Перебор массива data для формирования строк таблицы */}
            {data.map(currency => (
              <tr key={currency.code} className="text-white border-t border-white/10">
                {/* Первая колонка: код и название валюты/криптовалюты */}
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <span className="font-medium">{currency.code}</span>
                    {/* Отображение полного имени валюты с отступом */}
                    <span className="ml-2 text-white/60 text-sm">{currency.name}</span>
                  </div>
                </td>
                {/* Вторая колонка: курс валюты в долларах США, округленный до 2 знаков */}
                <td className="text-right py-3 px-4">
                  {currency.rate.toFixed(2)}
                </td>
                {/* Третья колонка: изменение курса за 24 часа */}
                <td className="text-right py-3 px-4 flex items-center justify-end">
                  {/* Цвет текста зависит от изменения курса: зелёный для роста и красный для падения */}
                  <span className={currency.change >= 0 ? "text-green-400" : "text-red-400"}>
                    {/* Иконка в зависимости от знака изменения */}
                    {currency.change >= 0 ? (
                      <TrendingUp className="w-4 h-4 inline" />
                    ) : (
                      <TrendingDown className="w-4 h-4 inline" />
                    )}
                    {/* Абсолютное значение изменения с точностью до двух знаков после запятой */}
                    {Math.abs(currency.change).toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
