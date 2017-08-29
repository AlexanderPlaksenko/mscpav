<?php
$utm = $_SERVER['HTTP_REFERER'];
$sendto = "7728484@mail.ru, tatuajorders@gmail.com, meded-test@yandex.ru, plaxon@mail.ru";
$title = $_POST['title'];
$name = $_POST['name'];
$tel = $_POST['tel'];
$text = $_POST['text'];
$email = $_POST['email'];
$review = $_POST['review'];
$soclink = $_POST['soclink'];
$cookie = $_COOKIE['gaCookie'];

// Формирование заголовка письма
$subject  = "Заказ";
$headers  = "From: " ."". "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Татуаж Сайт Заказ</h2>\r\n";
$msg .= "<p>".$title."</p>\r\n";
if(!empty($name)){
	$msg .= "<p><strong>Имя: </strong> ".$name."</p>\r\n";
}
if(!empty($tel)){
	$msg .= "<p><strong>Телефон: </strong> ".$tel."</p>\r\n";
}
if(!empty($text)){
	$msg .= "<p><strong>Сообщение: </strong> ".$text."</p>\r\n";
}
if(!empty($email)){
	$msg .= "<p><strong>Email: </strong> ".$email."</p>\r\n";
}
if(!empty($review)){
	$msg .= "<p><strong>Отзыв: </strong> ".$review."</p>\r\n";
}
if(!empty($soclink)){
	$msg .= "<p><strong>Адрес страницы в соц. сетях: </strong> ".$soclink."</p>\r\n";
}

$msg .= "<p><strong>UTM: </strong> ".$utm."</p>\r\n";
$msg .= "<p><strong>UTM: </strong> ".$cookie."</p>\r\n";
$msg .= "</body></html>";

// отправка сообщения
//if(!empty($tel)){
	mail($sendto, $subject, $msg, $headers);
//}

$url = 'http://crm.pavlovastudio.ru/lead_to_crm.php';
$data = array('phone' => $tel, 'utm' => $utm);

$toCRM = curl_init();
curl_setopt_array($toCRM, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query($data)
));
$response = curl_exec($toCRM);
curl_close($toCRM);
?>
