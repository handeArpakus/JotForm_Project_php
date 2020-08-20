<?php
    $wildcard = FALSE; // Set $wildcard to TRUE if you do not plan to check or limit the domains
    $credentials = FALSE; // Set $credentials to TRUE if expects credential requests (Cookies, 
    header("Content-Type: application/json; charset=utf-8");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Origin");
    header('P3P: CP="CAO PSA OUR"'); 
    header("Access-Control-Allow-Credentials: true");

            include "JotForm.php";
            include "submissions.php";

            //connect to database
            $conn = mysqli_connect('localhost', 'root', '', 'jotform');

            //check the connection
            if(!$conn){
                echo 'Connection error: ' . mysqli_connect_error();
            }
            
            $jotformAPI = new JotForm("548c664ca2fce5280313ba031de6e424");
    
            $forms = $jotformAPI->getForms(0, 1, null, null);
    
            $latestForm = $forms[0];
    
            $latestFormID = "202044141950039";


            $submissions = $jotformAPI->getFormSubmissions($latestFormID);
            
            foreach($submissions[0]["answers"] as $denemeArr){
                if(isset($denemeArr["name"]) && $denemeArr["name"]=="pleaseSelect3"){
                    if(isset($denemeArr["answer"]) && $denemeArr["answer"] == "Create a new task"){
                        leader_newTask($submissions);
                    }
                    else if(isset($denemeArr["answer"]) && $denemeArr["answer"] == "Update a task"){
                        updateTask_leader($submissions);
                    }else if(isset($denemeArr["answer"]) && $denemeArr["answer"] == "Add a team member")
                        addMember_leader($submissions);
                }
            }

            //echo json_encode($submissions);
            
    
            $sqlFinal = 'SELECT * FROM task ORDER BY name';
    
            $resultFinal = mysqli_query($conn, $sqlFinal);
    
            $infoFinal = array();

            while($row = mysqli_fetch_assoc($resultFinal)){
                $infoFinal[] = $row;
            }

            echo json_encode($infoFinal);
?>