function food () {
  ref.child('stats/count').on('value', function (data) {
    $('#count').text(data.val());
  });
}
