<?php
    //connect to database
    $conn = mysqli_connect('localhost', 'root', '', 'jotform');

    //check the connection
    if(!$conn){
        echo 'Connection error: ' . mysqli_connect_error();
    }

    $num = 0;
    $done= 0;
    $remain= 0;
    $progressSum= 0;
    $donePerc= 0;
    $progPerc= 0;
    $nsPerc= 0;

    $date = date("Y-m-d H:i:s");

    ///////////////////// getting number of tasks
    $getNumSql = "SELECT * FROM task";

    $getNumResult = mysqli_query($conn, $getNumSql);

    $getNumArr = mysqli_fetch_all($getNumResult, MYSQLI_ASSOC);

    if(sizeof($getNumArr)==1)
        $num = 1;
    else{
        for ($x = 0; $x <sizeof($getNumArr); $x++) {
            if($x != sizeof($getNumArr)-1){
                if($getNumArr[$x]["name"] != $getNumArr[$x+1]["name"]){
                    $num = $num +1;
                }             
            }
        }
    }

    $allTasksSql = "SELECT progress FROM task";

    $allTasksResult = mysqli_query($conn, $allTasksSql);

    $allTasksArr = mysqli_fetch_all($allTasksResult, MYSQLI_ASSOC);

    foreach($allTasksArr as $arr){
        if($arr["progress"]!=0){
            $done = $done + $arr["progress"];

            $remain = 100 - $arr["progress"];
            $progressSum = $progressSum + $remain;
        }
    }

    $donePerc = $done / $num;
    $progPerc = $progressSum / $num;
    $nsPerc = 100 - ($donePerc + $progPerc);

    $percSql = "INSERT INTO percantage VALUES ('$date', '$donePerc', '$progPerc', '$nsPerc', '$num') ";

    $percResult = mysqli_query($conn, $percSql);


    //getting last version of the progress
    $sql = 'SELECT * FROM percantage WHERE updateDate = (SELECT MAX(updateDate) FROM percantage)';
    
    //make query and get result
    $result = mysqli_query($conn, $sql);

    $perc = array();

    //$check = mysqli_fetch_all($result, MYSQLI_ASSOC);

        while($row = mysqli_fetch_assoc($result)){
            $perc[] = $row;
        }
    
        echo json_encode($perc);
    