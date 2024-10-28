<?php
function sendJsonResponse($status, $message) {
    echo json_encode(['status' => $status, 'message' => $message]);
    exit;
}

function generateUuidV4(): string
{
    try {
        $data = random_bytes(16);
    } catch (Exception $e) {
        sendJsonResponse('error', 'Erreur lors de la génération d\'octets aléatoires : ' . $e->getMessage());
    }

    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

    return sprintf('%s-%s-%s-%s-%s',
        bin2hex(substr($data, 0, 4)),
        bin2hex(substr($data, 4, 2)),
        bin2hex(substr($data, 6, 2)),
        bin2hex(substr($data, 8, 2)),
        bin2hex(substr($data, 10, 6))
    );
}
