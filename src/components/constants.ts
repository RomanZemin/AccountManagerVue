import type { FormItemRule } from "element-plus";

export const Rules: Record<string, FormItemRule[]> = {
  label: [
    { type: "string", message: "Метка должна быть строкой", trigger: "blur" },
    { max: 50, message: "Максимальная длина 50 символов", trigger: "blur" },
  ],
  login: [
    { required: true, message: "Логин обязателен", trigger: "blur" },
    { max: 100, message: "Максимальная длина 100 символов", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Пароль обязателен", trigger: "blur" },
    { max: 100, message: "Максимальная длина 100 символов", trigger: "blur" },
  ],
};

export const Title = "Учетные записи";
export const Remark = "Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;";