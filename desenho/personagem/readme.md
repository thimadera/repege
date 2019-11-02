# Personagem

[Clique aqui para voltar](https://github.com/oshThiago/repege#repege)

## Características padrões

> O criador do RPG deve escolher as características `obrigatórias` e as possibilidades (quando houver), considerando as opções abaixo:

Característica | Tipo | Obs
|-|-|-|
Nome completo | `string` | `required` 
Identidade de gênero | [ Gênero ](#identidades-de-gênero) |
Orientação sexual|[ Orientação ](#orientações-sexuais)
Data de nascimento | `date` | `required` 
Idade | `number` | `readonly` 
Aparência | `file[]` |
História | `string` |
Profissão|[ Profissão ](#profissões)
Meta| `string` 
Motivação| `string` 
Personalidade| [ Personalidade ](#personalidade)
Atitudes e comportamentos| `string[]` 
Gostos e preferências| `string[]` 

## Características opcionais

> Algumas características são opcionais e quem decide se elas estarão disponíveis ou não, tanto quanto as suas opções e detalhes, é o criador do RPG, serão elas:

* Raça
* Poderes
* Classe
* Atributos 
    * Atributos são características definidas por pontuação. O criador do RPG deve definir quais são as características, suas pontuações e o número máximo de pontos que podem ser distribuídos
    * [ Atributos padrão ](#atributos)

## Características adicionais

> O criador do RPG pode escolher características adicionais para os jogadores do seu RPG, indicando se serão obrigatórias ou não

### Tipos de campos

* `string` 
* `date` 
* `number` 
* `file` 
* `array<T>` 

## Opções pré-selecionadas

### Identidades de gênero

* Homem cis
* Mulher cis
* Agênero
* Gênero fluido
* Homem trans
* Mulher trans
* Não-binário

### Orientações sexuais

* Heterossexual
* Homossexual
* Bissexual
* Pansexual
* Assexual

### Profissões

* Padeiro

### Personalidade

1. Traço dominante 1
2. Traço dominante 2
3. Traço contraditório

### Atributos
* Força
* Inteligência
* Sabedoria
* Carisma
* Destreza

Mais -> https://pt.wikihow.com/Ser-um-Bom-Jogador-de-RPG-por-Texto