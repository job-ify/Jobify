<?php
declare(strict_types=1);
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}

$username = $_SESSION['username'] ?? 'Χρήστης';
?>
<!DOCTYPE html>
<html lang="el">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Πίνακας ελέγχου | Jobify</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="auth-page">
    <main class="auth-container">
        <div class="auth-card auth-dashboard-card">
            <a class="auth-back" href="index.html">← Επιστροφή στην αρχική</a>
            <h1>Καλώς ήρθατε, <?php echo htmlspecialchars($username, ENT_QUOTES, 'UTF-8'); ?>!</h1>
            <p class="auth-subtitle">Έχετε συνδεθεί με επιτυχία στον λογαριασμό σας.</p>

            <div class="auth-actions">
                <a href="index.html" class="auth-btn auth-btn-secondary">Μετάβαση στην αρχική</a>
                <form method="post" action="logout.php">
                    <button type="submit" class="auth-btn auth-btn-danger">Αποσύνδεση</button>
                </form>
            </div>
        </div>
    </main>
</body>
</html>
