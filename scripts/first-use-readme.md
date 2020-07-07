# procédure d'installation

Fermez vscode s'il est ouvert, et ouvrez une console powershell.

Executez la commande suivante :
```powershell 
Invoke-WebRequest https://deno.land/x/install/install.ps1 -useb | Invoke-Expression
```

Relancez la console et lancez le script suivant pour configurer votre VSCODE, l'IDE que nous utiliserons
```powershell 
./scripts/vscode-setup-must-to-have.ps1
```

Enfin si vous le souhaitez mais je vous le recommande vivement, lancez le script sivant afin d'améliorer votre expérience avec VSCODE
```powershell 
./scripts/vscode-setup-addons.ps1
```

vous pouvez lancer vscode, à présent.
