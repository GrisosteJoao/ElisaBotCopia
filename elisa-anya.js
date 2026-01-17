const readline = require('readline');
const { exec } = require('child_process');
let input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function userPromise(dot) /// Cria uma Promise para capturar a entrada do usuário de forma assíncrona e retornar as palavras normalizadas
{
    return new Promise ((result) => {
        input.question(dot, (talk) => {
            let arr = talk
            .toUpperCase()
            .replace(/[^\w\s]/g, "")
            .split(/\s+/);
            result(arr);
        });
    });
}

async function userTalk() // Controla a fala do usuário: aguarda a digitação, limpa a tela, exibe a Elisa e retorna as palavras digitadas
{
    let speak = [];
    speak = await userPromise("> ");
    
    setTimeout(() => {
        process.stdout.write('\x1b[2J\x1b[0;0H');
        elisaAppear();
        process.stdout.write(`VOCE DIZ: ${speak.join(" ")}\n\n`);
    }, 1);
    
    return speak;
}

function elisaAppear() // Renderiza o ASCII ART da Elisa no terminal
{
        const elisa =`
    ⠀⠀⠀⠈⣿⠁⡘⠀⡌⡇⠀⡿⠸⠀⠀⠀⠈⡕⡄⠀⠐⡀⠈⠀⢃⠀⠀⠾⠇⠀⠀⠀⠀
    ⠀⠀⠀⠀⠇⡇⠃⢠⠀⠶⡀⡇⢃⠡⡀⠀⠀⠡⠈⢂⡀⢁⠀⡁⠸⠀⡆⠘⡀⠀⠀⠀⠀
    ⠀⠀⠀⠸⠀⢸⠀⠘⡜⠀⣑⢴⣀⠑⠯⡂⠄⣀⣣⢀⣈⢺⡜⢣⠀⡆⡇⠀⢣⠀⠀⠀⠀
    ⠀⠀⠀⠇⠀⢸⠀⡗⣰⡿⡻⠿⡳⡅⠀⠀⠀⠀⠈⡵⠿⠿⡻⣷⡡⡇⡇⠀⢸⣇⠀⠀⠀
    ⠀⠀⢰⠀⠀⡆⡄⣧⡏⠸⢠⢲⢸⠁⠀⠀⠀⠀⠐⢙⢰⠂⢡⠘⣇⡇⠃⠀⠀⢹⡄⠀⠀
    ⠀⠀⠟⠀⠀⢰⢁⡇⠇⠰⣀⢁⡜⠀⠀⠀⠀⠀⠀⠘⣀⣁⠌⠀⠃⠰⠀⠀⠀⠈⠰⠀⠀
    ⠀⡘⠀⠀⠀⠀⢊⣤⠀⠀⠤⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠤⠄⠀⢸⠃⠀⠀⠀⠀⠀⠃⠀
    ⢠⠁⢀⠀⠀⠀⠈⢿⡀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⢀⠏⠀⠀⠀⠀⠀⠀⠸⠀
    ⠘⠸⠘⡀⠀⠀⠀⠀⢣⠀⠀⠀⠀⠀⠀⠁⠀⠃⠀⠀⠀⠀⢀⠎⠀⠀⠀⠀⠀⢠⠀⠀⡇
    ⠀⠇⢆⢃⠀⠀⠀⠀⠀⡏⢲⢤⢀⡀⠀⠀⠀⠀⠀⢀⣠⠄⡚⠀⠀⠀⠀⠀⠀⣾⠀⠀⠀
    ⢰⠈⢌⢎⢆⠀⠀⠀⠀⠁⣌⠆⡰⡁⠉⠉⠀⠉⠁⡱⡘⡼⠇⠀⠀⠀⠀⢀⢬⠃⢠⠀⡆⠀`;

        console.log(elisa);
}

function elisaTalkingAnim(elisaspeak) // Exibe a fala da Elisa com animação letra por letra e efeito sonoro 
{
    let arr = []
    arr = elisaspeak.toUpperCase().split('');
    elisaAppear();
    process.stdout.write("ELISA DIZ: ")
    return new Promise (resolve => {
        for(let i = 0; i < arr.length; i++)
        {
                setTimeout(() => {    
                    process.stdout.write(`${arr[i]}`);
                    exec('powershell -c "[console]::beep(800,50)"');
                }, 120 * i);   
        }

        setTimeout(() => {
            console.log("\n")
            resolve();
        }, 120 * arr.length);
    });

}

async function elisaTalking(userTalk) // Monta a resposta da Elisa: reflexão + detecção de emoção + normalização da frase final
{
    let words = await userTalk;
    let elisareflection = await elisaReflection(words);
    let reflection = elisareflection.finalphrase;
    let otherwords = elisareflection.otherwords;

    let phrase = await emotionsFilter(otherwords);

    return phrase = await sentenceNormalizer(reflection.join(" ")) + "? " + phrase;
    
}

async function elisaReflection(words)  // Aplica regras de reflexão e separa palavras relevantes das descartáveis
{
    return new Promise ((result) => {
        
    const reflections = {
        "EU": "VOCE",
        "VOCE": "EU",

        "ME":"SE",

        "MEU": "SEU",
        "MINHA": "SUA",
        "MEUS": "SEUS",
        "MINHAS": "SUAS",

        "SEU": "MEU",
        "SUA": "MINHA",
        "SEUS": "MEUS",
        "SUAS": "MINHAS",

        "ESTOU": "ESTÁ",
        "ESTÁ": "ESTOU",
        "ESTAMOS": "ESTÃO",
        "ESTÃO": "ESTAMOS",

        "SOU": "É",
        "É": "SOU",
        "SOMOS": "SÃO",
        "SÃO": "SOMOS",

        "QUERO": "QUER",
        "QUER": "QUERO",

        "PRECISO": "PRECISA",
        "PRECISA": "PRECISO",

        "SINTO": "SENTE",
        "SENTE": "SINTO",

        "POSSO": "PODE",
        "PODE": "POSSO",

        "TENHO": "TEM",
        "TEM": "TENHO",

        "GOSTO": "GOSTA",
        "GOSTA": "GOSTO",

        "ACHO": "ACHA",
        "ACHA": "ACHO",

        "PENSO": "PENSA",
        "PENSA": "PENSO",

        "NOS":"VOCES"
    };


        let phrasereflections = [];
        let otherwords = [];
        let finalphrase = [];

        for (let i = 0; i < words.length; i++)
        {
            if (words[i] in reflections)
            {
                phrasereflections.push(reflections[words[i]]);
            }
            else if (!["ME", "TE", "SE", "NOS", "LHE", "LHES"].includes(words[i]))
            {
                otherwords.push(words[i]);
            }
        }

        finalphrase = phrasereflections.concat(otherwords);

        result({
            otherwords,
            finalphrase
        });
    });
}

async function emotionsFilter(otherwords)  // Detecta emoções a partir das palavras do usuário e retorna uma frase coerente com o estado emocional
{
    let allemotions = [];
    let draftemotion = "";
    let phrases = [];
    let draftphrase = "";

    const emotions = {

        "TRISTE": "TRISTEZA",
        "TRISTES": "TRISTEZA",
        "MAL": "TRISTEZA",
        "TRISTEZA": "TRISTEZA",
        "DEPRIMIDO": "TRISTEZA",
        "DEPRIMIDA": "TRISTEZA",
        "DESANIMADO": "TRISTEZA",
        "DESANIMADA": "TRISTEZA",
        "MELANCOLICO": "TRISTEZA",
        "MELANCOLICA": "TRISTEZA",
        "SOZINHO": "TRISTEZA",
        "SOZINHA": "TRISTEZA",

        "FELIZ": "FELICIDADE",
        "FELIZES": "FELICIDADE",
        "ALEGRE": "FELICIDADE",
        "ALEGRES": "FELICIDADE",
        "CONTENTE": "FELICIDADE",
        "CONTENTES": "FELICIDADE",
        "ANIMADO": "FELICIDADE",
        "ANIMADA": "FELICIDADE",
        "EMPOLGADO": "FELICIDADE",
        "EMPOLGADA": "FELICIDADE",

        "ANSIOSO": "ANSIEDADE",
        "ANSIOSA": "ANSIEDADE",
        "ANSIOSOS": "ANSIEDADE",
        "ANSIOSAS": "ANSIEDADE",
        "NERVOSO": "ANSIEDADE",
        "NERVOSA": "ANSIEDADE",
        "PREOCUPADO": "ANSIEDADE",
        "PREOCUPADA": "ANSIEDADE",
        "INSEGURO": "ANSIEDADE",
        "INSEGURA": "ANSIEDADE",

        "BRAVO": "RAIVA",
        "BRAVA": "RAIVA",
        "IRRITADO": "RAIVA",
        "IRRITADA": "RAIVA",
        "RAIVA": "RAIVA",
        "ODIOSO": "RAIVA",
        "ODIOSA": "RAIVA",

        "MEDO": "MEDO",
        "ASSUSTADO": "MEDO",
        "ASSUSTADA": "MEDO",
        "APAVORADO": "MEDO",
        "APAVORADA": "MEDO",

        "CONFUSO": "CONFUSAO",
        "CONFUSO" : "CONFUSO",
        "CONFUSA": "CONFUSAO",
        "PERDIDO": "CONFUSAO",
        "PERDIDA": "CONFUSAO",

        "CANSADO": "CANSACO",
        "CANSADA": "CANSACO",
        "EXAUSTO": "CANSACO",
        "EXAUSTA": "CANSACO"
    };

        for(let i = 0; i < otherwords.length; i++)
        {
            if(otherwords[i] in emotions)
            {
                allemotions.push(emotions[otherwords[i]]);

                
            }
        }

        
        if (allemotions.length > 0) {
            draftemotion = allemotions[Math.floor(Math.random() * allemotions.length)];
        } else {
            draftemotion = "NEUTRO";
        }


    switch (draftemotion)
    {
        case "TRISTEZA":
            phrases = [
                "PARECE QUE HÁ UM PESO EM SUAS PALAVRAS, QUER FALAR MAIS SOBRE ISSO?",
                "A TRISTEZA COSTUMA TER UMA HISTÓRIA, QUAL É A SUA?",
                "O QUE VOCÊ ACHA QUE CONTRIBUI PARA ESSE SENTIMENTO?"
            ];

            draftphrase = phrases[Math.floor(Math.random() * phrases.length)];
            return draftphrase;

        case "FELICIDADE":
            phrases = [
                "É BOM SENTIR FELICIDADE, O QUE TE FEZ CHEGAR A ESSE MOMENTO?",
                "ESSA FELICIDADE É ALGO QUE VOCÊ QUER MANTER?",
                "QUANDO VOCÊ SE SENTE ASSIM, O QUE MAIS VALORIZA?"
            ];

            draftphrase = phrases[Math.floor(Math.random() * phrases.length)];
            return draftphrase;

        case "ANSIEDADE":
            phrases = [
                "A ANSIEDADE COSTUMA VIR COM MUITOS PENSAMENTOS, QUAIS PASSAM PELA SUA MENTE?",
                "O QUE VOCÊ TEM MAIS DIFICULDADE EM CONTROLAR NESSE MOMENTO?",
                "SEU CORPO TAMBÉM SENTE ESSA ANSIEDADE?"
            ];

            draftphrase = phrases[Math.floor(Math.random() * phrases.length)];
            return draftphrase;

        case "RAIVA":
            phrases = [
                "A RAIVA NORMALMENTE ESCONDE OUTRO SENTIMENTO, QUAL VOCÊ ACHA QUE É?",
                "O QUE DESENCADEOU ESSA RAIVA EM VOCÊ?",
                "VOCÊ COSTUMA EXPRESSAR OU GUARDAR ESSA RAIVA?"
            ];

            draftphrase = phrases[Math.floor(Math.random() * phrases.length)];
            return draftphrase;

        case "MEDO":
            phrases = [
                "O MEDO COSTUMA PROTEGER, MAS TAMBÉM LIMITAR, DO QUE VOCÊ TEM MEDO?",
                "ESSE MEDO É ALGO RECENTE OU ANTIGO?",
                "O QUE VOCÊ ACHA QUE ACONTECERIA SE ENFRENTASSE ESSE MEDO?"
            ];

            draftphrase = phrases[Math.floor(Math.random() * phrases.length)];
            return draftphrase;

        case "CONFUSAO":
            phrases = [
                "QUANDO TUDO PARECE CONFUSO, POR ONDE VOCÊ ACHA QUE DEVERIA COMEÇAR?",
                "O QUE ESTÁ MAIS DIFÍCIL DE ENTENDER AGORA?",
                "ESSA CONFUSÃO TE DEIXA ANSIOSO OU CANSADO?"
            ];

            draftphrase = phrases[Math.floor(Math.random() * phrases.length)];
            return draftphrase;

        case "CANSACO":
            phrases = [
                "ESSE CANSAÇO É MAIS FÍSICO OU EMOCIONAL?",
                "HÁ QUANTO TEMPO VOCÊ SE SENTE ASSIM?",
                "VOCÊ CONSEGUE DESCANSAR OU ALGO TE IMPEDE?"
            ];

            draftphrase = phrases[Math.floor(Math.random() * phrases.length)];
            return draftphrase;

        case "NEUTRO":
        default:
            phrases = [
                "PODE ME CONTAR MAIS SOBRE O QUE ESTÁ SENTINDO?",
                "O QUE TE FEZ DIZER ISSO?",
                "VAMOS FALAR UM POUCO MAIS SOBRE VOCÊ."
            ];

            draftphrase = phrases[Math.floor(Math.random() * phrases.length)];
            return draftphrase;
    }

}

function sentenceNormalizer(sentence) // Corrige estruturas gramaticais da frase final usando regras baseadas em regex
{
    const grammarRules = [
        { pattern: /\bVOCE\s+SÃO\b/g, replace: "VOCE É" },

        { pattern: /^VOCE\s+E\b/g, replace: "VOCES" },

        { pattern: /\bVOCE\s+(SUA|SEU|SUAS|SEUS)\b/g, replace: "VOCE" },

        { pattern: /\b(QUER|PODE|PRECISA)\s+NAO\b/g, replace: "NAO $1" },
        
        { pattern: /\s{2,}/g, replace: " " }
    ];

    return grammarRules.reduce((s, rule) => {
        return s.replace(rule.pattern, rule.replace);
    }, sentence);
}

async function main () // Controla o fluxo principal do programa e mantém o loop infinito de conversa com a Elisa
{
    await elisaTalkingAnim("COMO VOCE ESTA SE SENTINDO HOJE?");
    while (true)
    {
        let elisaresponse = await elisaTalking(userTalk());  
        await elisaTalkingAnim(elisaresponse);
    }

}

main();
