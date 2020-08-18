<?php
    //connect to database
    $conn = mysqli_connect('localhost', 'root', '', 'jotform');

    //check the connection
    if(!$conn){
        echo 'Connection error: ' . mysqli_connect_error();
    }

    //getting last version of the progress
    $sql = 'SELECT * FROM percantage WHERE updateDate = (SELECT MAX(updateDate) FROM percantage)';
    
    //make query and get result
    $result = mysqli_query($conn, $sql);

    $perc = array();

    while($row = mysqli_fetch_assoc($result)){
        $perc[] = $row;
    }

    echo json_encode($perc);