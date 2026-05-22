import es from './dictionaries/es.json';
import en from './dictionaries/en.json';

export type Dictionary = typeof es;

export function getDictionary(lang?: string): Dictionary {
  if (lang === 'en') {
    return en;
  }
  return es;
}
