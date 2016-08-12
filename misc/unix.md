# Unix, Bash and Command Line (Terminal) Usage

[← Take me back to the homepage](/README.md)

## What shortcuts can I use to speed up my work on the command line?

Sometimes while working with long commands, you need to move the cursor to the start or end of the command. The traditional method of using arrow keys seems very slow in these cases. The faster alternative is to press `Ctrl+A` to send the cursor to beginning of the command, or `Ctrl+E` to send the cursor to the end of the command. Also, use the combination of `Ctrl+right arrow key` to move forward one word at a time, and `Ctrl+left arrow key` to move backwards one word at a time.

Writing names for existing files or directories while on the command line can be made faster by using the Tab key extensively. Just type in the starting few characters from the name of the file and then hit Tab. If these characters match only a single existing file or folder, the name will get autocompleted for you; otherwise options are displayed, in which case you can complete the name by typing a few more characters (to make the these initial characters unique) and hitting Tab again.

Everybody knows that the `clear` command can be used to clear the terminal screen, but for this you have to type and run this command from the prompt. If you do not want to run the clear command, `Ctrl+L` can be used to clear the screen while retaining whatever was there on the current prompt.

Using the mouse on command line for cut-copy-paste operations is not always advised. A quick text cut on the command line can be achieved by using `Ctrl+K` (make sure to place cursor at the beginning of the text to cut), while paste can be done using `Ctrl+Y`.

## Command History

Bash remembers a history of the commands you type into it. You can use the up and down arrow keys to scroll through commands you've recently used. The `history` command prints a list of these commands, so you can pipe it to grep to search for commands you've used recently.

```
3785  ls
3786  clear
3787  vagrant up
```

You can even use this associated id to execute these commands again:

```
!3787
```

Sometimes you may want to re-run a complex/long command that you executed a while ago. Usually we use the up and down arrow keys to search previously run commands. To speed things up, reverse search can be used. Just press `Ctrl+R` and write few characters from the start of command you're looking for. If you still don't get the required result, try pressing `Ctrl+R` repeatedly to loop through the results.

## Is there any shortcut to run a previously run command with root privileges?

Yes. You can refer to last command you run with `!!` and use `sudo` before it.

## What's special about files/directories whose name begins with a dot (`.`)?

There are certain files in Linux which store system-wide and user-specific configuration information. Usually these type of files start with a dot and are kept hidden. This means that these files are not visible if you do a simple `ls` in the directory where they reside. Run `ls -a` instead.

## Listing files within a directory

The `ls` command has a number of params:

* `-l` long format, displaying Unix file types, permissions, number of hard links, owner, group, size, last-modified date and filename
* `-f` do not sort. Useful for directories containing large numbers of files.
* `-F` appends a character revealing the nature of a file, for example, * for an executable, or / for a directory. Regular files have no suffix.
* `-a` lists all files in the given directory, including those whose names start with "." (which are hidden files in Unix). By default, these files are excluded from the list.
* `-R` recursively lists subdirectories. The command ls -R / would therefore list all files.

## Moving files between directories

Use the `mv` command with the filename first and the destination directory as the second argument:

```
mv README.md ../
```

## Renaming files

Use the same `mv` command for this:

```
mv my_filename.{old,new}
```

## Deleting files and directories

```
rm <filename>
```

Main options are:

* `-r`, `-R`, `--recursive` remove directories and their contents recursively.
* `-f`, `--force` ignore nonexistant files, and never prompt before removing.
* `-i` prompt before every removal.

By default, `rm` does not remove directories; `rmdir` does. However, if the `-r` (recursive) option is specified, `rm` will remove any matching directories and their contents.

Delete all files but those with a particular name / extension:

```
rm !(*.c|*.py)
```

## Creating empty files

```
touch <filename>
```

You can also create multiple files all at once:

```
touch new_file{1,2,3}
```

## Creating directories

```
mkdir <dirname>
```

## What's `~`?

The `~` character – also known as tilde – represents the current user's home directory. So, instead of typing `cd /home/name` to go to your home directory, you can type `cd ~` instead. This also works with relative paths – `cd ~/Desktop` would switch to the current user's desktop.

Side note: `cd` takes you straight to the user's home (that is, `cd` equals `cd ~`).

## What do `.` and `..` represent?

`.` represents the current directory and the `..` represents the directory above the current directory. So, `cd ..` goes up one level. These also work with relative paths – if you're in your Desktop folder and want to go to the Documents folder, which is in the same directory as the Desktop folder, you can use the `cd ../Documents` command.

## What does `pwd` do?

`pwd` echoes out the current working directory. In fact, it stands for "print working directory".

## What does the `|` (pipe) do?

Pipes allow you to send the output of a command to another command (streams). In the UNIX philosophy, each program is a small utility that does one thing well. For example, the `ls` command lists the files in the current directory and the grep command searches its input for a specified term. Combine these with pipes (the `|` character) and you can search for a file in the current directory.

```
ls | grep README
```

## What does the `*` (wildcard) do?

The `*` character is a wildcard that can match anything. For example, if we want to delete both `really long file name` and `really very long file name` from the current directory, we could run the following command:

```
rm really*name
```

If you run `rm *` instead, you'll delete every file in the current directory, so be careful.

## What does the `>` (output redirection) do?

The `>` character redirects a command's output to a file instead of another command (what the pipe does). For example, the following line runs the `ls` command to list the files in the current directory and, instead of printing that list to the terminal, it prints the list to a file named "file1" in the current directory:

```
ls > file1
```

This is useful for emptying files, too:

```
> ./logfile
```

## What is the difference between `>` and `>>` while using them on the command line?

Both `>` and `>>` are used to redirect output to a file. The difference is that `>` overwrites the existing content with new content while `>>` appends to existing content.

## What does `grep` do?

grep is a command-line utility for searching plain-text data sets for lines matching a regular expression. For instance, you can filter the output of the `ifconfig` command to find your private IP address easily using grep:

```
ifconfig | grep 192.168.
```

## What does `cat` do?

The cat program is a standard Unix utility that will output the contents of a specific file and can be used to concatenate and list files. The name is an abbreviation of catenate, a synonym of concatenate.

You can use `cat` to display the contents of a file:

```
cat /etc/passwd
```

... or of multiple files:

```
cat /etc/passwd /etc/hosts
```

You can also concatenate multiple files and store the result into a new file:

```
cat test test1 test2 > test3
```

## What if I want to read only the first or last few lines of a file?

You can use the `head` and `tail` commands for this.

```
tail -5 output
```

Here `tail` displays the last five lines from the file "output".

Similarly, there is a `head` command to display content from the beginning of a file.

```
head -10 output
```

## What does `less` do?

Sometimes I experience problems reading long files using cat, as the text scrolls past the screen before I can read it. To prevent this from happening you can use the `less` command. All you need to do is run the ‘cat' command in the following way:

```
cat <filename> | less
```

This will hold the output until you continuously press the Enter key on your keyboard. To exit from this mode, just press Q.

## What does `echo` do?

It is a built-in command that places a string on the computer terminal. Basically, echo repeats on the display screen whatever follows it on the command line. 

```
echo !! > script.sh
```

## What does `which` do?

`which` shows the full path of (shell) commands.

```
which node
```

returns `/usr/local/bin/node`.

## What's the `PATH` variable and why do we need it?

`PATH` is an environmental variable in Linux and other Unix-like operating systems that tells the shell which directories to search for executable files in response to commands issued by a user.

A list of all the current environmental variables and their values for the current user, including all the directories in the `PATH` variable, can be seen by running the `env` command without any options or arguments:

```
env
```

As there can be considerable output, it can be convenient to modify this command so that it displays just the PATH environmental variable and its value. This can be accomplished by using a pipe to transfer the output of `env` to the `grep` filter and use `PATH` as an argument to grep:

```
env | grep PATH
```

Another way to view the contents of just `PATH` alone is by using the `echo` command with `$PATH` as an argument:

```
echo $PATH
```

The dollar sign tells echo to output the value of the variable `PATH `rather than its name.

## How do you run a command in the background?

By default, Bash executes every command you run in the current terminal. That's normally fine, but what if you want to launch an application and continue using the terminal? If you type `firefox` to launch Firefox, it will take over your terminal and display error messages and other output until you close it. Add the `&` operator to the end of the command to have Bash execute the program in the background:

```
firefox &
```

## Conditional Execution

You can also have Bash run two commands, one after another. The second command will only execute if the first command completed successfully. To do this, put both commands on the same line, separated by a `&&` (double ampersand).

For example, the sleep command takes a value in seconds, counts down, and completes successfully. It's useless alone, but you can use it to run another command after a delay. The following command will wait five seconds, then launch the gnome-screenshot tool:

```
sleep 5 && gnome-screenshot
```

## How to switch between directories efficiently?

Working on Linux command line means switching between lot of directories. Say you are in a directory named `A`, then you move to another directory, say `B`. Now you want to come back to `A` again. Typing the complete directory path for `A` can be cumbersome at times. You can use the `cd -` shortcut instead.

## Finding files and directories

* Find all the files whose name is README.md in the current working directory:

```
find . -name README.md
```

* Find all the README.md files in the /home directory ignoring capitalization:

```
find /home -iname README.md
```

* Find all directories system-wide whose name is workspace:

```
find / -type d -name workspace
```

* Find all of the php files:

```
find . -type f -name "*.php"
```

* Find all files system-wide that are 50 MB:

```
find / -size 50M
```

* Find all the files system-wide that are greater than 50 MB but less than 100 MB:

```
find / -size +50M -size -100M
```

* Find every .mp3 file system-wide that is more than 10 MB and delete them using a single command:

```
find / -type f -name *.mp3 -size +10M -exec rm {} \;
```

## Searching for files containing a particular string

Search inside all of the .c files within the current directory and output only those that are making use of `printf`:

```b
$ grep -l "printf" *.c
```

If we want to view the lines where the string is used, then we need to do:

```
$ find ./ -name "*.c" | xargs grep "printf"
```

## List all the processes on the box not being run by you

```
ps aux | grep -v `whoami`
```

## Killing processes

In order to kill a process, use the `ps` command to get the process id (PID) of the process you want to terminate and then issue a `kill` command for that PID.

## What does `ssh` do?

```
@TODO
```

## What does `telnet` do?

```
@TODO
```

## What does `scp` do?

```
@TODO
```

## What does `ping` do?

```
@TODO
```

## Bash Scripting Fundamentals

```
@TODO
```
