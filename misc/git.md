# A Git Flow for Agile Teams

[⟵ Take me back to the homepage](/README.md)

---

**Git Flight Rules: https://github.com/k88hudson/git-flight-rules**

---

There are many usable Git workflows. Indeed, Git is really a tool for designing VCS workflows.

Just a heads up: this is by no means a normative document or an attempt to define the one true workflow. I've found this workflow to be productive and relatively painless, especially for teams that are still learning and transitioning towards a more Agile process.

## Feature Development

One possible Git feature development workflow consists of these steps:

1. Pull to update your local `develop` branch
2. Check out a feature branch
3. Do work in your feature branch, committing early and often
4. Rebase frequently to incorporate upstream changes
5. Interactive rebase (squash) your commits
6. Merge your changes with `develop`
7. Push your changes to the upstream

First, and while in your `develop` branch (`git checkout develop`), pull in the most recent changes:

```
git pull origin develop
```

This should never create a merge commit because we are never working directly in develop (or at least we shouldn't as all commits getting into develop should result from an approved and merged pull request).

Whenever you perform a pull, merge or rebase, make sure that you run tests directly afterwards. Git may not show any conflicts but that doesn’t mean that two changes are compatible. Also run tests before you commit (of course).

We begin with the topmost available story in our backlog. Let's say that it's "WEB-132: User Can Add A Comment To a Post". First, check out a feature branch named with the story id and a short, descriptive title:

```
git checkout -b feature/WEB-123-add-comments-to-posts
```

The id allows us to easily track this branch back to the story that spawned it. The title is there to give us humans a little hint as to what's in it.

Do some work on this branch, committing early and often (ie: whenever your tests pass).

Rebase against the upstream frequently to prevent your branch from diverging significantly:

```
git fetch origin develop
git rebase origin/develop
```

Once work on the feature is complete, you will have a branch with a lot of small commits like "Add comment form", "Hook up comment form to API", "Add some tests" and so on. This is useful while developing but larger, incremental commits are more easier to maintain. We will use an interactive rebase to squash them together.

We want the rebase to affect only the commits we've made to this branch, not the commits that exist on the upstream. To ensure that we only deal with the "local" commits, use:

```
git rebase -i origin/develop
```

Git will display an editor window with a list of the commits to be modified, something like:

```
pick 3dcd585 Add comment form
pick 9f5c362 Hook up comment form with API
pick dcd4813 Add some tests
pick 9ea48e3 Display comments on the post page
```

Now we tell Git what we to do. Change these lines to:

```
pick 3dcd585 Add comment form
s 9f5c362 Hook up comment form with API
s dcd4813 Add some tests
s 9ea48e3 Display comments on the post page
```

Save and close the file. This will squash these commits together into one commit and present us with a new editor window where we can give the new commit a message. We’ll use the story id and title for the subject and list the original commit messages in the body:

```
@TODO: Get example
```

Now, save and close your editor. This commit is now ready to be merged back into `develop`. First rebase against any recent changes in the upstream. Then merge your changes back into `develop`:

```
@TODO: Talk about PRs
```

To merge your PR you typically need to have:
* two approvals
* one green build

Finally, clean up obsolete branches (ie: remove merged in branches).

## Bug Fixes

Bug fixes will use the same workflow as feature work. Name your bugfix branch after the bug id and give it a descriptive name. Prefix the branch name with `bugfix/` to help you keep track of them, for instance: `bugfix/WEB-321-empty-comments-allowed`.

Do work in your bugfix branch, committing early and often. Rebase frequently against the upstream and again when you are finished. Then, use an interactive rebase to squash all the commits together. Use the bug id and title for the subject of the new commit. Include "BUG" or "BUGFIX" to make these commits easier to identify. For instance: `[BUGFIX] WEB-321: Empty Comments Should Not Be Allowed`.

## Git Log Style

Your Git commit log should be in the following format:

```
MBL-123 Story Title/Summary
<space>
Short description
```

## Commons Mistakes

* Unless you are absolutely sure of what you are doing, do not use `git pull` on branches other than `develop` and `rc`.
* Never force push to `develop`. You should rebase your changes, otherwise you'll wipe someone else's changes.
* -Unless you are squashing (or know exactly what you are doing), always use `git pull --rebase` to rebase your changes, not `git rebase`.-

## How to Resolve Conflicts During Rebase

When doing a `git pull --rebase`, if there's any conflict, it'll ask you to resolve it and continue.

1. Run `git status` to see the conflicting files
2. Resolve the conflict(s)
3. `git add` the resolved files
4. Once everything is resolved, do `git rebase --continue`

## Release Versions

Releasing versions means merging your `develop` branch into your `master` branch. This should only happen once the develop branch has been tested and is rock solid to go to production.

```
git fetch
git checkout develop && git reset --hard origin/develop
npm version [<newversion> | major | minor | patch]
git checkout master && git reset --hard origin/master
git merge develop
git push --tags && git push && git checkout develop && git push
```

## Semantic Versioning

Given a version number `MAJOR.MINOR.PATCH`, increment the:

1. `MAJOR` version when you make incompatible API changes,
2. `MINOR` version when you add functionality in a backwards-compatible manner, and
3. `PATCH` version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata [are available](https://docs.npmjs.com/cli/version) as extensions to the `MAJOR.MINOR.PATCH` format.

See the [Semantic Versioning](http://semver.org/) specification for more information.

## Flow chart: So you have a mess on your hands...

[![Git Pretty](./git.png)](http://justinhileman.info/article/git-pretty/)

## Git Commands Overview

### Global setup

```
git config --global user.name "Federico Knüssel"
git config --global user.email federico.knussel@orbitz.com
```

### Enable terminal color

```
git config --global color.ui true
```

### Setting up custom editor for squashing / merging

```
git config --global core.editor <editor>
```

Options are: `gedit`, `emacs`, `vi` or `nano`. The default editor is `vi`.

If you just need to set this temporarily, omit the `global` keyword.

### Clone a repository

```
git clone https://fknussel@stash.orbitz.net/scm/android/android.git
```

### Initialize Git repo on an existing working directory

```
git init
```

### View the status of a repository

```
git status
```

### Stage files that have been modified and deleted

```
git add --all
```

### Stage files that have been deleted

```
git rm <filename>
```

### Interactive staging

```
git add -i
```

### Commit your staged changes

```
git commit -m "Add README file"
```

### What's the `HEAD` of a branch?

`HEAD` is a pointer to the latest commit in your current branch. You can use the keyword `HEAD` as a shortcut to refer to the latest commit instead of using its SHA code.

### View the commits for a particular branch

```
git log
git log --oneline
```

### View just the commits that modified a particular file

```
git log -- <filename>
```

### Go back to a particular commit

```
git checkout <sha>
```

**Heads up!** Stash or commit your changes before doing this.

### See what has changed in a local file against the same file in `origin/master`

```
git diff origin/master <filename>
git diff origin/master
```

If the file is not committed and just staged, you don't need to give the fully qualified path for the filename.

### Reset Soft vs Reset Hard

What `git reset origin/master` does is basically to undo the commit and leave all of the changes in an un-staged state.

On the other hand, `git reset --hard origin/master` will reset to a previous commit but will also get rid of all of your local changes.

### Adding alternative remotes

```
git remote add personal https://fknussel@stash.orbitz.net/scm/~fknussel/android.git
```

### View info on remotes

```
git remote -v
```

### Delete / clean up remote aliases 

```
git remote rm <remote>
```

### Create a new local branch based off an existing remote branch

```
git fetch origin
git checkout -b <your-new-branch> origin/<existing-remote-branch>
```

### Delete a branch in remote repo

```
git push <remote> :remoteBranchName
```

### Rebase off the latest code periodically

```
git fetch -f <remote>
git rebase <remote>/<branch>
```

### Send changes to remote repository

```
git push <remote> <branch>
```

### Push changes from local branch to a different remote branch 

```
git push <remote> <local-branch-name>:<remote-branch-name>
```

### View all branches (local and remote) for a repo

```
git branch -a
```

### Delete a local branch

```
git branch -D DROID-123
```

### Create a new branch

```
git branch DROID-123
```

### Switch to another branch in repository

```
git checkout DROID-123
```

### Create a new branch and switch to it, all at once

```
git checkout -b DROID-123
```

### Forcefully push squashed / amended commits

```
git push -f personal DROID-123
```

### Cherry pick one or more commits and apply them to `HEAD`

```
git cherry-pick <commit>
```

### Show all tags in the repo

```
git tag
```

### Show the details of a particular tag

```
git show v<tag>
```

### Squashing multiple commits into a single one (interactive rebasing)

Squashing multiple commits into a single commit will overwrite history, and should be done with caution. However, this is useful when working in feature branches. To squash the last N commits of the current branch, run the following command (with `{N}` replaced with the number of commits that you want to squash):

```
git rebase -i HEAD~{N}
```

Upon running this command, an editor will open with a list of these N commit messages, one per line. Each of these lines will begin with the word `pick`. Replacing `pick` with `squash` or `s` will tell Git to combine the commit with the commit before it. To combine all N commits into one, set every commit in the list to be squash except the first one. Upon exiting the editor, and if no conflict arises, git rebase will allow you to create a new commit message for the new combined commit.

### What are the different ways you can refer to a commit?

In Git each commit is given a unique hash. These hashes can be used to identify the corresponding commits in various scenarios (such as while trying to checkout a particular state of the code using the `git checkout {hash}` command).

Additionally, Git also maintains a number of aliases to certain commits, known as refs. Also, every tag that you create in the repository effectively becomes a ref (and that is exactly why you can use tags instead of commit hashes in various git commands). Git also maintains a number of special aliases that change based on the state of the repository, such as `HEAD`, `FETCH_HEAD`, `MERGE_HEAD`, etc.

Git also allows commits to be referred as relative to one another. For example, `HEAD~1` refers to the commit parent to `HEAD`, `HEAD~2` refers to the grandparent of HEAD, and so on. In case of merge commits, where the commit has two parents, `^` can be used to select one of the two parents, e.g. `HEAD^2` can be used to follow the second parent.

And finally, refspecs. These are used to map local and remote branches together. However, these can be used to refer to commits that reside on remote branches allowing one to control and manipulate them from a local Git environment.

### Typical workflow for working on a new feature

Developer already has a local repository and a personal Git repository setup and developer needs to work on a feature during a sprint. This use case can be reused for every new feature.

Fetch the newest code from upstream:

```
git fetch origin
```

Create a new branch in your local repository with the ticket name:

```
git checkout -b jira-123 origin/master
```

Ensure there aren't any files that differ from the HEAD of the upstream master, (if needed) reset working tree to origin/master:

```
git status
git reset --hard origin/master
```

Do some work and remember to commit early and often!

```
git status
// For new files only
git add <filename>
// For committing individual files
git commit <filename> -m "jira-id: a brief message about what you've done"
// To commit all modified files
git commit -am "jira-id: a brief message about what you've done"
```

Periodically merge with the upstream repository and rebase your local repository changes after any upstream changes:

```
git fetch -f origin
git rebase origin/master
```

In simple words, `git rebase` allows one to move the first commit of a branch to a new starting location. For example, if a feature branch was created from master, and since then the master branch has received new commits, git rebase can be used to move the feature branch to the tip of master. The command effectively will replay the changes made in the feature branch at the tip of master, allowing conflicts to be resolved in the process. When done with care, this will allow the feature branch to be merged into master with relative ease and sometimes as a simple fast-forward operation.

If there is a conflict you will see a message as follows, you have to manually do the merge and commit it:

```
CONFLICT (content): Merge conflict in SOME_FILE_OF_YOURS
Failed to merge in the changes.
Patch failed at 0001 forget upstream rebase needed
```

When you have manually resolved this problem run:

```
git rebase --continue
```

If you would prefer to skip this patch, instead run:

```
git rebase --skip
```

To check out the original branch and stop rebasing run:

```
git rebase --abort
```

Periodically push changes to your personal fork:

```
git push personal jira-123
```

Be careful when issuing a git pull command. In cases where your feature branch is based off an older commit in the parent branch, this can cause the creation of a merge commit. A merge commit occurs when when two previous commits are merged together to form a new commit. This new commit has two parent commits instead of one. This makes pulling changes out of a branch (when necessary) difficult. Following the instructions above, especially rebase, should avoid these issues.

# Simple Workflow

`git help config` pass in any git command for help
`git init` initialises an empty Git repository, that is, creates a hidden `.git` folder
`git status` to see what has changed since the last commit
`git add --all`
`git commit -m "Message"`
`git commit -a -m "Message` = add all + commit
`git log` timeline history
`git diff` shows unstained differences since last commit
`git diff --staged` shows which lines have changed in staged files
`git commit --amend -m "Change commit message"` whatever has been staged is added to the last commit.
`git commit --amend --no-edit` change commit content w/o changing its message
`git remote show origin`

## Branches

`git branch` list all local branches
`git branch -r` list all remote branches`
`git branch feature/blah`
`git checkout feature/blah`
`git checkout -b feature/blah` creates the branch + checks it out
`git merge feature/blah` from the target branch

## Unstage file

`git reset HEAD README.md` upstages the README file, HEADS refers to the last commit.

## Discard changes on last commit

`git checkout -- README.md` blows away all changes since last commit

## Rollback last commit

`git reset --soft HEAD^`

Undoes last commit and puts changes back into staging (KEEPS changes)

`git reset --hard HEAD^`

Undoes last commit and also DISCARDS all changed files.

`git reset --hard HEAD^2`

Blows away the last 2 commits (`HEAD^n` blows away the last `n` commits).

## Tags

`git tag` lists all tags
`git checkout v1.0.0` check outs tag
`git tag -a v1.0.1 -m "Fix some bugs"` adds new tag
`git push && git push --tags` make sure to push tags otherwise tags will remain local

## Talking to the remote

There are just two ways to communicate to the remote: `git fetch` and `git push`. We are not including `git pull` here b/c `git pull = git fetch + git merge`.

What `git fetch` does is go to the remote (GitHub, BitBucket, whatever) and brings down any changes BUT does not merge them.

`git rebase` does three things:

1. All of the commits in `master` which are not in `origin/master` are moved to a temporary area.
2. Applies all of the commits in `origin/master` to `master`
3. Applies all of the commits in the temporary area back to `master`

## Merge vs Rebase

Merge creates a merge commit.

---

# An enterprise Git flow

## Classification

* Main branches: `master`, `develop`
* Supporting branches: `feature/x`, `bugfix/x`, `hot fix/x`, `release/x`

## Lifetime
`develop` and `master` are the only two branches with an infinite lifetime. Feature and Bugfix branches are temporary and live only until they get merged in to `develop`.

## Contents
`origin/master`: source code of `HEAD` always reflects a production-ready state of the application.

`origin/develop`: source code of `HEAD` always reflects a state with the latest changes for the next release.

## Intent
`origin/develop` is an **integration branch**. We always merge feature and bugfix branches to `develop`.

`origin/master` is a release branch. Each time changes are merged into `master`, this is a production release by definition. This allows for CD.

## CI/CD

We can configure a Git hook script to automatically build and rollout our application to our production servers every time we get a commit on `master`.

We can also deploy to our staging environment every time a new commit lands on `origin/develop`.

## Feature and Bugfix Branches

* May branch off: `develop`
* Must merge back into: `develop`
* Naming convention: `feature/x`, `bugfix/x`

This includes bug fixes which are not hot fixes to prod.

Feature branch
	-> pull request
	-> merge back into develop: `git merge --no-ff`
	-> remove feature branch from remote

## Release Branches

* May branch off: `develop`
* Must merge back into: `develop` and `master`
* Naming convention: `release/x` or `release-x`

When to branch off `develop`? When it (almost) reflects the desired state of the new release.

After branching off `develop`, we assign a version number.

Release branches allow for meta-data preparation for the release (i.e. bump version number) but **we don't tag here**.

```
git checkout -b release-1.2 develop
./bump-version.sh 1.2
git commit -m "Bump version 1.2"
```

This release branch may exist for a while as bug fixes are applied here (**and not directly on `develop`**). Do not introduce new features on a release branch.

Finishing a release branch:

1) Merge release branch into `master`.
2) The merge commit in `master` must be tagged. **This first tag happens in `master`.**
3) Merge release branch into `develop`.
4) Remove release branch.

## Hotfix Branches

* May branch off: `master` (it actually branches off a tag in `master` that marks the prod version we need to patch)
* Must merge back into: `develop` and `master`
* Naming convention: `hotfix/x` or `hotfix-x`

These sort of branches arise from the need to act immediately upon a **critical bug on production**.

Their aim is to prepare for an unplanned production release. In the meantime, people can keep working on the `develop` branch.

```
git checkout -b hotfix-1.2.1 master
./bump-version.sh 1.2.1
git commit -a -m "Bump v1.2.1"
```

Note how we bump a new version immediately before branching off (we don't create a new tag just yet, though).

Finishing a hot fix branch:

1) Merge back into `master`.
2) Tag into master.
3) Merge into `develop` to safeguard that the bugfix is included in the next release as well.

```
git checkout master
git merge --no-ff hot fix-1.2.1
git tag -a 1.2.1

git checkout develop
git merge --no-ff hotfix-1.2.1
```

4) Remove the temporary branch from the remote.

