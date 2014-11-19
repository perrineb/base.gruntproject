App = (function () {
  return {
    init: function () { 
      App.project.init();
    }
  };
})();

jQuery( document ).ready(function() {
  App.init(); 
});
