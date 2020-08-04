module.exports = {
  bidItemsTotal: function (array) {
    if(Array.isArray(array)){
         return array.reduce((total, currentElem) => {
        const currentTotal = +currentElem.quantity * +currentElem.price_per_item;
        return total + currentTotal;
       }, 0);
    }
  },
}