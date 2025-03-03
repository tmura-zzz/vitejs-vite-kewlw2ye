<script>
    let modal;
    let score;
    export function showModal(currentScore){
        score = currentScore;
        modal.showModal();
    }
    export function closeModal(){
        modal.close();
    }
</script>
<dialog bind:this={modal} class="border rounded-xl backdrop-blur-sm bg-white/30 p-10">
    <div class="text-center text-gray-700 flex flex-col items-center gap-10">
        <div class="text-2xl font-extrabold">ゲームオーバー</div>
        <div class="text-xl font-bold">
            スコア:{score}
        </div>
        <button on:click class="text-xl w-1/2 border-2 border-gray-500 rounded-xl">OK</button>
    </div>
</dialog>