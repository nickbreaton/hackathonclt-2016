window.addEventListener('load', function () {
   var current = {};

   var ref = new Firebase("https://hackathonclt2016.firebaseio.com/");
   var img = $('img');
   var input = $('input[type="text"]')
   var skip = $('#skip');

   var sponsers = [];
   ref.child('sponsers').once('value', function (data) {
      data.forEach(function (sponser) {
         sponsers.push({
            name: sponser.key(),
            logos: []
         });
      });
      load();
   });

   function load () {
      var remaining = sponsers.length;
      sponsers.forEach(function (sponser) {
         ref.child('sponsers/' + sponser.name).once('value', function (data) {
            data.forEach(function (logo) {
               sponser.logos.push({
                  name: logo.key(),
                  url: logo.val()
               });
            });
            remaining--;
            if (remaining === 0) {
               $('.hide').removeClass('hide');
               setRandom();
            }
         });
      });
   }

   $(document).keydown(function (event) {
      input.removeClass('invalid');
      if (event.which === 13) {
         checkAnswer();
      }
   });

   skip.click(function (e) {
      e.preventDefault();
      next();
   });

   function setRandom () {
      current = sponsers[0].logos[0];
      img.attr('src', current.url); 
   }

   function checkAnswer () {
      if (input.val()) {
         if (current.name === input.val().toLowerCase()) {
            // addScore();
            next();
         } else {
            input.addClass('invalid');
            // error();
         }   
      }
   }

   function next () {
      input.val(null);
      sponsers[0].logos.shift();
      if (!sponsers[0].logos.length) sponsers.shift();
      setRandom();
      $(window).scrollTop(0)
   }

});
