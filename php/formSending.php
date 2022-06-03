<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$data['result'] = 'success';

// checking and clearing
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  $data['result'] = 'error';
  echo json_encode($data);
  exit();
}
if (!isset($_POST['email']) && !isset($_POST['name']) && !isset($_POST['phone'])) {
  $data['result'] = 'error';
  echo json_encode($data);
  exit();
};

$email = trim(urldecode(htmlspecialchars($_POST['email'])));
$name = trim(urldecode(htmlspecialchars($_POST['name'])));
$phone = trim(urldecode(htmlspecialchars($_POST['phone'])));

if (empty($email) && empty($name) && empty($phone)) {
  $data['result'] = 'error';
  echo json_encode($data);
  exit();
};

// txt-file with emails list
if (file_exists("maillist.txt")) {
  $mailList = fopen("maillist.txt", 'r');
  while(!feof($mailList))
  {
      $addresses[] = trim(htmlentities(fgets($mailList)));
  }
  fclose($mailList);
} else {
  $data['result'] = 'error';
  echo json_encode($data);
  exit();
}

$to = implode(', ', $addresses);
$subject = "Новая заявка с HelenMedia.ru";
$message = "Здравствуйте.<br>
<br>
С сайта HelenMedia.ru отправлена новая заявка с данными:<br>
Имя: $name<br>
E-mail: $email<br>
Номер телефона: +7 $phone<br>";

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: lead@helenmedia.ru' . "\r\n";



if (!mail($to, $subject, $message, $headers)) {
  $data['result'] = 'error';
}

echo json_encode($data);
exit();
