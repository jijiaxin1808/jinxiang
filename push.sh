git checkout master
git merge dev-jjx
yarn build
git push
git checkout dev-jjx
yarn start