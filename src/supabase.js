import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://rqepkurilkyzpkylanrx.supabase.co';//プロジェクトによって異なる
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZXBrdXJpbGt5enBreWxhbnJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5ODU4MTAsImV4cCI6MjA1NjU2MTgxMH0.IRELnreFtVEJNVFt7qJ_CLQUtwzXrXPAfCXv9dh6SLg';  // プロジェクトによって異なる
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchKanjiYomiAsync(ids){
    const { data, error } = await supabase
        .from('SakanaKanji')
        .select('kanji, yomi')
        .in('id', ids);
    if (error) {
        console.error(error);
    }
    else{
        console.log(data);
    }
    return data;
}

export async function fetchMondaisuAsunc(){
    const { error, count } = await supabase
        .from('SakanaKanji')
        .select('*', { count: 'exact', head: true });
    if (error) {
        console.error(error);
    }
    return count;
}

export async function insertScoreAsync(name, score){
    const { error } = await supabase
        .from('Ranking')
        .insert({name, score});
    if (error) {
        console.error(error);
    }
}

export async function fetchRankingAsync(){
    const { data, error } = await supabase
        .from('Ranking')
        .select("score, name")
        .neq('name', '')
        .order('score', {ascending: false})
        .limit(10);
    if (error) {
        console.error(error);
    }
    return data;
}

//fetchKanjiYomiAsync([1,3,5,7]);