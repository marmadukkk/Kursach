// Импортируем StrictMode из библиотеки React.
// StrictMode помогает обнаружить потенциальные проблемы в приложении на стадии разработки.
import { StrictMode } from 'react';

// Импортируем функцию createRoot из 'react-dom/client' для создания корневого элемента React.
// Начиная с React 18, используется новый API для рендеринга приложения.
import { createRoot } from 'react-dom/client';

// Импорт компонента App, который является основным компонентом вашего приложения.
// Файл имеет расширение TypeScript (.tsx), что указывает на использование TypeScript.
import App from './App.tsx';

// Импорт файлов стилей, здесь импортируется глобальный CSS файл для всего приложения.
import './index.css';

// Находим HTML-элемент с id 'root' в документе, который будет служить контейнером для React-приложения.
// Оператор "!" (non-null assertion) говорит компилятору TypeScript, что мы уверены, что элемент существует.
const container = document.getElementById('root')!;

// Создаём корневой элемент для рендеринга вашего React-приложения с использованием нового API createRoot.
const root = createRoot(container);

// Вызываем метод render для отображения приложения в DOM.
// Оборачиваем основной компонент <App /> в <StrictMode> для активации дополнительных проверок и предупреждений во время разработки.
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
