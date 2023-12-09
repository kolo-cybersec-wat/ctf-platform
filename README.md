# CTF platform

Platform for handling submissions for Capture the Flag competitions organized by CyberSecurity Club at Military University of Technology, Warsaw Poland.

Technologies:
* python >= 3.11
* django
* vite, react, typescript
* tailwind
* docker

## Getting started

`docker compose up -f compose.local.yml --build --force-recreate`

`docker compose up -f compose.prod-like.yml --build --force-recreate`


## Goals

* Users self sign up
* Users can choose competition and register a team
* Teams need to be approved
* System can handle submissions and generate statistics
* System should have admin panel

## Current status

- Competition
  - [x] Competitions list
  - [x] About competition view (markdown)
  - [x] **Admin can register teams**
  - [ ] Team self registration
  - [x] Submitting flags view
  - [x] Basic stats view
  - [ ] Making flag submission UI reactive
- Registration
  - [x] Admin user can register other users
  - [ ] Self registration
  - [x] **Login**
  - [ ] Password reset etc.