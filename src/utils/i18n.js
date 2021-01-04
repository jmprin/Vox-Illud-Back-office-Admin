import { setupI18n } from '@lingui/core';
import fr from '../locales/fr/messages';
import en from '../locales/en/messages';

export const defaultLocale = 'en';

const catalogs = {
    fr,
    en,
};

export const i18n = setupI18n({
    catalogs,
    language: 'fr',
});
