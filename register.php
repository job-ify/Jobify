<?php
declare(strict_types=1);
session_start();

if (isset($_SESSION['user_id'])) {
    header('Location: dashboard.php');
    exit;
}

require_once __DIR__ . '/config.php';

$errors = [];
$success = '';
$username = '';
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';

    if ($username === '' || $email === '' || $password === '' || $confirm_password === '') {
        $errors[] = 'Όλα τα πεδία είναι υποχρεωτικά.';
    }

    if ($username !== '' && (mb_strlen($username) < 3 || mb_strlen($username) > 50)) {
        $errors[] = 'Το όνομα χρήστη πρέπει να έχει από 3 έως 50 χαρακτήρες.';
    }

    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Παρακαλώ εισάγετε έγκυρη διεύθυνση email.';
    } elseif ($email !== '' && mb_strlen($email) > 100) {
        $errors[] = 'Το email δεν μπορεί να υπερβαίνει τους 100 χαρακτήρες.';
    }

    if ($password !== '' && strlen($password) < 6) {
        $errors[] = 'Ο κωδικός πρόσβασης πρέπει να έχει τουλάχιστον 6 χαρακτήρες.';
    }

    if ($password !== $confirm_password) {
        $errors[] = 'Οι κωδικοί πρόσβασης δεν ταιριάζουν.';
    }

    if (empty($errors)) {
        $stmt = $pdo->prepare('SELECT id FROM users WHERE username = :username OR email = :email LIMIT 1');
        $stmt->execute([
            ':username' => $username,
            ':email' => $email,
        ]);
        $existing = $stmt->fetch();

        if ($existing) {
            $errors[] = 'Το όνομα χρήστη ή το email χρησιμοποιείται ήδη.';
        } else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $insert = $pdo->prepare('INSERT INTO users (username, email, password) VALUES (:username, :email, :password)');
            $insert->execute([
                ':username' => $username,
                ':email' => $email,
                ':password' => $hashedPassword,
            ]);

            header('Location: login.php?registered=1');
            exit;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="el">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Εγγραφή | Jobify</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="auth-page">
    <main class="auth-container">
        <div class="auth-card">
            <a class="auth-back" href="index.html">← Επιστροφή στην αρχική</a>
            <h1>Δημιουργία λογαριασμού</h1>
            <p class="auth-subtitle">Συμπληρώστε τα στοιχεία σας για να εγγραφείτε.</p>

            <?php if (!empty($errors)): ?>
                <div class="auth-alert auth-alert-error" role="alert">
                    <ul>
                        <?php foreach ($errors as $error): ?>
                            <li><?php echo htmlspecialchars($error, ENT_QUOTES, 'UTF-8'); ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <form method="post" action="register.php" novalidate>
                <div class="auth-form-group">
                    <label for="username">Όνομα χρήστη</label>
                    <input type="text" id="username" name="username" placeholder="Εισάγετε όνομα χρήστη" required
                           value="<?php echo htmlspecialchars($username, ENT_QUOTES, 'UTF-8'); ?>">
                </div>

                <div class="auth-form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Εισάγετε email" required
                           value="<?php echo htmlspecialchars($email, ENT_QUOTES, 'UTF-8'); ?>">
                </div>

                <div class="auth-form-group">
                    <label for="password">Κωδικός πρόσβασης</label>
                    <input type="password" id="password" name="password" placeholder="Εισάγετε κωδικό πρόσβασης" required>
                </div>

                <div class="auth-form-group">
                    <label for="confirm_password">Επιβεβαίωση κωδικού</label>
                    <input type="password" id="confirm_password" name="confirm_password" placeholder="Επαναλάβετε τον κωδικό" required>
                </div>

                <button type="submit" class="auth-btn">Εγγραφή</button>
            </form>

            <p class="auth-footer-text">Έχετε ήδη λογαριασμό; <a href="login.php">Σύνδεση</a></p>
        </div>
    </main>
</body>
</html>
