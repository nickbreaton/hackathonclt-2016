window.addEventListener('load', function () {
   var level = 0;
   var index = 0;

   var ref = new Firebase("https://hackathonclt2016.firebaseio.com/");
   var img = $('img');
   var input = $('input[type="text"]')

   var sponsers = [];
   ref.child('sponsers').once('value', function (data) {
      data.forEach(function (sponser) {
         sponsers.push(sponser.val());
      });
      name();
   });

   function name () {
      console.log(sponsers);
   }
});