window.addEventListener('load', function () {
   var ref = new Firebase("https://hackathonclt2016.firebaseio.com/");
   var img = $('#logo');

   ref.child('sponsers/coke').once('value', function (snapshot) {
      snapshot.forEach(function (node) {
         img.attr('src', node.val());
      });
   });
});