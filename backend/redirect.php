<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}

if ($_SESSION['role'] === 'Admin') {
    header('Location: admin_dashboard.php');
    exit;
} else {
    header('Location: player_dashboard.php');
    exit;
}
?>