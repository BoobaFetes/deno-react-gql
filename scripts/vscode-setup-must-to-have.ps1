write-host "installation des packages pour le développement server (DENO + extensions)"
Invoke-WebRequest https://deno.land/x/install/install.ps1 -useb | Invoke-Expression
deno install --allow-read --allow-run --allow-write --allow-net -f --unstable https://deno.land/x/denon@v2.2.0/denon.ts
code --install-extension denoland.vscode-deno

write-host "installation des packages pour débugger dans les navigateurs"
code --install-extension msjsdiag.debugger-for-chrome
code --install-extension firefox-devtools.vscode-firefox-debug

write-host "installation des packages vscode pour le développement Front (React, GraphQL, prettier, eslint, etc.)"
code --install-extension dbaeumer.vscode-eslint
code --install-extension ms-vscode.vscode-typescript-tslint-plugin
code --install-extension esbenp.prettier-vscode
code --install-extension kumar-harsh.graphql-for-vscode
code --install-extension apollographql.vscode-apollo
code --install-extension mikestead.dotenv

write-host "installation des packages vscode pour partager (gitlens, dévelopement de groupe à distance, markdown linter, etc.)"
code --install-extension eamodio.gitlens
code --install-extension ms-vsliveshare.vsliveshare
code --install-extension ms-vsliveshare.vsliveshare-audio
code --install-extension ms-vsliveshare.vsliveshare-pack
code --install-extension DavidAnson.vscode-markdownlint

write-host "installation des packages vscode pour les tests unitaires (Test explorer, Jest, etc.)"
code --install-extension Orta.vscode-jest
code --install-extension firsttris.vscode-jest-runner
code --install-extension monastic-panic.jest-runner
code --install-extension hbenl.vscode-test-explorer

Write-Host "Veuillez fermer toutes les instances de VSCODE avant de les réouvrir"