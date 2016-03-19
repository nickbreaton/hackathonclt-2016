window.addEventListener('load', function () {
   var current = {};

   var ref = new Firebase("https://hackathonclt2016.firebaseio.com/");
   var img = $('#logo');
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
            nextFood();
            next();
            Materialize.fadeInImage('#logo')
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

   var foodR = 0;
   var foodC = 0;
   function nextFood () {
      for (var i = 0; i < 10; i++) {
         if (foodR === 10) {
            foodR = 0;
            foodC++;
         }
         setFood(foodR, foodC, Math.floor(Math.random() * 500));
         foodR++;   
      }
   }

   function setFood (i, j, delay) {
      var x = Math.random()*2 + - 1 + (i * 10);
      var y = Math.random()*2 + - 1 + (j * 10) + 125;
      var id = 'food-' + Math.random().toString(30).substring(15);
      var size = 10;
      var icon = Math.floor(Math.random()*30) + 1;

      $('<div/>', {
          id: id,
          class: 'food',
          style: 'width: ' + size + '%;' 
                  + 'height: ' + size + '%;' 
                  + 'bottom: ' + y + '%;' 
                  + 'left: ' + x + '%;'
                  + 'background-image: url(/assets/food-icons/'+ icon +'.svg)',
      }).appendTo('#insert-food');

      var square = document.querySelector('#' + id);

      setTimeout(function () {
         new mojs.Tween({
           repeat:   0,
           delay:    100,
           onUpdate: function (progress) {
             var bounceProgress = mojs.easing.bounce.out(progress);
             square.style.transform = 'translateY(' + $('#card').height()*1.25*bounceProgress + 'px)';
           }
         }).run();   
      }, delay);
   }

});
