<?php

    

    function chiffrement($texte)
    {
        echo "<p>Chiffrement ! </p>";
        $texte_chiffre = $texte;
        $cle = "CyberSecurite";
        echo "<p>Longueur : ".strlen($texte)."</p>";
        for($i=0 ; $i<strlen($texte) ; $i++)
        {
            //echo "<p>i : ".$i."</p>";
            $texte_chiffre[$i] = $texte[$i] ^ $cle[$i%strlen($cle)];
            //echo "<p>CHIFFREMENT DE ".htmlspecialchars($texte[$i])." : ".htmlspecialchars($texte_chiffre[$i])."</p>";
        }
        return $texte_chiffre;
    }


    $req_methode = $_SERVER['REQUEST_METHOD'];
    echo "LA METHODE : ".$req_methode;
    switch($req_methode)
    {
        case 'GET' :
            break;
        case 'POST' :
            print_r($_POST);
            if(isset($_POST['journal']))
            {
                echo "On a recu le formulaire d'envoi d'un message !";
                $message_journal_lumineux = "<L1><PA><".$_POST['effetapparition']."><".$_POST['effetaffichage']."><".$_POST['dureeaffichage']."><".$_POST['effetdisparition'].">".$_POST['texte'];
                echo "<br />".htmlspecialchars($message_journal_lumineux);            
                $XORresult = $message_journal_lumineux[0];
                for($i = 1 ; $i<strlen($message_journal_lumineux) ; $i++)
                {
                    $XORresult = $XORresult ^ $message_journal_lumineux[$i];
                }
                $hex = sprintf('%02X', ord($XORresult));
                $message_journal_lumineux = "<ID00>".$message_journal_lumineux.$hex."<E>";
                echo  "<br />".htmlspecialchars($message_journal_lumineux)."<br />";
                
                if (!extension_loaded('sockets')) {
                    die('The sockets extension is not loaded.');
                }


                $socketUDP = socket_create (AF_INET, SOCK_DGRAM, 0 );
                //socket_bind($sock,"localhost");
                if($socketUDP!=false)
                {
                    echo '<p>Creation de la socket : OK</p>';
                    //printr($socketUDP);
                    echo '<p>Message a envoyé : '.$message_journal_lumineux.'</p>';
                    echo '<p>Longueur du message a envoyé : '.strlen($message_journal_lumineux).'</p>';
                    $message_journal_lumineux_chiffre = $message_journal_lumineux;
                    //$message_journal_lumineux_chiffre = chiffrement($message_journal_lumineux);
                    echo "<p>Message chiffre : ".htmlspecialchars($message_journal_lumineux_chiffre)."<p>";
                    $nbOctetsEmis = socket_sendto($socketUDP, $message_journal_lumineux_chiffre, strlen($message_journal_lumineux_chiffre), 0, $_POST["journal"], 3999);
                    echo '<p>nombre d octets emis : '.$nbOctetsEmis.'</p>';
                    fclose($socketUDP);
                }
                            

            }
            break;
    }


?>