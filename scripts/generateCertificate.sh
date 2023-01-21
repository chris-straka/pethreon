#!/bin/sh

# You need to install openssl for this to work

# This creates an x509 certificate called cert.pem "privacy enhanced mail" and a private key
# -new creates a new CSR "Certificate Signing Request"
openssl req -new -newkey ed25519 -x509 -days 365 -keyout key.pem -out cert.pem
