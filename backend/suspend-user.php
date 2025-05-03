<?php
require 'database.php';
session_start();

if ($_SESSION['role'] !== 'Admin') {
    header('Location: login.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = intval($_POST['user_id']);

    // Suspend user by deleting their account
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    if ($stmt->execute([$userId])) {
        echo "User with ID $userId has been suspended.";
    } else {
        echo "Error suspending user.";
    }
}
?>
<p><a href="admin_dashboard.php">Back to Dashboard</a></p>