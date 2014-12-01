#!/bin/bash
set -e
echo "Connecting to production server"

ssh root@178.62.64.58 'bash -s' < ssh_script.sh

