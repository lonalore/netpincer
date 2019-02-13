import Storage from './includes/storage';
import Config from './includes/config';
import Translate from './includes/translate';
import jQuery from 'jquery';
import 'jquery-ui-sortable-npm';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import '../css/popup.css';

/**
 * Class Popup.
 */
export default class Popup {

  /**
   * Constructor.
   */
  constructor() {
    this.browser = chrome || browser;
    this.storage = new Storage('local');
    this.config = new Config();
  }

  /**
   * Initializes Popup,js functions.
   */
  init() {
    jQuery('[data-translate]').each((index, element) => {
      var $this = jQuery(element);
      $this.text(Translate.t($this.data('translate')));
    });

    if (typeof this.browser === "undefined") {
      return;
    }

    this.initPopup();
  }

  /**
   * Initializes events on form widgets.
   */
  initPopup() {
    let _this = this;

    let saveOrderBy = (event, ui) => {
      let newOrderBy = [];
      let index = 0;

      jQuery('input.widget-order-by').each((index, element) => {
        let $widget = jQuery(element);
        newOrderBy.push({
          n: $widget.val(),
          c: $widget.is(':checked'),
          i: index,
        });
        index++;
      });

      _this.config.set('orderBy', newOrderBy);
      _this.messageToContent();
    };

    jQuery("#main-tabs-1 .list-group").sortable({
      stop: saveOrderBy,
    });

    jQuery('input.widget-order-by').on('change', saveOrderBy);

    let $settingsOpen = jQuery('input.widget-settings-open');

    $settingsOpen.on('change', () => {
      let state = $settingsOpen.is(':checked');
      _this.config.set('settingsOpen', state);
      _this.messageToContent();
    });

    // Set default values on form elements.
    _this.config.getAll(config => {
      jQuery.each(config['orderBy'], (index, value) => {
        jQuery('input.widget-order-by[value="' + value.n + '"]').prop('checked', value.c);
      });

      config['orderBy'].sort((a, b) => {
        return ((a.i > b.i) ? -1 : ((a.i < b.i) ? 1 : 0));
      });

      jQuery.each(config['orderBy'], (index, value) => {
        let $tabPane = jQuery('input.widget-order-by[value="' + value.n + '"]').closest('.list-group-item');
        $tabPane.parent().prepend($tabPane);
      });

      if (config['settingsOpen'] === true) {
        $settingsOpen.prop('checked', true);
      }
    });
  }

  /**
   * Send message to content.js for refreshing list.
   */
  messageToContent() {
    let _this = this;

    _this.browser.tabs.query({}, tabs => {
      tabs.forEach(tab => {
        _this.browser.tabs.sendMessage(tab.id, {type: 'refreshList'});
      });
    });
  };

}

const popup = new Popup();
popup.init();
