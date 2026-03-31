import "i18next";
// Importe um dos seus arquivos JSON para servir de base para o tipo
import common from "../locales/pt/common.json";
import forms from "../locales/pt/forms.json";
import components from "../locales/pt/components.json";



declare module "i18next" {
  interface CustomTypeOptions {
    // Define o namespace padrão
    defaultNS: "common";
    // Mapeia os recursos (aqui o TS lê a estrutura do seu JSON)
    resources: {
      
      common: typeof common;
      forms: typeof forms;
      components: typeof components;
    };
  }
}