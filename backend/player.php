<?php
session_start();

if ($_SESSION['role'] !== 'Player') {
    header('Location: login.php');
    exit;
}

echo '<h1>Player Dashboard</h1>';
echo '<a href="logout.php">Logout</a>';
?>