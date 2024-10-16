#!/bin/sh

/wait-for-it.sh db:5432 -- bun run start
