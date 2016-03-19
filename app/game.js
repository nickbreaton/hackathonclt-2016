function game () {
   var current = {};

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
              //  $('.hide').removeClass('hide');
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
            firebaseCount();
            Materialize.fadeInImage('#logo')
         } else {
            input.addClass('invalid');
            // error();
         }
      }
   }

   function firebaseCount() {
     ref.child('stats/count').once('value', function (data) {
       ref.child('stats').set({
         count: data.val() + Math.floor(Math.random() * 5) + 1
       });
     });
   }

   function next () {
      input.val(null);
      sponsers[0].logos.shift();
      if (!sponsers[0].logos.length) sponsers.shift();
      setRandom();
      $(window).scrollTop(0)
   }

   function win () {
     $('#modal1').openModal();
     $('.food').remove();
   }

   var foodR = 0;
   var foodC = 0;
   function nextFood () {

      for (var i = 0; i < 20; i++) {
         if (foodR === 10) {
            foodR = 0;
            foodC++;
         }
         setFood(foodR, foodC, Math.floor(Math.random() * 500));
         foodR++;
      }

      if (foodC === 9 ) {
        foodR = 0;
        foodC = 0;
        win();
      }
   }

   function setFood (i, j, delay) {
      var x = Math.random()*2 + - 1 + (i * 10);
      var y = Math.random()*2 + - 1 + (j * 10) + 125;
      var id = 'food-' + new String(Math.random()).replace('.', '');
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

}
