set -e
git checkout dev
git pull
git checkout staging
git merge origin/dev
git push
git checkout prod
git merge origin/staging
git push
git checkout dev
