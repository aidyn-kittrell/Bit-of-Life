<?php
session_start();

if ($_SESSION['role'] !== 'Admin') {
    header('Location: login.php');
    exit;
}

require 'database.php';

// Fetch analytics data
$usersCount = $conn->query("SELECT COUNT(*) AS count FROM users")->fetch_assoc()['count'];
$gamesPlayed = $conn->query("SELECT COUNT(*) AS count FROM game_sessions")->fetch_assoc()['count'];
$topUsers = $conn->query("SELECT username, COUNT(game_sessions.id) AS games_played 
                          FROM users 
                          JOIN game_sessions ON users.id = game_sessions.user_id 
                          GROUP BY username 
                          ORDER BY games_played DESC 
                          LIMIT 5")->fetch_all(MYSQLI_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
    </style>
</head>
<body>
    <h1>Admin Dashboard</h1>
    <p><a href="logout.php">Logout</a></p>

    <h2>Analytics</h2>
    <p>Total Users: <?= $usersCount ?></p>
    <p>Total Games Played: <?= $gamesPlayed ?></p>

    <h3>Top Users</h3>
    <table>
        <thead>
            <tr>
                <th>Username</th>
                <th>Games Played</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($topUsers as $user): ?>
                <tr>
                    <td><?= htmlspecialchars($user['username']) ?></td>
                    <td><?= $user['games_played'] ?></td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
    google.charts.load('current', {packages: ['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        const data = google.visualization.arrayToDataTable([
            ['Username', 'Games Played'],
            <?php foreach ($topUsers as $user): ?>
                ['<?= htmlspecialchars($user['username']) ?>', <?= $user['games_played'] ?>],
            <?php endforeach; ?>
        ]);

        const options = {
            title: 'Top Users by Games Played',
            pieHole: 0.4,
        };

        const chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
</script>

<div id="chart_div" style="width: 900px; height: 500px;"></div>

    <h2>Admin Actions</h2>
    <form method="POST" action="suspend_user.php">
        <label for="user_id">Suspend/Ban User (Enter User ID):</label>
        <input type="number" name="user_id" id="user_id" required>
        <button type="submit">Suspend/Ban</button>
    </form>
</body>
</html>