@echo off
start cmd /k "ollama serve"
timeout /t 2 > nul
start cmd /k "node cors-proxy.js"
