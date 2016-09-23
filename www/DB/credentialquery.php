<?php
header("Access-Control-Allow-Origin: *");
$mysql_host = "107.180.41.88:3306";
$mysql_database = "projectCobra";
$mysql_user = "cobrakauhale";
$mysql_password = "C0br@kauhale";
// Create connection
$conn = new mysqli($mysql_host, $mysql_user, $mysql_password,$mysql_database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$sql = "SELECT Username,Password FROM Employee";
$result = $conn->query($sql);
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Username":"'  . $rs["Username"] . '",';
    $outp .= '"Password":"'   . $rs["Password"] . '"}'; 
       
}
$outp ='{ "records":[ '.$outp.' ]}';
$conn->close();
echo($outp);
?>