<?php
    $wildcard = FALSE; // Set $wildcard to TRUE if you do not plan to check or limit the domains
    $credentials = FALSE; // Set $credentials to TRUE if expects credential requests (Cookies, 
    header("Content-Type: application/json; charset=utf-8");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Origin");
    header('P3P: CP="CAO PSA OUR"'); 
    header("Access-Control-Allow-Credentials: true");

    //if ($method=='GET')
    //{
        // try {
            include "JotForm.php";
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
            
            $jotformAPI = new JotForm("548c664ca2fce5280313ba031de6e424");
    
            $forms = $jotformAPI->getForms(0, 1, null, null);
    
            $latestForm = $forms[0];
    
            $latestFormID = "202044141950039";
            $submissions = $jotformAPI->getFormSubmissions($latestFormID);
            $length = sizeof($submissions);
            $flag = 0;
    
            foreach($submissions[0]["answers"] as $denemeArr){
                if(isset($denemeArr["name"]) && $denemeArr["name"]=="pleaseEnter6"){
                    if(isset($denemeArr["answer"])){
                        //the task will be added to database
                        $task = $denemeArr["answer"];
                        $flag=1;
                        //echo $task . "<br>";
                    }
                }else if((isset($denemeArr["name"]) && $denemeArr["name"]=="pleaseEnter7")){
                    if(isset($denemeArr["answer"])){
                        //the description will be added to database
                        $description = $denemeArr["answer"];
                        //echo $description . "<br>";
                    }
                }else if((isset($denemeArr["name"]) && $denemeArr["name"]=="pleaseSelect")){
                    if(isset($denemeArr["answer"])){
                        //the deadline will be added to database
                        $deadline = $denemeArr["answer"];
                        //echo $deadline . "<br>";
                    }
                }else if((isset($denemeArr["name"]) && $denemeArr["name"]=="whoAre9")){
                    if(isset($denemeArr["answer"])){
                        //the name(assignedTo) will be added to database
                        $memberName = $denemeArr["answer"];
                        //echo $memberName . "<br>";
    
                    }
                }else if((isset($denemeArr["name"]) && $denemeArr["name"]=="pleaseWrite")){
                    if(isset($denemeArr["answer"])){
                        //the name(assignedTo) will be added to database
                        $title = $denemeArr["answer"];
                        //echo $title . "<br>";
    
                        /////////////////////////////////////////////////////////////////////**** DATABASE TIME ****///////////////////////////////////////////////////////////
    
                        $sql = 'SELECT * FROM info ORDER BY assignedTask';
    
                        //make query and get result
                        $result = mysqli_query($conn, $sql);
                    
                        //fetch the resulting rows as an array
                        $info = mysqli_fetch_all($result, MYSQLI_ASSOC);
                    
                        foreach($info as $firstArray){
                            if($firstArray["name"] != $memberName && $firstArray["assignedTask"] != $task)
                            {
                                $flag=1;
    
                            }else{
                                $flag=0;
                            }
                        }
                        if($flag==1){
                            // //adding to database
                            $sql1 = "INSERT INTO info (name, title, assignedTask, progress, status, description) VALUES ( '$memberName' , '$title', '$task', '$progress', '$status', '$description')";
    
                            // //make query and get result
                            if (mysqli_query($conn, $sql1)) {
                                //echo "New record created successfully";
                            } else {
                                    //echo "Error: " . $sql1 . "<br>" . mysqli_error($conn);
                            }
                        }else{
                            //echo "There is the same data in the database". "<br>";
                        }
                    }
                }
            }
    
            $sqlFinal = 'SELECT * FROM info ORDER BY assignedTask';
    
            //make query and get result
            $resultFinal = mysqli_query($conn, $sqlFinal);
    
            $infoFinal = array();

            while($row = mysqli_fetch_assoc($resultFinal)){
                $infoFinal[] = $row;
            }

            echo json_encode($infoFinal);
    
?>