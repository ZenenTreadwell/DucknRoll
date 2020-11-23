#!/bin/bash

if [ -f "DJANGO_SERVER_PID" ]; then
    kill <DJANGO_SERVER_PID
    rm DJANGO_SERVER_PID
fi

podman stop postgis
podman rm postgis
