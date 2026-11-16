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
$identifier = '';

if (isset($_GET['registered']) && $_GET['registered'] === '1') {
    $success = 'Η εγγραφή ολοκληρώθηκε με επιτυχία. Μπορείτε τώρα να συνδεθείτε.';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $identifier = trim($_POST['identifier'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($identifier === '' || $password === '') {
        $errors[] = 'Παρακαλώ συμπληρώστε όλα τα πεδία.';
    } else {
        $stmt = $pdo->prepare('SELECT id, username, email, password FROM users WHERE email = :identifier OR username = :identifier LIMIT 1');
        $stmt->execute([':identifier' => $identifier]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            session_regenerate_id(true);
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];

            header('Location: dashboard.php');
            exit;
        } else {
            $errors[] = 'Μη έγκυρα στοιχεία σύνδεσης. Ελέγξτε το email/όνομα χρήστη και τον κωδικό.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="el">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Σύνδεση | Jobify</title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="auth-page">
    <main class="auth-container">
        <div class="auth-card">
            <a class="auth-back" href="index.html">← Επιστροφή στην αρχική</a>
            <h1>Σύνδεση</h1>
            <p class="auth-subtitle">Εισάγετε τα στοιχεία σας για να συνεχίσετε.</p>

            <?php if ($success !== ''): ?>
                <div class="auth-alert auth-alert-success" role="alert">
                    <?php echo htmlspecialchars($success, ENT_QUOTES, 'UTF-8'); ?>
                </div>
            <?php endif; ?>

            <?php if (!empty($errors)): ?>
                <div class="auth-alert auth-alert-error" role="alert">
                    <ul>
                        <?php foreach ($errors as $error): ?>
                            <li><?php echo htmlspecialchars($error, ENT_QUOTES, 'UTF-8'); ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endif; ?>

            <form method="post" action="login.php" novalidate>
                <div class="auth-form-group">
                    <label for="identifier">Email ή όνομα χρήστη</label>
                    <input type="text" id="identifier" name="identifier" placeholder="Εισάγετε email ή όνομα χρήστη" required
                           value="<?php echo htmlspecialchars($identifier, ENT_QUOTES, 'UTF-8'); ?>">
                </div>

                <div class="auth-form-group">
                    <label for="password">Κωδικός πρόσβασης</label>
                    <input type="password" id="password" name="password" placeholder="Εισάγετε κωδικό πρόσβασης" required>
                </div>

                <button type="submit" class="auth-btn">Σύνδεση</button>
            </form>

            <p class="auth-footer-text">Δεν έχετε λογαριασμό; <a href="register.php">Εγγραφή</a></p>
        </div>
    </main>
</body>
</html>
