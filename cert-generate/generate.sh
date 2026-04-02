#!/bin/sh

set -u

CERT_DIR="certs"
PASSFILE="$CERT_DIR/.passhash"

echo "Validando se a pasta certs existe..."
if [ ! -d "$CERT_DIR" ]; then
  echo "Pasta certs não encontrada. Criando pasta certs..."
  mkdir -p "$CERT_DIR"
else
  echo "Pasta certs já existe. Continuando..."
fi

should_regen=0

# compute passphrase hash (empty string if not provided)
passphrase_val="${JWT_PRIVATE_KEY_PASSPHRASE:-}"
passhash=$(printf "%s" "$passphrase_val" | openssl dgst -sha256 2>/dev/null | awk '{print $2}')

echo "Instalando openssl..."
apk add --no-cache openssl >/dev/null 2>&1 || true

if [ "${FORCE_REGEN:-0}" = "1" ]; then
  echo "FORCE_REGEN=1 definido — forçando regeneração dos certificados."
  should_regen=1
fi

if [ ! -f "$CERT_DIR/private.key.pem" ] || [ ! -f "$CERT_DIR/public.key.pem" ]; then
  echo "Arquivos de certificado não encontrados — será gerado um novo par."
  should_regen=1
else
  # if passhash file exists, compare
  if [ -f "$PASSFILE" ]; then
    oldhash=$(cat "$PASSFILE" 2>/dev/null || echo "")
    if [ "$oldhash" != "$passhash" ]; then
      echo "Passphrase atual diferente da anterior — será regenerado o par de chaves."
      should_regen=1
    fi
  fi

  # verify that the private key can be decrypted with the current passphrase
  if [ "$should_regen" -eq 0 ]; then
    echo "Verificando se a chave privada pode ser decifrada com a passphrase atual..."
    # try to read as PKCS#8 encrypted key
    if ! openssl pkcs8 -in "$CERT_DIR/private.key.pem" -passin env:JWT_PRIVATE_KEY_PASSPHRASE -nocrypt -out /dev/null 2>/dev/null; then
      # fallback: try legacy RSA format
      if ! openssl rsa -in "$CERT_DIR/private.key.pem" -passin env:JWT_PRIVATE_KEY_PASSPHRASE -check -out /dev/null 2>/dev/null; then
        echo "A chave privada não pôde ser decifrada com a passphrase atual — será regenerado o par."
        should_regen=1
      fi
    fi
  fi
fi

if [ "$should_regen" -eq 1 ]; then
  echo "Gerando novos certificados..."
  # ensure openssl is available
  apk add --no-cache openssl >/dev/null 2>&1 || true

  # generate encrypted private key (PKCS#1 with aes256)
  openssl genrsa -aes256 -passout env:JWT_PRIVATE_KEY_PASSPHRASE -out "$CERT_DIR/private.key.pem" 4096

  # generate public key
  openssl rsa -pubout -in "$CERT_DIR/private.key.pem" -passin env:JWT_PRIVATE_KEY_PASSPHRASE -out "$CERT_DIR/public.key.pem"

  # store passphrase hash to detect future changes
  printf "%s" "$passhash" > "$PASSFILE"

  echo "Certificados gerados com sucesso."
else
  echo "Certificados existentes válidos — nenhuma ação necessária."
fi

exit 0