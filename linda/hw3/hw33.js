var currentLego = data[0];

$('#lego-count').html(currentLego.clickCount);
$('#lego-name').html(currentLego.name);
$('#lego-img').attr("src",currentLego.imgSrc);

$('#lego-img').bind('click', function() {
           currentLego.clickCount++;   
            $('#lego-count').html(currentLego.clickCount);
});

createButtons();

function createButtons() {
   
    for(var i = 0; i < data.length; i++){
           elem = document.createElement('li');
            elem.textContent= data[i].name;

            var changeImange = function(lego) {
                return function() {
                   
                    currentLego = lego;
                    $('#lego-count').html(lego.clickCount);
                    $('#lego-name').html(lego.name);
                    $('#lego-img').attr("src",lego.imgSrc);

                };
            }
            elem.addEventListener('click', changeImange(data[i]));


           $('#lego-list').append(elem);
          
    }
   
     this.render();
};