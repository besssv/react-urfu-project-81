# Генератор форм на Typescript

[![hexlet-check](https://github.com/besssv/react-urfu-project-81/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/besssv/react-urfu-project-81/actions)
[![CI](https://github.com/besssv/react-urfu-project-81/actions/workflows/ci.yml/badge.svg)](https://github.com/besssv/react-urfu-project-81/actions/workflows/ci.yml)

Библиотека, с помощью которой удобно создавать формы в шаблонах сайтов. Она заметно сокращает код описания формы за счет автоматической обработки ошибок и различных контролов.

Учебный проект Хекслета: https://ru.hexlet.io/

## Стек

- TypeScript
- Vitest — тесты и покрытие
- oxlint, oxfmt — линтер и форматтер
- GitHub Actions — CI

## Установка

Требуется Node.js 24+.

```bash
git clone https://github.com/besssv/react-urfu-project-81.git
cd react-urfu-project-81
make install
```

## Использование

```ts
import HexletCode from "@hexlet/code";

const template = { name: "rob", job: "hexlet", gender: "m" };

const form = HexletCode.formFor(template, { url: "/users" }, (f) => {
  f.input("name", { class: "user-input", label: "User", labelHtml: { class: "form-label" } });
  f.input("job", { as: "textarea", rows: 50, cols: 50 });
  f.submit("Wow");
});

console.log(form);
// <form method="post" action="/users">
//   <label for="name" class="form-label">User</label>
//   <input name="name" type="text" value="rob" class="user-input">
//   <label for="job">Job</label>
//   <textarea cols="50" rows="50" name="job">hexlet</textarea>
//   <input type="submit" value="Wow">
// </form>
```

- `url` — адрес отправки формы (по умолчанию `#`), `method` — метод (по умолчанию `post`).
- `f.input(name, options)` — добавляет поле со значением из шаблона и лейбл к нему. `as: "textarea"` делает многострочное поле (по умолчанию `cols="20" rows="40"`), `label` задаёт текст лейбла (по умолчанию — имя поля с заглавной буквы), `labelHtml` — атрибуты лейбла, остальные опции становятся атрибутами тега.
- `f.submit(text)` — добавляет кнопку отправки, по умолчанию с текстом `Save`.
- Если поля нет в шаблоне, выбрасывается ошибка `Field '<name>' does not exist in the template.`

## Разработка

```bash
make lint
make lint-fix
make typecheck
make test
make test-coverage
```

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
