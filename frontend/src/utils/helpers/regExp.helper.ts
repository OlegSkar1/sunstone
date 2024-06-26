type IRegExpVariants = keyof typeof regExpObject;

const regExpObject = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  //Данное регулярное выражение проверяет строку на соответствие формату email адреса, не учитывая регистр букв.
  loginWithSymbols: /^[A-Za-z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/\-`'"=|]+$/gi,
  //Данное регулярное выражение пропускает только английские буквы, цифры и символы, кроме валют.
  siteDomain:
    /^(?!https?:\/\/|www\.)(?!.*\.\..*)[a-zA-Zа-яА-ЯёЁ0-9][a-zA-Zа-яА-ЯёЁ0-9-]*(?:\.[a-zA-Zа-яА-ЯёЁ0-9-]+)*\.[a-zA-Zа-яА-ЯёЁ]{2,}$/i,
  //Данное регулярное выражение проверяет правильность формата доменного имени с поддоменами и отвергает имена, начинающиеся с "http://", "https://" или "www." и содержащие более одной точки, при этом позволяет использовать только буквы, цифры и дефисы в доменных именах, а также поддомены второго и более высоких уровней.
  capitalLetter: /[A-ZА-ЯЁ]+/,
  //Это регулярное выражение будет соответствовать строке, содержащей хотя бы одну заглавную букву из латинского или русского алфавита. Если в строке нет заглавных букв, соответствия не будет.
  // eslint-disable-next-line no-useless-escape
  specialSymbol: /[!№@#$%^&*()\],\[.?":{}|/<>`=+~;'\\_-]/g,
  //Это регулярное выражение используется для поиска специальных символов в строке. Оно соответствует любому символу из списка: !, @, #, $, %, ^, &, *, (, ), [, ], ,, ., ?, ", :, {, }, |, /, <, >, `, =, +, ~, ;, ', , _ и -.

  domain:
    // eslint-disable-next-line no-useless-escape
    /^(?!https?:\/\/|www\.)(?!.*\.\..*)[-a-zA-Z0-9:%_\+.~#?&\/=ёЁа-яА-Я]*(?:\.(xn--80adxh1ak|[a-zа-я]{2,})){1}(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?$/gi,
  //Это регулярное выражение используется для проверки валидности URL включая российские домены .рф. Оно проверяет, что строка содержит правильный формат URL-адреса, без протокола (http://, https:// и т.д.), имя домена и путь.
  onlyNumbers: /\D+$/,
  // eslint-disable-next-line no-useless-escape
  url: /^([A-Za-z0-9\-]+\.)*[A-Za-z0-9\-]+\.[A-Za-z]{2,8}(:[0-9]+)?(\/.*)?$/,
  //Это регулярное выражение будет искать все символы, не являющиеся цифрами, в конце строки.
  default: /[A-Z][a-z][0-9]/,
  //Это регулярное выражение ищет последовательность символов, которая начинается с любой заглавной буквы, за которой следуют любая строчная буква и любая цифра. Примеры соответствующих строк: "Aa0", "Zz9", "Kj2", "Qw1" и т.д.
  amount: /^\d+(\.\d{1,2})?(\.[1-9])?$|^\d+\.$/,
  //Это регулярное выражение проверяет, является ли заданная строка действительным денежным значением с двумя цифрами после десятичной точки.
  //  Это выражение пропускает:
  //1
  //1.23
  //1.2
  //1234.56.7 (игнорирует дополнительные точки)

  //И не пропускает:
  //.23 (не может начинаться с точки)
  //1234.567 (больше, чем две цифры после десятичной точки)
  //0.00 (не пропускает нули перед десятичной точкой)
  telegram: /.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*/,
  //Это регулярное выражение проверяет, соответствует ли строка следующему шаблону:

  url_proxy:
    /^(https?:\/\/(www\.)?|www\.)[a-zA-Z0-9:%_.~#?&/=ёЁа-яА-Я]*(?:\.(xn--80adxh1ak|[a-zа-я]{2,})){1}(\/[-a-zA-Z0-9@:%_.~#?&/=]*)?$/,

  //Любое количество символов, которые не являются границей слова (\B).
  //Символ "@".
  //Минимум 5 и максимум 32 символа из букв латинского алфавита и/или цифр.
  //Любое количество групп символов "_", следующих за буквами и цифрами.
  //Любое количество символов, заканчивающих строку.
};

export const regExpHelper = (variant: IRegExpVariants = 'default'): RegExp => regExpObject[variant];
