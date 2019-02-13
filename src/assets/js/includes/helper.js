/**
 * Contains helper methods.
 */
export default class Helper {

  /**
   * @param props
   * @returns {Function}
   */
  static orderByProperty(props) {
    let args = Array.prototype.slice.call(props, 1);

    return (a, b) => {
      if (a[props[0]] === b[props[0]] && args.length > 0) {
        return Helper.orderByProperty(args)(a, b);
      }
      let direction = Helper.orderDirection(props[0]);
      return (a[props[0]] > b[props[0]]) ? direction[0] : direction[1];
    };
  }

  /**
   * @param prop
   * @returns {number[]}
   */
  static orderDirection(prop) {
    if (prop === 'rating') {
      // Descending order.
      return [-1, 1];
    }
    return [1, -1];
  }

}
