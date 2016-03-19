window.addEventListener('load', function () {
  window.ref = new Firebase("https://hackathonclt2016.firebaseio.com/");
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
  page('/sponsers', function () {
    app.route = 'sponsers';
    reload();
  });
  page('/coupon', function () {
    app.route = 'coupon';
    coupon();
    reload();
  });
  page('/food-storage', function () {
    app.route = 'food-storage';
    food();
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
