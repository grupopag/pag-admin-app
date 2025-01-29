import ptBrMessages from '@/messages/pt-br.json';
import { createI18n } from 'vue-i18n';

// Type-define 'en-US' as the master schema for the resource
type MessageSchema = typeof ptBrMessages

const i18n = createI18n<[MessageSchema], 'pt-Br'>({
  locale: 'pt-Br',
  messages: {
    'pt-Br': ptBrMessages
  }
})

export default i18n;
