$(document).ready(function (){
    $('.main-checkbox').on('change', function () {
        $(this).prop('checked') ?
            $(this).closest('.form-group').find('input').prop("checked", true) :
            $(this).closest('.form-group').find('input').prop("checked", false);
    });
 
    $(".calc-price a").on("click", function () {
        $("#exampleModal").find("h5").text('Расчет индивидуального комплекта');
    });
 
    $('#exampleModal').find('input[type="button"]').on('click', function (e) {
        e.preventDefault();
        let inputName = $("#raschet input[name='name']");
        let inputPhone = $("#raschet input[name='phone']");
        let inputSoglasie = $("#raschet input[name='soglasie']");
        let calculator = $("#calculator").serializeArray();
        let header = $('#exampleModal h5').text();
 
        sendEmail(inputName, inputPhone, inputSoglasie, calculator, header);
    });
 
    $("#header-form").find('input[type="button"]').on('click', function (e) {
        e.preventDefault();
        let inputName = $("#header-form input[name='name']");
        let inputPhone = $("#header-form input[name='phone']");
        let inputSoglasie = $("#header-form input[name='soglasie']");
 
        sendEmail(inputName, inputPhone, inputSoglasie);
    });
 
    $(".pages-kits-link").find('a').each(function (key, item) {
        $(item).on('click', function (e) {
            e.preventDefault();
            let h5 = $(item).data("komplektyType").trim();
            $("#exampleModal").find("h5").text('Заказать комплект "' + h5 + '"');
        })
    });
})
 
let sendEmail = function ($name, $phone, $soglasie, $calc = 0, $header) {
    let url = "/local/ajax/form.php";
 
    let name = $name.val();
    let phone = $phone.val();
    let soglasie = false;
    if($soglasie.prop("checked")) { soglasie = true; }
 
    if (name.trim() === '' || phone.trim() === '' || !soglasie) {
 
        name.trim() === '' ? $name.css('outline', '2px solid red') : $name.css('outline', 'none');
        phone.trim() === '' ? $phone.css('outline', '2px solid red') : $phone.css('outline', 'none');
        !soglasie ? $soglasie.closest('.form-group').css('outline', '2px solid red') : $soglasie.closest('.form-group').css('outline', 'none');
 
    } else {
 
        $.post(url, {name: name, phone: phone, set: $calc, header: $header})
            .done(function (data) {
                console.log(data);
                $calc ?
                    $('#raschet').html('<p style="color: darkgreen; text-align: center; padding: 35px 0; font-size: 22px; font-weight: 600;">Ваша заявка успешно отправлена</p>') :
                    $('#header-form').html('<div style="height: 151px"><p style="color: darkgreen; text-align: center; padding: 35px 0; font-size: 22px; font-weight: 600;">Ваша заявка успешно отправлена</p></div>');
 
            });
    }
}
