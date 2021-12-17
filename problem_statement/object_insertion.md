## Objectifs

Vous avez un objet à insérer dans une grille 2D partiellement remplie.

Vous devez compter le nombre de façons dont l'objet peut s'insérer dans les zones vides de la grille.
S'il n'y a qu'une seule et unique façon, vous devez également afficher la grille avec l'objet inséré.
Les renversements et les rotations ne sont PAS autorisés sur l'objet.

L'objet est représenté par une série de chaînes de caractères, dans lesquelles les points "." représentent les zones vides et les étoiles "*" les parties physiques de l'objet.

Example:
*.
**
.*

La grille est fournie de manière similaire, les points "." sont des zones vides et les signes numériques "#" sont des zones remplies de la grille.

Notes :
- La représentation de l'objet ne présente jamais de lignes ou de colonnes vides.
- Les dimensions de l'objet sont toujours inférieures ou égales aux dimensions de la grille.

---

## Énnoncé

### Entrée
First line: Two integers a and b separated by a space, denoting the numbers of rows and columns of the representation of the object.
Next a lines: Line of length b composed of the characters "." and "*".
Next line: Two integers c and d separated by a space, denoting the numbers of rows and columns of the grid.
Next c lines: Line of length d composed of the characters "." and "#".


### Sortie
First line: Number of ways to insert the object in the grid.
If this number equals 1:
Next c lines: Line of length d composed of the characters ".", "#" and "*", showing grid state after object insertion.

### Contraintes
1 ≤ a ≤ c ≤ 10
1 ≤ b ≤ d ≤ 10




Traduit avec www.DeepL.com/Translator (version gratuite)

---
## Tests

###  Example

Entrée
3 2
.*
**
.*
8 10
#..#######
#.##..####
###..##...
####.#####
##.#######
##......##
##.....###
########..

Sortie
1
#..#######
#.##*.####
###**##...
####*#####
##.#######
##......##
##.....###
########..

### No solution

Entrée
3 3
*..
***
..*
5 6
.#####
..#.##
#...##
##.###
##....

Sortie
0

### Multiple solutions

Entrée
1 2
**
4 4
.#.#
##..
....
##.#

Sortie
4

### No place for dot

Entrée
1 1
*
4 5
#####
#####
#####
#####

Sortie
0

###  Empty smallest grid

Entrée
5 3
***
*..
**.
..*
**.
5 3
...
...
...
...
...

Sortie
1
***
*..
**.
..*
**.

###  Fragmented object

Entrée
4 4
.*..
*...
...*
..*.
5 8
........
...#####
...#####
###.....
###.....

Sortie
1
........
..*#####
.*.#####
###.*...
###*....

###   Lot of solutions

Entrée
2 3
*..
***
10 10
..........
.##...#...
......#...
..........
..##....#.
..........
....#.....
.#........
.#.......#
..........

Sortie
42