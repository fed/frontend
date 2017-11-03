# Command Line

Ctrl + A = beginning of line
Ctrl + E = end of line

`~` is the variable for the home directory

```
echo ~
```

Tab completion: tab twice to display all of the available options.

Clean up the terminal by using either Ctrl + L or running the command `clear`.

Manual: `man echo` displays information about commands. You exit by typing `q`).

`pwd` print out the current working directory.

`ls` list files in the `pwd`. You can pass in a directory `ls Documents` to list files in a specific directory. Or even pass in a list of directories: `ls Documents Downloads`. Since we can pass in space-separated values, we need to escape compound names by doing: `ls Some\ Directory` or `ls "Some Directory"`.

* `ls -l` displays details.
* `ls -a` display all files, even hidden ones.
* `ls -t` sorted by time they were last modified.
* Any combination of the commands above.

`..` one level up
`.` current directory

`open .` opens the current directory in Finder
`open README.md` uses the default app for markdown files
`open -a Atom README.md` uses the chosen app to open the file with
`open -R README.md` reveals file in Finder
`open https://google.com` opens the website using the default browser

`killall Finder` closes and re-opens Finder.

`touch README.md` creates a file named `README.md` in the current directory.
`mkdir assets` create a folder called `assets` in the current directory.

`cp README.md README.md.bak` if the new filename already exists, it will get overwritten.
`cp -r sourceFolder targetFolder`

`mv README.md targetFolder` move the README.md file to the targetFolder directory
`mv README.md targetFolder/NEW-README.md` move the file and also rename it at the same time.
`mv README.md NEW-README.md` renames file without moving it.
`mv file* targetFolder` using wildcards: this command will move `file1`, `fileBlah` and `second file` to the target directory.

`rm README.md` remove the file
`rmdir someFolder` this only works for empty folders.
`rm -r someFolder` recursively removes the folder and all its content

## Symbolic links

A symlink is a new file that points to another one. 

This is how you create one: `ln -s README.md RAWR.md`. If you rename the README file, the soft link gets broken.

This is what the symlink looks like when we list all the files of the directory with `ls -la`:

```
lrwxr-xr-x     1 fknussel  staff     9B 29 Oct 16:00 RAWR.md@ -> README.md
```

`cat README.md` echoes all the content of whatever file you pass to it. After creating a symlink, `cat RAWR.md` equals `cat README.md`.

`ln README.md HARD-RAWR.md` creates a HARD LINK. That means it doesn't matter if we rename the original `README.md` file, the hard link doesn't get destroyed.

## Finding files

`find . -type f` means: search the current directory for all files (files of type `file`).

`find . -name README' means: find all files in the current directory named "README'.

`find . -name *.txt` using wildcards.

`find . -size +2048` find all files weighing more than 1Mb. This is number of 512 bytes blocks.

`find . -mtime -1` find by last modification time. `-1` means 1 day old.

`find . -atime -1` find by last access time.

`find . -ctime -1` find by creation time.

`find . -iname *.txt -or -iname *.doc` we can also use `-and` and `-or` to refine our search conditions.

## Search files for content

`grep "Hello world" README.md` returns the line of the match

`grep -i "Hello world" README.md` case insensitive search.

`grep -il "Hello world" *` returns the name of the file, not the line.

`grep -ilr "Hello world" *` searches recursively through the current directory.

## Permissions

```
		   - rw- r-- r--
			|-|---|---|---|
			 A  B   C   D
```

A) `-` for a regular file, `d` for a directory
B) User permissions (`u`): first space corresponds to `r=read`, second space corresponds to `w=write`, third space corresponds to `x=execute`.
C) Group permissions (`g`): `r--` means that everyone else in the group can just read the file but neither can write on it or execute it.
D) Anyone else/others (`o`)

`a` stands for `all`.

`chmod g+w README.md` add write permissions to Group's users
`chmod a+x README.md` the plus (`+`) sign adds permissions
`chmod a-x README.md` the minus (`-`) sign removes permissions
`chmod og-x README.md`
`chmod g+x-w README.md`
`chmod g=rwx README.md`
`chmod u=rw,g=,o=x README.md`
`chmod g= README.md` means no permissions

**Octal permissions:**

```
chmod 444 README.md
```

the first 4 is `u`
the second 4 is `g`
the third 4 is `o`

* 4 stands for READ
* 2 stands for WRITE
* 1 stands for EXECUTE
* 0 takes away any permissions

For example: 7 = 4 + 2 + 1 = READ + WRITE + EXECUTE

## Redirecting standard output/error

```
echo "Hello world" > README.md
cat README.md // echoes "Hello world"
echo "new line" >> README.md
cat README.md // echoes "Hello world\nnew line"
echo "Start fresh" > README.md // overwrites the original file
```

Piping: sending the standard output of one program to the standard input of another.

```
cat README.md | grep "No such"
```

Returns all the lines in the README file having "No such" in them.

Another piping example: returns hidden files only. Since `.` is an special character, we need to escape it.

```
ls -a | grep "\."
```

## Managing Processes

`top`: takes continuous samples of processes running on your Mac. Type lowercase `q` to exit.

`top -o cpu`: orders them all by cpu usage (DESC).

`ps -cx`: process status. Doesn't take continuous samples, rather a snapshot.

`ps -cvx`: returns more info.

`ps -cvx | grep "Google"` looks for processes that match "Google" (Google Chrome, Google Chrome Helper, etc.)

**Signals** just force a process to stop and respond to the signal. There are two useful signals:

* `ten`: short for terminate, a process will finish when it gets this signal.
* `kill`: force quit, this signal cannot be ignored. If an app crashes and it won't respond to "Force quit" from the UI, we can use the `kill` signal from the command line. The way it works is: `kill pid`, where `pid` is the process id we are trying to kill.

@TODO: `killall`?

## curl

* FTP, HTTP
* Grabs the content of a remote file. We can also use it to scrape web pages or download files or hit an API/Web Service.

```
curl https://google.com > google-index.html
curl -O http://10.0.1.201/simple.html # creates a local copy of simple.html
curl -of http://10.0.1.201/fake.html # grabs the content only if the remote file exists. If we don't use this option, we'd get a standard 404 page as a result.
```

## .sh (Bash) files

```
#! /bin/bash
```

Where `/bin/bash` is the path to the interpreter.

This means: "Hey, use Bash to execute this code". **This basically makes it equivalent to typing it all in the terminal.**

Moving the .sh file to `/usr/local/bin` makes it always accessible so that I don't need to remember where the file is. Also make sure to `chmod +x` it to make it executable:

```
chmod +x something.sh
sudo cp something.sh /usr/local/bin
```

## Path variable

```
echo $PATH
```
