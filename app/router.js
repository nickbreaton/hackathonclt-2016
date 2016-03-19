window.addEventListener('load', function () {
  window.app = { };
  // page.base('/#!');
  page('/', function () {
    app.route = 'home';
    reload();
  });
  page('/game', function () {
    app.route = 'game';
    reload();
    game();
  });
  page('/brands', function () {
    app.route = 'brands';
    reload();
  });
  page('/coupon', function () {
    app.route = 'coupon';
    reload();
  });
  page('/food-storage', function () {
    app.route = 'food-storage';
    reload();
  });
  page('*', function () {
    app.route = 'not-found';
    reload();
    document.write('not found');
  })
  page({
    hashbang: true
  });

  function reload () {
    $('.route').addClass('hide');
    $('#' + app.route).removeClass('hide');
  }

  reload();

});
