/**
 * Created by Alhassane on 05/02/2017.
 */
$(document).ready(function () {

    var pos = 1;
    var slideCount = 20;
    var slideWidth = 500 + "px";
    var sliderUlWidth = 500 * 20 + "px";
    var slideHeight = 1000 + "px";


    $('#slider').css({width: slideWidth, height: slideHeight});

    $('#slider ul').css({width: sliderUlWidth, marginLeft: -slideWidth});
    counter();
    function moveLeft() {
        $('#slider ul,.synopsis').animate({
            left: +slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');

        });

    }
    function moveRight() {
        $('#slider ul').animate({
            left: -slideWidth
        }, 200, function () {
            $('#slider ul li:first-child,.synopsis p').appendTo('#slider ul');

            $('#slider ul,.synopsis').css('left', '');

        });
        
    }

    $('.btns.prev').click(function (e) {
        e.preventDefault();
        if (pos >= 1) {
            pos--;
        }
        moveLeft();
        counter();
    });

    $('.btns.next').click(function (e) {
        e.preventDefault();
        if (pos < slideCount) {
            pos++;
        }
        moveRight();
        counter();
    });
    function counter() {
        $('#counter').html(pos + ' / ' + slideCount);
    }
    $.ajax({
        type: 'GET',
        url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=e082a5c50ed38ae74299db1d0eb822fe',
        timeout: 3000,
        success: function (data) {

            $.each(data.results, function (key, val) {
                var results = data.results[key];
                var notation = Math.round(data.results[key].vote_average);
                $("#slider ul").append("<li data-id=" + results.id + "><img data-img=" + results.original_title + " src=\"https://image.tmdb.org/t/p/w500/" + results.poster_path + "\" /><p>" + results.overview + "</p><p> note : " + notation + "</p></li>");

            });

        },
        error: function () {
            alert('La requête n\'a pas abouti');
        }
    });
    
});