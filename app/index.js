window.addEventListener('load', function () {
   var current = {};

   var ref = new Firebase("https://hackathonclt2016.firebaseio.com/");
   var img = $('img');
   var input = $('input[type="text"]')

   var sponsers = [];
   ref.child('sponsers').once('value', function (data) {
      data.forEach(function (sponser) {
         sponsers.push({
            name: sponser.key(),
            logos: []
         });
      });
      next();
   });

   function next () {
      sponsers.forEach(function (sponser) {
         ref.child('sponsers/' + sponser.name).once('value', function (data) {
            data.forEach(function (logo) {
               sponser.logos.push({
                  name: logo.key(),
                  url: logo.val()
               });
            });
         });
      });
   }

   setTimeout(function () {
      setRandom();
   }, 3000);

   $(document).keydown(function (event) {
      if (event.which === 13) {
         checkAnswer();
      }
   });

   function setRandom () {
      current = sponsers[0].logos[0];
      img.attr('src', current.url);
   }

   function checkAnswer () {
      if (input.val()) {
         if (current.name === input.val().toLowerCase()) {
            // addScore();
            input.val(null);
            sponsers[0].logos.shift();
            if (!sponsers[0].logos.length) sponsers.shift();
            setRandom();
         } else {
            // error();
         }   
      }
   }

   

});
