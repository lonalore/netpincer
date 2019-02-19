/**
 * Translate texts.
 */
export default class Translate {

  /**
   * @param text
   * @returns {string}
   */
  static t(text) {
    let lang = navigator.language || navigator.userLanguage;
    let strings = Translate.strings();
    return strings.hasOwnProperty(text) ? strings[text][lang] : text;
  }

  /**
   * @returns {object}
   */
  static strings() {
    return {
      'Order by': {
        en: 'Order by',
        hu: 'Rendezés',
      },
      'Name': {
        en: 'Name',
        hu: 'Név',
      },
      'Sort by name, alphabetically.': {
        en: 'Sort by name, alphabetically.',
        hu: 'Név szerint, ABC sorrendben.',
      },
      'Rating': {
        en: 'Rating',
        hu: 'Értékelés',
      },
      'Sort by rating, in descending order.': {
        en: 'Sort by rating, in descending order.',
        hu: 'Értékelés szerint, csökkenő sorrendben.',
      },
      'Delivery Cost': {
        en: 'Delivery Cost',
        hu: 'Szállítási díj',
      },
      'Sort by delivery cost, in ascending order.': {
        en: 'Sort by delivery cost, in ascending order.',
        hu: 'Szállítási díj szerint, növekvő sorrendben.',
      },
      'Minimum order': {
        en: 'Minimum order',
        hu: 'Minimum rendelés',
      },
      'Sort by minimum order, in ascending order.': {
        en: 'Sort by minimum order, in ascending order.',
        hu: 'Minimum rendelés szerint, növekvő sorrendben.',
      },
      'Filters': {
        en: 'Filters',
        hu: 'Szűrők',
      },
      'Only open': {
        en: 'Only open',
        hu: 'Csak ami nyitva',
      },
      'Only restaurants that are currently open.': {
        en: 'Only restaurants that are currently open.',
        hu: 'Csak azok az éttermek, amik nyitva vannak.',
      },
      'Info': {
        en: 'Info',
        hu: 'Info',
      },
    };
  }

}
