<?php

    function leader_newTask($submissions){
        //connect to database
        $conn = mysqli_connect('localhost', 'root', '', 'jotform');

        //check the connection
        if(!$conn){
            echo 'Connection error: ' . mysqli_connect_error();
        }

        $memberName;
        $title;
        $task;
        $progress;
        $status;
        $description;
        $deadline;
        $progress = 0;
        $status = 1;

        $length = sizeof($submissions);
        $flag = 0;


        foreach($submissions[0]["answers"] as $denemeArr){
            if(isset($denemeArr["name"]) && $denemeArr["name"]=="pleaseEnter6"){
                if(isset($denemeArr["answer"])){
                    //the task will be added to database
                    $task = $denemeArr["answer"];
                    // echo $task . "<br>";
                }
            }else if((isset($denemeArr["name"]) && $denemeArr["name"]=="pleaseEnter7")){
                if(isset($denemeArr["answer"])){
                    //the description will be added to database
                    $description = $denemeArr["answer"];
                    // echo $description . "<br>";
                }
            }else if((isset($denemeArr["name"]) && $denemeArr["name"]=="pleaseSelect")){
                if(isset($denemeArr["prettyFormat"])){
                    //the deadline will be added to database
                    $deadline = $denemeArr["prettyFormat"];
                    //  echo $deadline . "<br>";
                }
            }else if((isset($denemeArr["name"]) && $denemeArr["name"]=="whoAre9")){
                if(isset($denemeArr["answer"])){
                    $memberName = $denemeArr["answer"];
                    //echo $memberName . "<br>";

                    /////////////////////////////////////////////////////////////////////**** DATABASE TIME ****///////////////////////////////////////////////////////////

                    $checkSql = 'SELECT * FROM task ORDER BY name';

                    //make query and get result
                    $checkResult = mysqli_query($conn, $checkSql);
                
                    //fetch the resulting rows as an array
                    $info = mysqli_fetch_all($checkResult, MYSQLI_ASSOC);
                
                    foreach($info as $firstArray){
                        if($firstArray["assignedTo"] == $memberName && $firstArray["name"] == $task)
                        {
                            $flag = 1;
                        }
                    }
                    if($flag==0){
                        //get the title
                        $titleSql = "SELECT title FROM team WHERE name='$memberName'";
            
                        $titleResult = mysqli_query($conn, $titleSql);
            
                        $resArray = mysqli_fetch_row($titleResult);
            
                        $title=$resArray[0];


                        // //adding to database
                        $sql1 = "INSERT INTO task (name, assignedTo, progress, status, description, deadline, title) VALUES ('$task', '$memberName', '$progress', '$status', '$description', '$deadline','$title')";

                        $sqlResult = mysqli_query($conn, $sql1);
                    }
                }
            }
        }
    }
    function updateTask_leader($submissions){

        //connect to database
        $conn = mysqli_connect('localhost', 'root', '', 'jotform');

        //check the connection
        if(!$conn){
            echo 'Connection error: ' . mysqli_connect_error();
        }

        $taskWillBeUpdated;
        $fieldToUpdate;
        $name;
        $progress;
        $deadline;
        $descrip;
        foreach($submissions[0]["answers"] as $answersArray){
            if(isset($answersArray["name"]) && $answersArray["name"]=="pleaseSelect4"){
                if(isset($answersArray["answer"])){
                    $taskWillBeUpdated = $answersArray["answer"];
                }
            } else if(isset($answersArray["name"]) && $answersArray["name"]=="pleaseSelect10"){
                if(isset($answersArray["answer"])){
                    $fieldToUpdate = $answersArray["answer"];
                }
            } else if(isset($answersArray["name"]) && $answersArray["name"]=="assignThis"){
                if(isset($answersArray["answer"])){
                    $name = $answersArray["answer"];
                }
            } else if(isset($answersArray["name"]) && $answersArray["name"]=="progressOf"){
                if(isset($answersArray["answer"])){
                    $progress = $answersArray["answer"];
                }
            } else if(isset($answersArray["name"]) && $answersArray["name"]=="pleaseSelect18"){
                if(isset($answersArray["prettyFormat"])){
                    $deadline = $answersArray["prettyFormat"];
                }
            } else if(isset($answersArray["name"]) && $answersArray["name"]=="pleaseEnter19"){
                if(isset($answersArray["answer"])){
                    $descrip = $answersArray["answer"];
                }
            }
        }
        if($fieldToUpdate == "Assigned to"){

            $titleSql = "SELECT title FROM team WHERE name='$name'";
            
            $titleResult = mysqli_query($conn, $titleSql);

            $resArray = mysqli_fetch_row($titleResult);

            $title=$resArray[0];

            $assignSql = "UPDATE task SET assignedTo= '$name', title='$title' WHERE name='$taskWillBeUpdated'";

            //make query and get result
            $result = mysqli_query($conn, $assignSql);
                
        }else if($fieldToUpdate == "Progress"){
            $progress = $progress*20;

            $progressSql = "UPDATE task SET progress = '$progress' WHERE name='$taskWillBeUpdated'";

            $progResult = mysqli_query($conn, $progressSql);

        }else if($fieldToUpdate=="Description"){
            $descSql = "UPDATE task SET description = '$descrip' WHERE name='$taskWillBeUpdated'";

            $descResult = mysqli_query($conn, $descSql);

        }else if($fieldToUpdate=="Deadline "){
            $deadlineSql = "UPDATE task SET deadline = '$deadline' WHERE name='$taskWillBeUpdated'";

            $deadlineResult = mysqli_query($conn, $deadlineSql);
        }
    }

    function addMember_leader($submissions){

        //connect to database
        $conn = mysqli_connect('localhost', 'root', '', 'jotform');

        //check the connection
        if(!$conn){
            echo 'Connection error: ' . mysqli_connect_error();
        }

        $nameToAdd;
        $titleToAdd;
        foreach($submissions[0]["answers"] as $newMemberArray){
            if(isset($newMemberArray["name"]) && $newMemberArray["name"]=="nameOf"){
                if(isset($newMemberArray["answer"])){
                    $nameToAdd = $newMemberArray["answer"];
                }
            }else if(isset($newMemberArray["name"]) && $newMemberArray["name"]=="titleOf"){
                if(isset($newMemberArray["answer"])){
                    $titleToAdd = $newMemberArray["answer"];
                }
            }
        }

        $memberSql = "INSERT INTO team VALUES('$nameToAdd', '$titleToAdd')";

        $memberResult = mysqli_query($conn, $memberSql);
    }