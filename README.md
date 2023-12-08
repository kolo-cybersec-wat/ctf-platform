# CTF platform

Platform for handling submissions for Capture the Flag competitions organized by CyberSecurity Club at Military University of Technology, Warsaw Poland.

Technologies:
* python >= 3.11
* django
* reactivated.io
* react, typescript
* tailwind
* docker

## Getting started

`docker compose up --build --force-recreate`


## Goals

* Users self sign up
* Users can choose competition and register a team
* Teams need to be approved
* System can handle submissions and generate statistics
* System have admin panel

## Current status

- Competition
  - [x] Competitions list
  - [x] About competition view (markdown)
  - [ ] **Admin can register teams**
  - [ ] Team self registration
  - [x] Submitting flags view
  - [x] Basic stats view
  - [ ] Making flag submission UI reactive
- Registration
  - [x] Admin user can register other users
  - [ ] Self registration
  - [ ] **Login**
  - [ ] Password reset etc.