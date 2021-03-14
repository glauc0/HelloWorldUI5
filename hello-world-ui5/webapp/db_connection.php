<?php 

$servername = "localhost";
$username = "root";
$password = "usbw";
$dbname = "test";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

 $sql = "select * from orders";
 
 $res = mysqli_query($conn,$sql);
 
 $result = array();
 
 while($row = mysqli_fetch_array($res)){
 array_push($result, 
 array('Userid'=>$row[0],'Name'=>$row[1],'Age'=>$row[2],'Email'=>$row[3]));
 }
 
 echo json_encode(array('result'=>$result));
?>