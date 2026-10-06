import shutil, os, sys

src = "BCC LOGO.png"
dst = r"frontend\public\brand\logo-bcc.png"

if not os.path.exists(src):
    print(f"ERREUR: Fichier source introuvable: {src}")
    sys.exit(1)

os.makedirs(os.path.dirname(dst), exist_ok=True)
shutil.copy2(src, dst)
print(f"OK: Copie reussie -> {dst}")
print(f"Taille: {os.path.getsize(dst)} octets")
