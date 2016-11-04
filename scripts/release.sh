#!/bin/bash
scope="@covalent"

printf "\n\n******** COVALENT DATA ********\n"
printf "            !!! WARNING !!!\n"
printf "You are about to create an OFFICIAL release of covalent-data.\n"
printf "\nREMEMBER THE RULES:\n"
printf "* A PR should have been made from the develop branch to master OR\n"
printf "  from a hotfix branch.\n"
printf "* This PR should have been merged into master with no issues.\n"
printf "* In the case of a hotfix, this hotfix should be retroactively\n"
printf "  applied to develop and any working branches.\n\n"
printf "IMPORTANT: CHANGELOG.md and any other docs that need to be\n"
printf "updated manually should be done NOW if you haven't already!\n"
printf "\nAre you ready to make this commitment? [y/n] "
read goforit
if [ $goforit != 'y' ];
then
	printf "\nCome back when you are ready to COMMIT. (har har)\n"
	printf "Ok. I'll show myself out.  Tip your waiter.\n\n"
	exit 1
fi

printf "\nSwitching to master branch and updating..."
git checkout master
git pull

printf "Here is a list of current releases:\n"
git for-each-ref --format '%(tag)' refs/tags

printf "\nWhat is your new version number?  Remember:\n"
printf "X: Major release or breaking change\n"
printf "Y: Features\n"
printf "Z: Patch\n"
printf "\nNew version number [X.Y.Z]: "
read new

for existing in $(git for-each-ref --format '%(tag)' refs/tags); do
	if [ $new = $existing ];
	then
		printf "Sorry, this version number is already taken.\n\n"
		exit 1
	fi
done

printf "\nUpdating package.json with version number $new...\n"
node node/update.js $new

printf "\nCommitting new version number and CHANGELOG.md...\n"
git commit -am"Changing version number for release"

printf "\nAdding version tag $new...\n"
git tag $new

printf "\nPushing everything to github...\n"
git push --tags origin master

printf "\nRebasing develop with master version updates...\n"
git checkout develop
git pull
git merge origin/master
git commit -am "Update version number in pacakge.json to $new"
git push

printf "\nPublishing to NPM...\n"
npm login --scope=$scope
npm publish --access=public
npm logout

printf "\nDone! Bye.\n\n"
