
Yarn: npm i -g yarn
Gulp: npm i -g gulp
Bem Tools: npm i -g bem-tools-core

/------------------------------------------------------------------/

введите yarn set version berry
скачайте необходимые зависимости: yarn
чтобы начать работу, введите команду: yarn run dev (режим разработки)
чтобы собрать проект, введите команду yarn run build (режим сборки)

/-------------------------------------------------------------------------/
# GULP + Webpack terminal commands:

- `yarn run dev`- запуск сервера для разработки проекта
- `yarn run build`- собрать проект с оптимизацией без запуска сервера
- `yarn run build:views`- собрать HTML-файлы
- `yarn run build:styles`- скомпилировать SCSS-файлы
- `yarn run build:scripts`- собрать JS-файлы
- `yarn run build:images`- собрать изображения
- `yarn run build:webp`- сконвертировать изображения в формат`.webp`
- `yarn run build:sprites`собрать спрайты
- `yarn run build:fonts`- собрать шрифты
- `yarn run build:favicons`- собрать фавиконки
- `yarn run build:gzip`- собрать конфигурацию Apache
- `yarn run bem-m`+ name of block - добавить БЭМ-блок
- `yarn run lint:styles --fix`- исправить ошибки в SCSS-файлах согласно настройкам Stylelint
- `yarn run lint:scripts`- проверить JS-файлы
- `yarn run lint:scripts --fix'- исправить ошибки в JS-файлах согласно настройкам ESLint
- важно, при подключении внешних модулей и файлов к сторонним страницам, использовать подобный путь:   
- **@@include("/blocks/modules/header/header.html")**
/----------------------------------------------------------------------------------------/
ДОКУМЕНТАЦИЯ ПО НАПИСАНИЮ КОДА СТИЛЕЙ НА SCSS dart 3.0:
  Центральный файл для подключения всех модулей
  @use "header/header";
  @use "footer/footer";
  @use "hero/hero";
  // ... другие модули

// ===== ПРИМЕР БЭМ МОДУЛЯ: src/blocks/modules/header/header.scss =====
// Подключаем только то, что нужно в этом блоке
@@use "../../../styles/use/media" as media;
@use "../../../styles/mixins/mixins" as mix;

.header {
background: #fff;
padding: 20px 0;

&__container {
display: flex;
justify-content: space-between;
align-items: center;
}

&__logo {
font-size: 24px;
font-weight: bold;
}

&__nav {
display: flex;
gap: 30px;

    @include mobile.tablet {
      gap: 20px;
    }
    
    @include mobile.mobile {
      display: none; // скрываем навигацию на мобильных
    }
}

&__link {
text-decoration: none;
color: #333;
transition: color 0.3s ease;

    @include mobile.hover {
      color: #007bff;
    }
}

// Мобильное меню
&__burger {
display: none;
flex-direction: column;
gap: 4px;
cursor: pointer;

    @include mobile.mobile {
      display: flex;
    }
    
    span {
      width: 25px;
      height: 3px;
      background: #333;
      transition: all 0.3s ease;
    }
}

// Адаптив для разных разрешений
@include mobile.tablet-b {
padding: 15px 0;

    &__logo {
      font-size: 22px;
    }
}

@include mobile.tablet {
padding: 12px 0;

    &__logo {
      font-size: 20px;
    }
}

@include mobile.mobile {
padding: 10px 0;

    &__logo {
      font-size: 18px;
    }
}

@include mobile.mobile-s {
&__logo {
font-size: 16px;
}
}
}

// ===== ФАЙЛ: src/scss/mixins/_mixins.scss =====
// Подключаем медиа-запросы для использования в миксинах
@use "../basic/mobile" as mobile;

// Миксин для кнопок
@mixin button-style($bg-color: #007bff, $text-color: #fff) {
display: inline-block;
max-width: var(--btn-max-width);
height: var(--btn-max-height);
padding: 0 20px;
background-color: $bg-color;
color: $text-color;
text-decoration: none;
border: none;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s ease;

@include mobile.hover {
background-color: darken($bg-color, 10%);
}

@include mobile.tablet {
padding: 0 15px;
font-size: 14px;
}

@include mobile.mobile {
padding: 0 12px;
font-size: 13px;
}
}

// Миксин для flex контейнера
@mixin flex-container($justify: flex-start, $align: stretch, $direction: row, $wrap: nowrap) {
display: flex;
justify-content: $justify;
align-items: $align;
flex-direction: $direction;
flex-wrap: $wrap;
}

// Миксин для абсолютного центрирования
@mixin abs-center {
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
}

// ===== ПРИМЕР КОМПОНЕНТА: src/blocks/components/button/button.scss =====
@use "../../../scss/basic/mobile" as mobile;
@use "../../../scss/mixins/mixins" as mix;
@use "sass:color";

.button {
@include mix.button-style();

&--primary {
@include mix.button-style(#007bff, #fff);
}

&--secondary {
@include mix.button-style(#6c757d, #fff);
}

&--large {
max-width: 200px;
height: 55px;
font-size: 16px;

    @include mobile.tablet {
      max-width: 180px;
      height: 50px;
      font-size: 15px;
    }
    
    @include mobile.mobile {
      max-width: 160px;
      height: 45px;
      font-size: 14px;
    }
}

&--small {
max-width: 120px;
height: 35px;
font-size: 12px;

    @include mobile.mobile {
      max-width: 100px;
      height: 30px;
      font-size: 11px;
    }
}

&:disabled {
opacity: 0.6;
cursor: not-allowed;

    @include mobile.hover {
      background-color: #6c757d; // не меняем цвет при наведении
    }
}
}