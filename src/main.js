/*
 * @Author: Vincent Young
 * @Date: 2023-08-30 11:30:27
 * @LastEditors: Vincent Young
 * @LastEditTime: 2023-11-15 11:42:19
 * @FilePath: /bob-plugin-universal/src/main.js
 * @Telegram: https://t.me/missuo
 * @GitHub: https://github.com/missuo
 * 
 * Copyright © 2023 by Vincent, All Rights Reserved. 
 */

var lang = require("./lang.js");

function supportLanguages() {
    return lang.supportedLanguages.map(([standardLang]) => standardLang);
}

function translate(query, completion) {
    let sourceLang = "";
    if (query.from === "auto") {
        sourceLang = lang.langMap.get(query.detectFrom);
    } else {
        sourceLang = lang.langMap.get(query.from);
    }
    let targetLang = "";
    if (query.to === "auto") {
        targetLang = lang.langMap.get(query.detectTo);
    } else {
        targetLang = lang.langMap.get(query.to);
    }

    const body = JSON.stringify({
        text: query.text,
        source_lang: sourceLang,
        target_lang: targetLang,
    });
    console.log(body);

    (async () => {
        const urls = $option.url.split(",");
        const randomUrl = urls[Math.floor(Math.random() * urls.length)];
        const resp = await $http.request({
            method: "POST",
            url: randomUrl,
            header: {
                'Content-Type': 'application/json'
            },
            body: $data.fromUTF8(body)
        });
        const {
            statusCode
        } = resp.response;
       
        if (statusCode === 200 && resp.data.data){
            completion({
                result: {
                    from: query.detectFrom,
                    to: query.detectTo,
                    toParagraphs: resp.data.data.split('\n')
                },
            });
        }  
        
        if (statusCode === 406) {
            completion({
                error: {
                    type: "unsupportedLanguage",
                    message: "Unsupported target languages",
                },
            });
            return;
        } else if (statusCode === 429) {
            completion({
                error: {
                    type: "api",
                    message: "Too many requests",
                },
            });
            return;
        }
    })().catch(err => {
        completion({
            error: {
                type: err._type || "unknown",
                message: err._message || "未知错误",
                addition: err._addition,
            },
        });
    });
}

exports.supportLanguages = supportLanguages;
exports.translate = translate;