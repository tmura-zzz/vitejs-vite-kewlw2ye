import './supabase.js';
import { fetchKanjiYomiAsync, fetchMondaisuAsunc } from './supabase.js';

let mondaisu;

const QAlist = [
    {Q: "鮪", A: "まぐろ"},
    {Q: "鰈", A: "かれい"},
    {Q: "鯛", A: "たい"},
    {Q: "鰹", A: "かつお"},
    {Q: "鯖", A: "さば"},
    {Q: "鱈", A: "たら"},
    {Q: "鮭", A: "さけ"},
    {Q: "鯵", A: "あじ"},
    {Q: "鮎", A: "あゆ"}
];

function randomRange(max){
    return Math.floor(Math.random() * max);
}

function randomArray(max, len){
    const array = [];               // 空の配列を用意し、arrayと名付ける
    while(array.length < len){      // arrの長さがlen未満である限り、以下を繰り返し実行
        const r = randomRange(max); // rに0以上max未満の整数をランダムに選ぶ
        if(!array.includes(r)){     // rがarrayに含まれていなければ、以下を実行
            array.push(r);          // arrayの末尾にrを追加
        }
    }
    return array;                   // 作成したarrayを返す
}
export function getQuizData(){
    const numberOfTaku = 5;
    const takuID = randomArray(QAlist.length, numberOfTaku);
    const seikaiID = takuID[randomRange(numberOfTaku)];
    const taku = takuID.map(id => QAlist[id].A)
    return {
        mondai: QAlist[seikaiID].Q,
        seikai: QAlist[seikaiID].A,
        taku: taku
    };
}

export async function getQuizDataAsync(){
    mondaisu ??= await fetchMondaisuAsunc();
    const numberOfTaku = 5;
    const takuID = randomArray(mondaisu, numberOfTaku); 
    const seikai = randomRange(numberOfTaku);
    const kanjiYomi = await fetchKanjiYomiAsync(takuID);
    return {
        mondai: kanjiYomi[seikai].kanji, 
        seikai: kanjiYomi[seikai].yomi, 
        taku: kanjiYomi.map(({yomi}) => yomi)
    };
}