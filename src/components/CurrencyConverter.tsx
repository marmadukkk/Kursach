import React, { useState } from 'react';
// Импорт компонента стрелки для кнопки переключения валют из библиотеки Lucide React
import { ArrowLeftRight } from 'lucide-react';
// Импорт компонента motion из библиотеки Framer Motion для анимаций
import { motion } from 'framer-motion';
// Импорт типа CurrencyPair, описывающего валютную пару (например, { from: 'USD', to: 'EUR' })
import type { CurrencyPair } from '../types';

interface CurrencyConverterProps {
  // Объект с курсами валют, где ключ — код валюты, значение — её курс
  rates: Record<string, number>;
  // Функция-обработчик изменения валютной пары
  onPairChange: (pair: CurrencyPair) => void;
}

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ rates, onPairChange }) => {
  // Состояние для суммы, которая будет конвертироваться (по умолчанию строка '1')
  const [amount, setAmount] = useState<string>('1');
  // Состояние для валюты, из которой производится конвертация (по умолчанию USD)
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  // Состояние для валюты, в которую производится конвертация (по умолчанию EUR)
  const [toCurrency, setToCurrency] = useState<string>('EUR');

  // Функция для обмена валют местами
  const handleSwap = () => {
    // Обмен значениями состояний fromCurrency и toCurrency
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    // Вызов обработчика изменения пары с новыми значениями
    onPairChange({ from: toCurrency, to: fromCurrency });
  };

  // Вычисляем конвертированную сумму: исходное значение * (курс валюты назначения / курс валюты источника)
  const convertedAmount = (parseFloat(amount) || 0) * (rates[toCurrency] / rates[fromCurrency]);

  return (
    // Обертка компонента с анимацией появления (плавное появление снизу и увеличение прозрачности)
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-lg bg-white/10 rounded-xl p-6 shadow-lg"
    >
      {/* Блок, содержащий все элементы конвертера */}
      <div className="flex flex-col space-y-4">
        {/* Первая строка: ввод суммы и выбор исходной валюты */}
        <div className="flex items-center space-x-4">
          {/* Поле ввода суммы, которая будет конвертироваться */}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 rounded bg-white/20 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Amount"
          />
          {/* Выпадающий список для выбора исходной валюты */}
          <select
            value={fromCurrency}
            onChange={(e) => {
              setFromCurrency(e.target.value);
              // При выборе валюты вызов функции onPairChange для обновления валютной пары
              onPairChange({ from: e.target.value, to: toCurrency });
            }}
            className="p-2 rounded bg-white/20 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {/* Перебор всех доступных валют из объекта rates */}
            {Object.keys(rates).map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>

        {/* Кнопка для обмена валют: местами поменять исходную и целевую валюту */}
        <button
          onClick={handleSwap}
          className="mx-auto p-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <ArrowLeftRight className="w-6 h-6" />
        </button>

        {/* Вторая строка: отображение конвертированной суммы и выбор целевой валюты */}
        <div className="flex items-center space-x-4">
          {/* Поле вывода конвертированной суммы (только для чтения) */}
          <input
            type="text"
            value={convertedAmount.toFixed(2)}
            readOnly
            className="w-full p-2 rounded bg-white/20 border border-gray-200"
          />
          {/* Выпадающий список для выбора целевой валюты */}
          <select
            value={toCurrency}
            onChange={(e) => {
              setToCurrency(e.target.value);
              // Обновление валютной пары при выборе целевой валюты
              onPairChange({ from: fromCurrency, to: e.target.value });
            }}
            className="p-2 rounded bg-white/20 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {/* Перебор всех доступных валют из объекта rates */}
            {Object.keys(rates).map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
};
