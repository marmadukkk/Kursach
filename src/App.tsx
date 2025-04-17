import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CurrencyChart } from './components/CurrencyChart';
import { CurrencyConverter } from './components/CurrencyConverter';
import { CurrencyTable } from './components/CurrencyTable';
import { CurrencyToggle } from './components/CurrencyToggle';
import { Navbar } from './components/Navbar';
import { Coins } from 'lucide-react';
import type { CurrencyPair, HistoricalData, CurrencyMode, CurrencyData } from './types';

function App() {
  // Состояние для курсов валют или криптовалют: ключ – код валюты, значение – курс
  const [rates, setRates] = useState<Record<string, number>>({});
  // Состояние для массива исторических данных, используемых для построения графика обменного курса
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  // Состояние для выбранной валютной пары (например, { from: 'USD', to: 'EUR' })
  const [selectedPair, setSelectedPair] = useState<CurrencyPair>({ from: 'USD', to: 'EUR' });
  // Флаг загрузки данных, чтобы отображать спиннер до окончания получения информации
  const [loading, setLoading] = useState(true);
  // Флаг темы: true – тёмная, false – светлая
  const [isDark, setIsDark] = useState(true);
  // Режим отображения: 'fiat' или 'crypto'
  const [mode, setMode] = useState<CurrencyMode>('fiat');
  // Массив данных для отображения в таблице (CurrencyData включает код, наименование, курс и изменение за 24 часа)
  const [currencyData, setCurrencyData] = useState<CurrencyData[]>([]);

  // Списки для криптовалют и фиатных валют с базовыми данными
  const cryptoList = [
    { code: 'BTC', name: 'Bitcoin' },
    { code: 'ETH', name: 'Ethereum' },
    { code: 'BNB', name: 'Binance Coin' },
    { code: 'ADA', name: 'Cardano' },
    { code: 'SOL', name: 'Solana' },
    { code: 'DOT', name: 'Polkadot' },
    { code: 'DOGE', name: 'Dogecoin' },
    { code: 'MATIC', name: 'Polygon' },
  ];

  const fiatList = [
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'NZD', name: 'New Zealand Dollar' },
  ];

  // useEffect для первоначальной загрузки курсов валют/криптовалют и периодического обновления данных
  useEffect(() => {
    const fetchRates = async () => {
      try {
        if (mode === 'fiat') {
          // Получение актуальных фиатных курсов с API
          const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
          setRates(response.data.rates);
          // Формирование массива данных для таблицы с выбранными фиатными валютами
          const fiatData: CurrencyData[] = fiatList.map(currency => ({
            ...currency,
            rate: response.data.rates[currency.code],
            change: (Math.random() - 0.5) * 2, // Моковые данные для изменения курса (демо-режим)
          }));
          setCurrencyData(fiatData);
        } else {
          // Для демонстрационных целей используются сгенерированные данные для криптовалют
          // В продакшене рекомендуется использовать реальные данные через API, например CoinGecko
          const cryptoData: CurrencyData[] = cryptoList.map(crypto => ({
            ...crypto,
            rate: Math.random() * 50000, // Моковое значение курса
            change: (Math.random() - 0.5) * 10, // Моковое изменение курса
          }));
          setCurrencyData(cryptoData);
          // Преобразование массива криптовалют в объект с курсами
          const cryptoRates = cryptoData.reduce((acc, curr) => {
            acc[curr.code] = curr.rate;
            return acc;
          }, {} as Record<string, number>);
          setRates(cryptoRates);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rates:', error);
        setLoading(false);
      }
    };

    // Вызываем функцию загрузки курсов при монтировании компонента и при изменении режима
    fetchRates();
    // Обновляем курсы каждые 5 минут (300000 миллисекунд)
    const interval = setInterval(fetchRates, 300000);
    return () => clearInterval(interval);
  }, [mode]);

  // useEffect для генерации исторических данных для графика на основе выбранной валютной пары
  useEffect(() => {
    const generateHistoricalData = () => {
      const data: HistoricalData[] = [];
      // Базовый курс вычисляется как отношение курса валюты назначения к курсу валюты источника
      const baseRate = rates[selectedPair.to] / rates[selectedPair.from];
      
      // Генерация данных за последние 31 день (от 30 дней назад до текущей даты)
      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toLocaleDateString(), // Преобразование даты в локальный формат
          // Добавляем случайное колебание к базовому курсу:
          // для криптовалют масштаб колебаний больше, для фиатных валют – меньше
          rate: baseRate + (Math.random() - 0.5) * (mode === 'crypto' ? baseRate * 0.1 : 0.1),
        });
      }
      
      setHistoricalData(data);
    };

    // Генерация исторических данных происходит только если имеются актуальные курсы для выбранной валютной пары
    if (rates[selectedPair.from] && rates[selectedPair.to]) {
      generateHistoricalData();
    }
  }, [selectedPair, rates, mode]);

  // Если идет загрузка данных, отображаем спиннер
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Coins className="w-12 h-12 text-white" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen theme-transition bg-gradient-to-br ${isDark ? 'from-purple-500 to-blue-600' : 'from-blue-400 to-purple-400'} flex flex-col`}>
      {/* Компонент Navbar отвечает за навигационную панель и переключение темы */}
      <Navbar onThemeToggle={() => setIsDark(!isDark)} isDark={isDark} />
      
      <div className="flex-grow max-w-6xl mx-auto w-full pt-20 p-8 space-y-8">
        {/* Заголовок приложения */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Real-time Exchange Rates</h1>
          <p className="text-white/80">Live currency conversion and market trends</p>
        </motion.div>

        {/* Компонент переключения режима (fiat/crypto) */}
        <CurrencyToggle mode={mode} onModeChange={setMode} />

        {/* Основной контент состоит из конвертера валют и графика обменного курса */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Компонент для конвертации валют */}
          <CurrencyConverter
            rates={rates}
            onPairChange={setSelectedPair} // Обновление выбранной валютной пары при изменении
          />
          
          {/* Компонент графика, отображающий исторические данные обменного курса */}
          <CurrencyChart
            data={historicalData}
            currencyPair={`${selectedPair.from}/${selectedPair.to}`}
          />
        </div>

        {/* Таблица с популярными валютами или криптовалютами */}
        <CurrencyTable data={currencyData} mode={mode} />
      </div>

      {/* Футер */}
      <footer className="theme-transition backdrop-blur-lg bg-white/10 py-4 mt-8">
        <div className="max-w-6xl mx-auto px-8">
          <p className="footer-text text-center text-white/80 text-sm">mrmdkk</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
