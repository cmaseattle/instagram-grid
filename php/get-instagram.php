<?php
include('config.php');

///////////////////////////////////
// instagram build
///////////////////////////////////
$instagram_url = 'https://api.instagram.com/v1/users/'.$instagram_user_id.'/media/recent/?client_id='.$istagram_client_id;
$filename = $path_to_index.'instagram-data/instagram.json';
$insta = json_decode(fetchData($instagram_url));
$file = fopen($filename, 'w');
fwrite($file, json_encode($insta));
fclose($file);

function fetchData($url){
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_TIMEOUT, 20);
  $data = curl_exec($ch);
  curl_close($ch); 
  return $data;
}