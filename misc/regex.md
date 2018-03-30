# Regular Expressions

We can use regular expressions for both matching and capturing values.

## Matching values

`.` matches **any character or sequence of characters** (except line breaks).

---

`?` marks the preceding character as **optional**: matches between 0 and 1 of the preceding token. e.g.:

`/Hello?/` matches both `Hell` and `Hello`.
`/He(llo)?/` matches both `He` and `Hello` but not `Hell`.

---

`g`: Global search flag, once it finds an occurrence it keeps looking for more matches (if the flag is ON) or just stops there (if OFF).

`/Hello/` will match any number of occurrences.

---

`\`: escaping character, if i need to match a period instead of using the wildcard, I need to escape it as follows:

`/\./` will only match a period.
`/./` will match any character or sequence of characters (wildcard).

---

`[]`: character classes, use a character class to specify a list of characters to match ONE of, e.g.

`/gr[ae]y/` will match both `grey` and `grey`.

---

`+`, plus symbol: matches one or more of the preceding token. e.g.

`/g+/` we will be matching as many `g`'s as possible: both `gg` and `gggggggg`.

**Greedy search:** the `+` symbol is greedy, meaning it's gonna try to match as much as it can, e.g.

`/H.+H/` matches `Hello world H` but also `Hello world Hello H`.

This means it's gonna try to match as many capital Hs as it possibly can until there are no more remaining.

**Don't be greedy:** as soon as you find an `H` (in the previous example) cut off, you are done. You can achieve this by doing: `/H.+?H/`.

---

`*`, star symbol: will match zero or more occurrences of the preceding token.

---

`|`, alternation symbol: the pipe is the equivalent to the logical OR

`/gr(a|e)y\` will match both `grey` and `grey`.
`/(https?|ftp):\/\//.+` matches either `http(s)` or `ftp` followed by any single character repeated one or more times.

---

`^`, caret symbol: matches the beginning of a string.

---

`$` matches the end of the string. Limits what we are searching for (useful for file extensions). e.g.

`/\.jpg$/` matches `.jpg` only when it occurs at the end of the string.

---

`m`, multiline flag: when we are working with the beginning and the end of the string, we want to make sure this flag is ON.

`/^H/gm`

---

`\d` means any digit from 0 to 9.

You can also pass in some arguments:

* `/\d{3}/` to match 3 occurrences of the preceding token.
* `/\d{3,4}/` where 3 is the minimum and 4 the maximum.

---

`\w` matches any letter. This equals: `/[a-zA-Z]/` which looks for any lowercase a to z or any uppercase A to Z.

---

`\s` matches line breaks, spaces and tabs.

---

* `\r` = carriage return
* `\n` = new lines
* `\s` = space characters
* `\w` = word character
* `\d` = digits 0-9

---

`[]` = character class

`/[^abc]/` means: look for any character that is NOT a, b or c.

## Capturing values

Consider the following example:

```
/(^.+(jpg|gif|png)$)/
 |   |_____v_____| |
 |        $2       |
 |________v________|
          $1
```

`$x` always corresponds to whatever was within **parenthesis**.

* `$1` will match the whole filename.
* `$2` will match the file extension.

**Note that it starts from the outside and it works its was in.**

If we are just using parenthesis for boundaries and don't need to match whatever is inside, use `?:` which means DO NOT CAPTURE.

**Example: Search and Replace.** Given:

```
<pre class="html" name="code">
```

Find:

```
<pre class="([^"]+)" name="code">
```

This means: anything that is not a closing quotation mark repeating one or more times.

Replace with: `[$1]`.

Search and replace in PHP: `preg_replace`.

# Regex Cheatsheet

* Good tester: http://www.regexr.com/
* Cheat sheet: http://ole.michelsen.dk/tools/regex.html

```
| = or
(ab|ba)
() = capture
(Java|Ecma)Script
(?:Java|Ecma)Script => don't care about capture

// negated character classes
[^g-z]
// shortcuts
\W = [^\w]
\D = [^\d]
\S = [^\s]

/#\w{3,6}/g = hex
#123ABC
#abc

hello6jkhkjhkjh987
2020-01-32

Ranges
[\w-] = word characters + hyphens
\s = whitespace =~[\t\r\n]
\d = [0-9] (not decimals)

// no look behind in javascipt (does not effect match position
// look ahead - when not followed by
a(?!b)
ab ac
// look ahead
(what is want a that is followed by a b, but do not match the b)
look aheads can contain capture groups
a(?=b)
ab

\B - non-word boundary = between \w and \w or \W and \W
\b = boundary (useful for checking if string is in list) (between \w and \W)
/^ = beginning of line
$/ = end of line
/^hello$/ = match only hello on a line (use /m for multi line)

hello
[-+]?\d*(?:\.\d+)?
15
134.2020
-.2000
.293
20


\w = [a-zA-Z0-9_]
[a-z]
[a-z0-9_]
// most characters do not need escaping in range

Sets
[abc]
[abc]+ // 1 or more of any of thses

// regex = greey -> '?' turns off greedyness
a{0,1} a? => 0 to 1
a{1,} a+ => 1 to many
a{0,} a* => 0 to many
aaaaaaaaaaaa (a{12})
{} = quatifier
```
