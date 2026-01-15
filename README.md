# ElisaBot

Este é um chatbot inspirado no clássico **ELIZA (1966)**, feito para estudos de **JavaScript**.  
Ele não segue exatamente o algoritmo original, mas usa **funções assíncronas** para responder a partir de palavras-chave e manter uma conversa contínua, como se estivesse realmente ouvindo você.

---

## Por que este projeto?

- Aprender **JavaScript na prática**: manipulação de arrays, objetos, loops e lógica de respostas.  
- Entender como funcionam **chatbots simples** e o básico de **processamento de linguagem natural**.  
- Servir de base para **evoluções futuras**, como analisar frases completas e criar respostas mais inteligentes.

---

## O que ele faz?

- Responde dinamicamente com base em **palavras-chave** que você digita.  
- Mantém o **diálogo ativo**, sempre pronto para continuar a conversa.  
- Estrutura **simples e modular**, fácil de expandir ou modificar.

---

## Como ele funciona

1. Você digita qualquer frase.  
2. A frase é dividida em **palavras individuais**.  
3. Cada palavra é verificada em um **switch**, procurando correspondências em nosso banco de palavras (`rules`).  
4. Cada palavra-chave tem um objeto com:  
   - `word`: apenas para identificar.  
   - `responses`: array com respostas possíveis.  
   - O bot usa o **índice do array** para escolher a resposta, não o nome da palavra.  
5. Para cada palavra encontrada, ele escolhe **uma resposta aleatória**.  
6. Se nenhuma palavra corresponde, ele retorna uma **resposta genérica** pré-definida.

(Isso é meio contra intuitivo, pois torna as respostas hardcoded, o próximo passo é possibilitar adição de frases dinamicamente sem depender do index fixo no switch)

---

## Como rodar

1. Tenha uma máquina **Windows** (isso vai mudar no futuro).  
2. Instale o [Node.js](https://nodejs.org/).  
3. No terminal, execute:
   
```bash
node elisa-anya.js
