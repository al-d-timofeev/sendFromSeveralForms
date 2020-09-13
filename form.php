<? require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/include/prolog_before.php');
header('Content-Type: application/json');

use Bitrix\Main\Mail\Event;

$name = $_POST['name'];
$phone = $_POST['phone'];
$set = $_POST['set'];
$header = $_POST['header'];

if ($set || $header === 'Расчет индивидуального комплекта') {

    $list = '<ul>';
    foreach ($set as $item) {
        $list .= "<li>" . $item['name'] . "</li>";
    }
    $list .= '</ul>';

    Event::send(array(
        "EVENT_NAME" => "KALKULYTOR",
        "LID" => "s1",
        "C_FIELDS" => array(
            "NAME" => $name,
            "PHONE" => $phone,
            "LIST" => $set ? $list : 'не указано',
            "HEADER" => $header
        ),
        "message_id" => "31"
    ));

} elseif ($header <> 'Расчет индивидуального комплекта' && $header <> null) {

    Event::send(array(
        "EVENT_NAME" => "KALKULYTOR",
        "LID" => "s1",
        "C_FIELDS" => array(
            "NAME" => $name,
            "PHONE" => $phone,
            "HEADER" => $header
        ),
        "message_id" => "33"
    ));

} else {  

    Event::send(array(
        "EVENT_NAME" => "ZAYAVKA",
        "LID" => "s1",
        "C_FIELDS" => array(
            "NAME" => $name,
            "PHONE" => $phone,
        )
    ));

}


echo json_encode($header);