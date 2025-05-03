<?php
session_start();

if ($_SESSION['role'] !== 'Admin') {
    header('Location: login.php');
    exit;
}

echo '<h1>Admin Dashboard</h1>';
echo '<a href="logout.php">Logout</a>';
?>