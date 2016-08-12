# A Git Flow for Agile Teams

[⟵ Take me back to the homepage](/README.md)

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
