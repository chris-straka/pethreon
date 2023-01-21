#!/bin/sh

# I thought I needed this, turns out I didn't
openssl req -new -newkey ed25519 -x509 -days 365 -keyout key.pem -out cert.pem
