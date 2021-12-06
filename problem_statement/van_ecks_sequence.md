La règle ici est que l'on commence par un élément A1, et chaque fois que l'on arrive à un nombre que l'on n'a pas vu auparavant, le terme suivant est un 0. Mais si le nombre An est apparu précédemment dans la séquence, alors on compte le nombre de termes depuis la dernière apparition de An, et ce nombre est le terme suivant.

Pour une série commençant avec A1 égal à 0, la série sera :

Terme 1 : Le premier terme est 0.
Terme 2 : Comme nous n'avons pas vu 0 auparavant, le deuxième terme est 0.
Terme 3 : Puisque nous avons déjà vu un 0, un pas en arrière, le troisième terme est 1.
Terme 4 : Comme nous n'avons jamais vu de 1 auparavant, le quatrième terme est 0.
Terme 5 : Puisque nous avions vu un 0 auparavant, deux pas en arrière, le cinquième terme est 2.

Entrée
Ligne 1 : un seul nombre entier A1 qui est le premier élément de la séquence.
Ligne 2 : un entier N représentant la nième position d'un élément de la séquence qui doit être affiché en sortie.

Sortie
Un seul entier qui est le Nième élément de la séquence.

Contraintes
0 ≤ A1 ≤ 200
1 ≤ N ≤ 1000000

## Tests

### Not seen

Entrée
0
2

Sortie
0

### Seen Before

Entrée
0
3

Sortie
1

### A little long

Entrée
1
58

Sortie
11

### Longer

Entrée
10
5692

Sortie
7

###  A little stress

Entrée
1
56804

Sortie
29

###  Stress Check

Entrée
0
1000000

Sortie
34143