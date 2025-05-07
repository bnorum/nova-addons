#!/bin/bash
ollama serve & 
sleep 2
node cors-proxy.js