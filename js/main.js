var version = "BETA v0.3.0"
$('#version').html(version);
var fileN = 1;

var casperJS = true;
var downloadZIP = true;
var genie = "";
var saveType = ".pdf";
var testing = false;


var $bgs = $('.toggleD');
$('.toggleA').click(function () {
    $(this).toggleClass('active');
    $('.toggleA').not(this).removeClass('active');
    var $target = $($(this).data('target')).stop(true).slideToggle();
    $bgs.not($target).filter(':visible').stop(true, true).slideUp();

    if ($('#Ldr').is(':visible')) {
        $("#Ldr").toggle();
    }
});

$('#MainImageOpt2').click(function () {
    if ($('#SaveOpt').is(':checked')) {
        $('#dispImageOption').slideToggle();
    }
});

$('#MainImageOpt1').click(function () {
    if (!$('#SaveOpt').is(':checked')) {
        $('#dispImageOption').slideToggle();
    }
});




function listf() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "php/listFiles.php",
        data: {
            clg: $('#region').val(),
            code: $('#college').val(),
            year: $('#year').val(),
            branch: $('#branch').val()
        },
        success: function (data) {
            var files = parseInt(data.fileN);
            $("#Ldr").percentageLoader({
                value: data.size,
                progress: files / fileN
            });
            if (files != fileN && files < fileN) {
                console.log((files / fileN) * 100);
                console.log(fileN);
                console.log(files);
                setTimeout(function () {
                    listf();
                }, 2000);
            }
            if (files >= fileN)
                writeReport();
        }
    });
}


function writeReport() {
    $.ajax({
        type: "POST",
        url: "php/pword.php",
        data: {
            clg: $('#region').val(),
            code: $('#college').val(),
            year: $('#year').val(),
            branch: $('#branch').val()
        },
        success: function (result) {
            zipContents();

        }
    });


}

function zipContents() {
    $.ajax({
        type: "POST",
        url: "php/zip.php",
        data: {
            clg: $('#region').val(),
            code: $('#college').val(),
            year: $('#year').val(),
            branch: $('#branch').val()
        },
        success: function (result) {
            var zipFileName = $('#region').val() + $('#college').val() + $('#year').val() + $('#branch').val();
            if (downloadZIP == true)
                window.location = 'http://localhost/php/download.php?Fname=' + zipFileName;              
            $('#Ldr').hide('slide', {
                direction: 'right'
            }, 500);
            setTimeout(function () {
                $('#Genie').css('padding-bottom', '0px');
                $('#thankYou').show();
            }, 1000);
            setTimeout(function () {
                $('#thankYou').hide('slide', {
                    direction: 'right'
                }, 500);
            }, 5000);
        }
    });
}

$("#vtuForm").submit(function (event) {
    /* stop form from submitting normally */
    event.preventDefault();
    fileN = $("#endU").val() - $("#startU").val();
    saveType = $('input[name=ImageOpt]:checked').val();

    $('#Genie').css('padding-bottom', '280px');
    $('#Ldr').show('slide', {
        direction: 'left'
    }, 1000);
    $("#Ldr").percentageLoader({
        value: '250kb',
        progress: 0.07
    });
    $('#dVTU').toggle();
    /* get some values from elements on the page: */
    var $form = $(this),
        url = $form.attr('action');
    /* Send the data using post */
    if (casperJS == true)
        genie = "genie.js";
    var posting = $.post(url, {
        clg: $('#region').val(),
        code: $('#college').val(),
        year: $('#year').val(),
        branch: $('#branch').val(),
        num: $('#startU').val(),
        endUSN: $('#endU').val(),
        JS: genie,
        testing: testing,
        saveType: saveType
    });
    /* Alerts the results */
    posting.done(function (data) {
        setTimeout(function () {
            listf();
        }, 5000);

    });
});

jQuery.fn.center = function () {
    this.css("position", "absolute");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
        $(window).scrollLeft()) + "px");
    return this;
}


$('.fa-database, .fa-bar-chart').on('mouseover', function () {
    $(this).fadeOut(100);
    $(this).fadeIn(1500);
});

$(document).ready(function () {
    $("#Ldr").percentageLoader({
        width: 256,
        height: 256,
        progress: 0.5,
        value: '512kb'
    });
    $("#Ldr").center();
});