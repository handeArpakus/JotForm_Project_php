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
    $length = sizeof($getNumArr);
    if($length==1)
        $num = 1;
    else{
        for ($x = 0; $x <$length; $x++) {

            if($x != $length-1){
            
                if($getNumArr[$x]["name"] != $getNumArr[$x+1]["name"]){
                  
                    $num = $num +1;
                }             
            }else{
                if($getNumArr[$x]["name"] != $getNumArr[$x-1]["name"])
                    $num = $num +1;
            }
        }
    }
    // echo $num;
    $allTasksSql = "SELECT progress FROM task";

    $allTasksResult = mysqli_query($conn, $allTasksSql);

    $allTasksArr = mysqli_fetch_all($allTasksResult, MYSQLI_ASSOC);

    // echo json_encode($allTasksArr) . '<br>';

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

    $checkSql = "SELECT * FROM percantage WHERE updateDate = (SELECT MAX(updateDate) FROM percantage)";

    $checkResult = mysqli_query($conn, $checkSql);

    $checkArr = mysqli_fetch_all($checkResult, MYSQLI_ASSOC);
    $checking = 0;
    foreach($checkArr as $arr){
        if($arr["done"]==$donePerc && $arr["proc"]==$progPerc && $arr["notStarted"]==$nsPerc)
            $checking=1;
    }

    if($checking==0){
        $percSql = "INSERT INTO percantage(updateDate,done,proc, notStarted, tasks) VALUES ('$date', '$donePerc', '$progPerc', '$nsPerc', '$num') ";

        $percResult = mysqli_query($conn, $percSql);
    
        $PercArr = mysqli_fetch_all($percResult, MYSQLI_ASSOC);
    }


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
    