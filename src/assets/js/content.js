import Storage from './includes/storage';
import Config from "./includes/config";
import Helper from "./includes/helper";

import jQuery from 'jquery';

/**
 * Class Content.
 */
export default class Content {

  /**
   * Constructor.
   */
  constructor() {
    this.browser = chrome || browser;
    this.storage = new Storage('local');
    this.config = new Config();

    this.$originalList = [];
  }

  /**
   * Initializes Content.js functions.
   */
  init() {
    let _this = this;

    if (typeof this.browser === "undefined") {
      return;
    }

    let $showListContent = jQuery('.shop-list-content');

    let checkExist = setInterval(function() {
      if ($showListContent.find('.shop-list-row').length > 0) {
        _this.$originalList = $showListContent.clone();
        clearInterval(checkExist);
        _this.initListHandler();
      }
    }, 100);
  }

  /**
   * Init list handler.
   */
  initListHandler() {
    let _this = this;

    this.browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.hasOwnProperty('type') && request.type === 'refreshList') {
        _this.refreshList();
      }
    });

    _this.refreshList();
  }

  /**
   * Re-order list items.
   */
  refreshList() {
    let _this = this;
    let filters = [];

    let reOrderList = (filters, config) => {
      let items = [];

      let $container = jQuery('.shop-list-content');

      _this.$originalList.find('.shop-list-row').clone().each((index, element) => {
        let $element = jQuery(element);
        let name = $element.find('h2[itemprop="name"]').text();
        let rate = $element.find('span.percent').text();
        let open = ($element.find('.shop-open-details.close').length === 0);
        let cost = $element.find('.shop-delivery-cost').text();
        let min = $element.find('.shop-minimum-order').text();

        rate = parseInt(rate.replace("%", ""));
        rate = !isNaN(rate) ? rate : 0;

        items.push({
          element: $element,
          name: name.charAt(0),
          rating: rate,
          open: open,
          cost: cost,
          min: min
        });
      });

      if (filters.length > 0) {
        items.sort(Helper.orderByProperty(filters));
      }

      if (items.length > 0) {
        $container.find('.shop-list-row').remove();

        jQuery.each(items, (index, value) => {
          let $element = jQuery(value.element);
          $element.appendTo($container);

          if (config['settingsOpen'] === true && !value.open) {
            $element.hide();
          }
          else {
            $element.show();
          }
        });
      }
    };

    _this.config.getAll(config => {
      jQuery.each(config['orderBy'], (index, value) => {
        if (value.c === true) {
          filters.push(value.n);
        }
      });

      reOrderList(filters, config);
    });
  };

}

// Run content script.
const content = new Content();
content.init();
