<?php
$cmd = "hello";
for ($i = 0; $i < strlen($cmd); $i++) {
  @$codex .= chr(1^ ord($cmd[$i]));
}
echo $codex;

echo "<hr>";



for ($i=0; $i<strlen($codex); $i++){
   @$cmds .= chr(1 ^ ord($codex[$i]));
}

echo $cmds;
echo "<hr>";

?>
