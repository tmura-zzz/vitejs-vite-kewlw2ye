<script>
    import {fetchRankingAsync} from './supabase.js';
    let modal;
    let rankingPromise;
    export function showModal(){
        rankingPromise = fetchRankingAsync();
        modal.showModal();
    }
</script>

<dialog bind:this={modal} class="border rounded-xl backdrop-blur-sm bg-white/30 p-10">
    <div class="text-center text-gray-700 flex flex-col items-center gap-10">
        <div class="text-2xl font-extrabold">ランキング</div>
        {#if rankingPromise}
            {#await rankingPromise}
                読み込み中
            {:then rankingData}
                {#each rankingData as {name, score}}
                    <div>{name}: {score}</div>
                {/each}
            {/await}
            <button on:click={()=>modal.close()} class="text-xl w-1/2 border-2 border-gray-500 rounded-xl">OK</button>
        {/if}
    </div>
</dialog>